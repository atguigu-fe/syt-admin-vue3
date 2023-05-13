<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getOrderList"
      :initParam="initParam"
      :toolButton="false"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Edit"
          v-auth="['btn.orderList.view']"
          @click="handleView(scope.row)"
        >
          查看
        </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import ProTable from '@/components/ProTable/src/ProTable.vue'
import { getOrderList, getOrderStatusList } from '@/api/order'
import { PatientInfoInterfaceRes } from '@/api/order/types'
import { useRouter } from 'vue-router'
const router = useRouter()
// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref<InstanceType<typeof ProTable>>()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', fixed: 'left' },
  {
    prop: 'outTradeNo',
    label: '订单号',
    width: 160,
    search: { el: 'input', props: { placeholder: '输入订单号' } },
  },
  {
    prop: 'hosname',
    label: '医院名称',
    width: 150,
    search: { el: 'input', props: { placeholder: '输入医院名称' } },
  },
  { prop: 'depname', label: '科室名称', width: 160 },
  { prop: 'title', label: '医生职称', width: 100 },
  {
    prop: 'patientName',
    label: '就诊人',
    search: { el: 'input', props: { placeholder: '输入就诊人姓名' } },
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
  {
    prop: 'reserveDate',
    label: '安排时间',
    width: 160,
    search: {
      el: 'date-picker',
      props: {
        placeholder: '就诊日期',
        format: 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD',
      },
    },
    render: ({ row }) => {
      return (
        <span>
          {row.reserveDate}
          {row.reserveTime === 0 ? '上午' : '下午'}
        </span>
      )
    },
  },
  { prop: 'number', label: '预约号序', width: 100 },
  { prop: 'amount', label: '服务费', width: 70 },
  {
    // {
    //     "comment": "预约成功，待支付",
    //     "status": 0
    // }
    prop: 'param.orderStatus',
    label: '订单状态',
    width: 150,
    enum: getOrderStatusList,
    fieldNames: { label: 'comment', value: 'status' },
    search: { el: 'select', props: { placeholder: '请选择订单状态' } },
    render: ({ row }) => {
      return <span>{row.param.orderStatusString}</span>
    },
  },
  { prop: 'createTime', label: '创建时间', width: 160 },

  { prop: 'operation', label: '操作', fixed: 'right', width: 150 },
]

// *查询参数
const initParam = reactive({})

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}
// 编辑
const handleView = (row: PatientInfoInterfaceRes) => {
  console.log(row)
  router.push({
    path: '/order/orderList/show',
    query: {
      id: row.id,
    },
  })
}
</script>
