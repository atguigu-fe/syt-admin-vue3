<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getHospitalList"
      :initParam="initParam"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Edit"
          @click="handleEdit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import { getHospitalList, removeHospitalSet } from '@/api/hospital'
import ProTable from '@/components/ProTable/src/ProTable.vue'
import { HospitalSetListInterfaceRes } from '@/api/hospital/types'

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref<InstanceType<typeof ProTable>>()
// provinceCode?: number
// cityCode?: number
// districtCode?: number
// hosname?: string
// hoscode?: string
// hostype?: number
// status?: number
// *表格配置项
const columns: ColumnProps[] = [
  // { type: 'selection', fixed: 'left', width: 60 },
  {
    prop: 'provinceCode',
    label: '所在省',
    isShow: false,
    // 字典数据
    // enum: genderType,
    // 字典请求不带参数
    // enum: getUserGender,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    width: 100,
    search: { el: 'select', props: { placeholder: '请选择省' } },
  },
  {
    prop: 'cityCode',
    label: '所在市',
    isShow: false,
    // 字典数据
    // enum: genderType,
    // 字典请求不带参数
    // enum: getUserGender,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    width: 100,
    search: { el: 'select', props: { placeholder: '请选择市' } },
  },
  {
    prop: 'districtCode',
    label: '所在区',
    isShow: false,
    // 字典数据
    // enum: genderType,
    // 字典请求不带参数
    // enum: getUserGender,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: 'select', props: { placeholder: '请选择区' } },
  },
  {
    prop: 'hosname',
    label: '医院名称',
    isShow: false,
    search: { el: 'input', props: { placeholder: '输入医院名称' } },
  },
  {
    prop: 'hoscode',
    label: '医院编号',
    isShow: false,
    search: { el: 'input', props: { placeholder: '输入医院编号' } },
  },
  {
    prop: 'hostype',
    label: '医院类型',
    isShow: false,
    // 字典数据
    // enum: genderType,
    // 字典请求不带参数
    // enum: getUserGender,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    width: 100,
    search: { el: 'select', props: { placeholder: '请选择医院类型' } },
  },
  {
    prop: 'status',
    label: '医院状态',
    isShow: false,
    // 字典数据
    // enum: genderType,
    // 字典请求不带参数
    // enum: getUserGender,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    width: 100,
    search: { el: 'select', props: { placeholder: '请选择医院状态' } },
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
  { prop: 'hoscode', label: '医院编号' },
  { prop: 'hosname', label: '医院名称' },
  { prop: 'param.hostypeString', label: '等级' },
  { prop: 'param.fullAddress', label: '详细地址' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' },

  {
    prop: 'hosname',
    label: '医院名称',
    width: 150,
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 150 },
]

// *查询参数
const initParam = reactive({})

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.content,
    total: data?.totalElements,
  }
}
// 编辑
const handleEdit = (row: any) => {
  console.log(row)
}
// 删除
const handleDelete = async (row: HospitalSetListInterfaceRes) => {
  await useHandleData(removeHospitalSet, row.id, `删除${row.hosname}`)
  proTable.value.getTableList()
}
</script>
