<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getHospitalList"
      :initParam="initParam"
      :resetCallback="provinceClear"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="View"
          @click="handleView(scope.row)"
        >
          查看
        </el-button>
        <el-button
          type="primary"
          link
          icon="Document"
          @click="handleSchedule(scope.row)"
        >
          排班
        </el-button>
        <el-button
          type="primary"
          link
          icon="Warning"
          @click="updateHospitalStatus(scope.row)"
        >
          {{ scope.row.status === 0 ? '上线' : '下线' }}
        </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref, onMounted } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import {
  getCityOrDistrictList,
  getHospitalList,
  getProvinceList,
  reqUpdateStatus,
} from '@/api/hospital'
import ProTable from '@/components/ProTable/src/ProTable.vue'
import {
  HospitalListInterfaceRes,
  ProvinceInfoInterfaceRes,
} from '@/api/hospital/types'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref<InstanceType<typeof ProTable>>()
// 地区数据
const areaList = reactive({
  // 省份数据
  provinceList: [] as ProvinceInfoInterfaceRes[],
  provinceCode: '',
  // 市区数据
  cityList: [] as ProvinceInfoInterfaceRes[],
  cityCode: '',
  // 区县数据
  districtList: [] as ProvinceInfoInterfaceRes[],
  districtCode: '',
})

// *表格配置项
const columns: ColumnProps[] = reactive([
  // { type: 'selection', fixed: 'left', width: 60 },
  {
    prop: 'provinceCode',
    label: '所在省',
    isShow: false,
    width: 100,
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select
            v-model={areaList.provinceCode}
            placeholder="请选择省"
            clearable
            onChange={getCityList}
            onClear={provinceClear}
          >
            {areaList.provinceList.map((item) => (
              <el-option
                key={item.value}
                label={item.name}
                value={item.value}
              ></el-option>
            ))}
          </el-select>
        )
      },
    },
  },
  {
    prop: 'cityCode',
    label: '所在市',
    isShow: false,
    width: 100,
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select
            v-model={areaList.cityCode}
            placeholder="请选择市"
            clearable
            onChange={getDistrictList}
            onClear={cityClear}
          >
            {areaList.cityList.map((item) => (
              <el-option
                key={item.value}
                label={item.name}
                value={item.value}
              ></el-option>
            ))}
          </el-select>
        )
      },
    },
  },
  {
    prop: 'districtCode',
    label: '所在区',
    isShow: false,
    search: {
      el: 'select',
      render: () => {
        return (
          <el-select
            v-model={areaList.districtCode}
            placeholder="请选择区"
            clearable
          >
            {areaList.districtList.map((item) => (
              <el-option
                key={item.value}
                label={item.name}
                value={item.value}
              ></el-option>
            ))}
          </el-select>
        )
      },
    },
  },
  { type: 'index', label: '序号', width: 80 },
  {
    prop: 'logoData',
    label: '医院LOGO',
    width: 100,
    render: ({ row }) => {
      return (
        <img
          style="width:80px;height80px"
          src={`data:image/png;base64,${row.logoData}`}
        />
      )
    },
  },
  {
    prop: 'hosname',
    label: '医院名称',
    width: 150,
    search: { el: 'input', props: { placeholder: '输入医院名称' } },
  },
  {
    prop: 'hoscode',
    label: '医院编号',
  },
  { prop: 'param.hostypeString', label: '等级' },
  { prop: 'param.fullAddress', label: '详细地址' },
  {
    prop: 'status',
    label: '医院状态',
    render: ({ row }) => {
      return <el-tag>{row.status === 1 ? '已上线' : '未上线'}</el-tag>
    },
  },
  { prop: 'createTime', label: '创建时间' },

  { prop: 'operation', label: '操作', fixed: 'right', width: 230 },
])

// *查询参数
const initParam = reactive({})
// 获取省份数据
async function getProvinceListHandle() {
  try {
    const res = await getProvinceList()
    res.data.map((item) => {
      item.label = item.name
    })
    areaList.provinceList = res.data
    proTable.value.enumMap.set('provinceCode', areaList.provinceList)
  } catch (error) {
    console.log(error)
  }
}

// 获取市区数据
async function getCityList() {
  try {
    if (proTable.value?.searchParam?.provinceCode) {
      const res = await getCityOrDistrictList(
        proTable.value?.searchParam?.provinceCode,
      )
      areaList.cityList = res.data
      proTable.value.enumMap.set('cityCode', areaList.cityList)
      resetDistrict()
    }
  } catch (error) {
    console.log(error)
  }
}
// 获取区县数据
async function getDistrictList() {
  try {
    if (proTable.value?.searchParam?.cityCode) {
      const res = await getCityOrDistrictList(
        proTable.value?.searchParam?.cityCode,
      )
      areaList.districtList = res.data
      proTable.value.enumMap.set('districtCode', areaList.districtList)
    }
  } catch (error) {
    console.log(error)
  }
}
// 重置市、区数据
function resetCityAndDistrict() {
  areaList.cityCode = ''
  areaList.districtCode = ''
  areaList.cityList = []
  areaList.districtList = []
  proTable.value.enumMap.set('cityCode', [])
  proTable.value.enumMap.set('districtCode', [])
  proTable.value.searchParam.cityCode = ''
  proTable.value.searchParam.districtCode = ''
}
// 重置区数据
function resetDistrict() {
  areaList.districtCode = ''
  areaList.districtList = []
  proTable.value.enumMap.set('districtCode', [])
  proTable.value.searchParam.districtCode = ''
}
// 点击清空省份
function provinceClear() {
  console.log('provinceClear')
  areaList.provinceCode = ''
  resetCityAndDistrict()
}

// 点击清空市区
function cityClear() {
  console.log('cityClear')
  areaList.cityCode = ''
  resetDistrict()
}
// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.content,
    total: data?.totalElements,
  }
}
// 查看
const handleView = (row: HospitalListInterfaceRes) => {
  console.log(row)
  router.push({
    path: '/hospital/hospitallist/show',
    query: {
      id: row.id,
    },
  })
}
// 排班
const handleSchedule = (row: HospitalListInterfaceRes) => {
  console.log(row)
  router.push({
    path: '/hospital/hospitallist/schedule',
    query: {
      hoscode: row.hoscode,
    },
  })
}
// 更新医院上线下线状态
const updateHospitalStatus = async (data: HospitalListInterfaceRes) => {
  console.log(data)
  try {
    await reqUpdateStatus(data.id, data.status ? 0 : 1)
    data.status = data.status ? 0 : 1
    ElMessage.success('更新成功')
  } catch (error) {
    console.log(error)
  }
}

/* 生命周期 */
onMounted(async () => {
  await getProvinceListHandle()
})
</script>
