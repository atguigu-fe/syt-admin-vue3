<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getHospitalSetList"
      :initParam="initParam"
    >
      <template #tableHeader="scope">
        <el-button
          type="primary"
          icon="Plus"
          v-auth="['btn.hospitalSet.add']"
          @click="handleAdd()"
        >
          添加
        </el-button>
        <el-button
          type="danger"
          icon="Delete"
          plain
          v-auth="['btn.hospitalSet.bulkDeletion']"
          @click="batchDelete(scope.selectedListIds as string[])"
          :disabled="!scope.isSelected"
        >
          批量删除
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Edit"
          v-auth="['btn.hospitalSet.edit']"
          @click="handleEdit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          v-auth="['btn.hospitalSet.delete']"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <HospitalSetAddOrEdit
      :setting="HospitalSetAddOrEditSetting"
    ></HospitalSetAddOrEdit>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useHandleData } from '@/hooks/useHandleData'
import {
  batchRemoveHospitalSet,
  getHospitalSetList,
  removeHospitalSet,
} from '@/api/hospital'
import ProTable from '@/components/ProTable/src/ProTable.vue'
import { HospitalSetListInterfaceRes } from '@/api/hospital/types'
import HospitalSetAddOrEdit from '@/views/hospital/hospitalset/hospitalSetAddOrEdit.vue'

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref<InstanceType<typeof ProTable>>()

const HospitalSetAddOrEditSetting = reactive({
  visible: false,
  formData: {} as HospitalSetListInterfaceRes,
  handleRefresh: refresh,
})

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 60 },
  // { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'id' },
  {
    prop: 'hosname',
    label: '医院名称',
    width: 150,
    search: { el: 'input', props: { placeholder: '输入医院名称' } },
  },
  {
    prop: 'hoscode',
    label: '医院编号',
    width: 100,
    search: { el: 'input', props: { placeholder: '输入医院编号' } },
  },
  { prop: 'apiUrl', label: 'api基础路径' },
  { prop: 'signKey', label: '签名' },
  { prop: 'contactsName', label: '联系人姓名' },
  { prop: 'contactsPhone', label: '联系人手机' },
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
//新增
const handleAdd = () => {
  HospitalSetAddOrEditSetting.visible = true
  HospitalSetAddOrEditSetting.formData = {
    hosname: '', //医院名称
    hoscode: '', //医院编号
    apiUrl: '', //api基础路径
    contactsName: '', //联系人姓名
    contactsPhone: '', //联系人手机
  }
}
// 编辑
const handleEdit = (row: HospitalSetListInterfaceRes) => {
  HospitalSetAddOrEditSetting.visible = true
  HospitalSetAddOrEditSetting.formData = { ...row }
}
// 删除
const handleDelete = async (row: HospitalSetListInterfaceRes) => {
  await useHandleData(removeHospitalSet, row.id as number, `删除${row.hosname}`)
  proTable.value?.getTableList()
}
const batchDelete = async (ids: string[]) => {
  await useHandleData(batchRemoveHospitalSet, ids, '删除所选信息')
  proTable.value?.clearSelection()
  proTable.value?.getTableList()
}
// 刷新页面
function refresh() {
  proTable.value?.getTableList()
}
</script>
