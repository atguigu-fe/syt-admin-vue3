<template>
  <el-card>
    <ProTable
      ref="proTable"
      :columns="columns"
      row-key="id"
      :dataCallback="dataCallback"
      :requestApi="getDictionary"
      :initParam="initParam"
      lazy
      :load="handleLoad"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    ></ProTable>
  </el-card>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import ProTable from '@/components/ProTable/src/ProTable.vue'
import { getDictionary } from '@/api/cmn'
import { ColumnProps } from '@/components/ProTable/src/types'
import { DictionaryInterfaceRes } from '@/api/cmn/types'

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref<InstanceType<typeof ProTable>>()

// *表格配置项
const columns: ColumnProps[] = [
  { prop: 'name', label: '省' },
  { prop: 'dictCode', label: '编码' },
  { prop: 'id', label: '值' },
  { prop: 'createTime', label: '创建时间' },
]

// *查询参数
const initParam = reactive({ id: 1 })

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data,
  }
}
// 处理加载数据
const handleLoad = async (
  row: DictionaryInterfaceRes,
  treeNode: unknown,
  resolve: (date: DictionaryInterfaceRes[]) => void,
) => {
  try {
    const res = await getDictionary({ id: row.id })
    resolve(res.data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped></style>
