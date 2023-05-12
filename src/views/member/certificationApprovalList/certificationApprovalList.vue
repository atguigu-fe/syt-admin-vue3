<template>
  <el-card>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getMemberList"
      :initParam="initParam"
      :toolButton="false"
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
          icon="CircleCheck"
          @click="handlePass(scope.row, 2)"
        >
          通过
        </el-button>
        <el-button
          type="primary"
          link
          icon="CircleClose"
          @click="handlePass(scope.row, -1)"
        >
          不通过
        </el-button>
      </template>
    </ProTable>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import ProTable from '@/components/ProTable/src/ProTable.vue'
import { approval, getMemberList } from '@/api/member'
import { useRouter } from 'vue-router'
import { useHandleData } from '@/hooks/useHandleData'
import { MemberUserInfoInterface } from '@/api/member/types'
const router = useRouter()

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref<InstanceType<typeof ProTable>>()

// *表格配置项
const columns: ColumnProps[] = [
  {
    prop: 'keyword',
    label: '姓名/手机号',
    isShow: false,
    search: {
      el: 'input',
      props: { placeholder: '姓名/手机号' },
    },
  },
  {
    prop: 'createTimeBegin',
    label: '创建时间',
    isShow: false,
    search: {
      el: 'date-picker',
      props: {
        placeholder: '创建时间',
        format: 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD',
      },
    },
  },
  {
    prop: 'createTimeEnd',
    label: '截止时间',
    isShow: false,
    search: {
      el: 'date-picker',
      props: {
        placeholder: '截止时间',
        format: 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD',
      },
    },
  },
  { type: 'index', label: '序号' },
  { prop: 'phone', label: '手机号' },
  { prop: 'nickName', label: '昵称' },
  { prop: 'name', label: '姓名' },
  { prop: 'param.statusString', label: '状态' },
  { prop: 'param.authStatusString', label: '认证状态' },
  { prop: 'createTime', label: '创建时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 230 },
]

// *查询参数
const initParam = reactive({ authStatus: 1 })

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}
// 查看
const handleView = (row: MemberUserInfoInterface) => {
  console.log(row)
  router.push({
    path: '/member/memberList/show',
    query: {
      id: row.id,
    },
  })
}
// 通过，不通过
const handlePass = async (row: MemberUserInfoInterface, flag: number) => {
  // authStatus认证状态（0：未认证 1：认证中 2：认证成功 -1：认证失败）
  console.log(row)
  await useHandleData(
    approval,
    { id: row.id, authStatus: flag },
    `${flag === 2 ? '通过' : '不通过'}认证`,
  )
  proTable.value?.getTableList()
}
</script>
