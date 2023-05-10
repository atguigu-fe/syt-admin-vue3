<template>
  <el-card v-if="departmentList.length">
    <div class="m-b-20">
      {{
        `选择：北京人民医院 / ${currentDepartment.depname} / ${
          checkedBookingScheduleInfo.workDate || ''
        }`
      }}
    </div>
    <el-container>
      <el-aside width="260px" height="500px">
        <div class="department-tree-wrapper">
          <el-tree
            default-expand-all
            :data="departmentList"
            node-key="depcode"
            :props="departmentTreeProps"
            @node-click="handleDepartmentTreeNodeClick"
          />
        </div>
      </el-aside>
      <el-container v-if="bookingScheduleInfo.bookingScheduleList.length">
        <el-main>
          <div class="schedule-container">
            <div
              :class="{
                'schedule-item-check':
                  item.workDate === checkedBookingScheduleInfo.workDate,
              }"
              class="schedule-item m-r-15 m-b-15 pointer"
              v-for="item in bookingScheduleInfo.bookingScheduleList"
              :key="item.workDate"
              @click="checkedBookingScheduleInfo = item"
            >
              <div class="schedule-item-top">
                {{ `${item.workDate}  ${item.dayOfWeek}` }}
              </div>
              <div class="schedule-item-bottom">
                {{ `${item.availableNumber} / ${item.reservedNumber}` }}
              </div>
            </div>
          </div>
          <!--        分页-->
          <el-pagination
            v-model:current-page="pageInfo.currentPage"
            v-model:page-size="pageInfo.pageSize"
            :page-sizes="[7, 10]"
            layout="prev, pager, next,sizes,total"
            :total="pageInfo.total"
            :style="{ marginTop: '20px' }"
            @size-change="sizeChange"
            @current-change="currentChange"
          />
          <el-table
            class="m-t-20"
            :data="scheduleDetailList"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column label="职称" width="180">
              <template #default="{ row }">
                {{ `${row.title} | ${row.docname}` }}
              </template>
            </el-table-column>
            <el-table-column prop="workTime" label="号源时间">
              <template #default="{ row }">
                {{ row.workTime === 0 ? '上午' : '下午' }}
              </template>
            </el-table-column>
            <el-table-column prop="reservedNumber" label="可预约数" />
            <el-table-column prop="availableNumber" label="剩余预约数" />
            <el-table-column prop="amount" label="挂号费(元)" />
            <el-table-column prop="skill" label="擅长技能" />
          </el-table>
        </el-main>
      </el-container>
      <el-container class="flex-center" v-else>
        <el-empty description="暂无数据" />
      </el-container>
    </el-container>
  </el-card>
  <el-card class="flex-center" v-else>
    <el-empty description="暂无数据" />
    <el-button type="primary" style="width: 200px" @click="router.back()">
      返回
    </el-button>
  </el-card>
</template>
<script setup lang="ts">
// 科室信息列表
import { onMounted, ref, watch } from 'vue'
import {
  getBookingScheduleRule,
  getDepartmentList,
  getScheduleDetail,
} from '@/api/hospital'
import {
  BookingScheduleDateInterface,
  BookingScheduleRuleInterfaceRes,
  DepartmentInterfaceRes,
  ScheduleListInterfaceRes,
} from '@/api/hospital/types'
import { useRoute, useRouter } from 'vue-router'
import { usePage } from '@/hooks/usePagination'
const route = useRoute()
const router = useRouter()
// 分页hooks
const { pageInfo, sizeChange, currentChange } = usePage({
  callback: getBookingScheduleInfo,
})
pageInfo.pageSize = 7
const departmentTreeProps = {
  children: 'children',
  label: 'depname',
}
const departmentList = ref([] as DepartmentInterfaceRes[])
// 当前选中的科室
const currentDepartment = ref({} as DepartmentInterfaceRes)
// 预约日期列表
const bookingScheduleInfo = ref({} as BookingScheduleRuleInterfaceRes)
// 当前预约的日期
const checkedBookingScheduleInfo = ref({} as BookingScheduleDateInterface)
// 医生日程列表
const scheduleDetailList = ref([] as ScheduleListInterfaceRes[])
// 监视当前预约日期的变化
watch(checkedBookingScheduleInfo, (newValue) => {
  if (newValue.workDate) {
    getScheduleDetailHandle()
  }
})
// 获取科室信息列表
const getDepartmentListHandle = async () => {
  try {
    const res = await getDepartmentList(route.query.hoscode as string)
    departmentList.value = res.data
    // 设置第一项为初始默认选中项目
    currentDepartment.value =
      res.data[0]?.children[0] || ({} as DepartmentInterfaceRes)
    // 设置初始选中日期
  } catch (error) {
    console.log(error)
  }
}
// 获取预约日期列表
async function getBookingScheduleInfo() {
  try {
    // page: number,
    //     limit: number,
    //     hoscode: string,
    //     depcode: string,
    const res = await getBookingScheduleRule(
      pageInfo.currentPage,
      pageInfo.pageSize,
      route.query.hoscode as string,
      currentDepartment.value.depcode,
    )
    bookingScheduleInfo.value = res.data
    pageInfo.total = res.data.total
    //  设置初始选中日期
    checkedBookingScheduleInfo.value =
      res.data.bookingScheduleList[0] || ({} as BookingScheduleDateInterface)
  } catch (error) {
    console.log(error)
  }
}
// 获取医生日程列表
async function getScheduleDetailHandle() {
  try {
    const res = await getScheduleDetail(
      route.query.hoscode as string,
      currentDepartment.value.depcode,
      checkedBookingScheduleInfo.value.workDate,
    )
    scheduleDetailList.value = res.data
  } catch (error) {
    console.log(error)
  }
}

// 子节点被点击
const handleDepartmentTreeNodeClick = (data: DepartmentInterfaceRes) => {
  console.log(data)
  if (!data.children) {
    currentDepartment.value = data
    getBookingScheduleInfo()
    // 清空医生日程列表
    scheduleDetailList.value = []
  }
}
/* 生命周期 */
onMounted(async () => {
  await getDepartmentListHandle()
  await getBookingScheduleInfo()
})
</script>

<style lang="scss" scoped>
.department-tree-wrapper {
  height: 700px;
  background-color: pink;
}

.schedule-container {
  display: flex;
  flex-wrap: wrap;

  .schedule-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 120px;
    padding: 20px;
    color: #909399;
    background-color: #f4f4f5;
    transition: all 0.5s ease-in-out;
  }

  .schedule-item-check {
    color: #409eff;
    background-color: #ecf5ff;
    transform: scale(1.1);
  }
}
</style>
