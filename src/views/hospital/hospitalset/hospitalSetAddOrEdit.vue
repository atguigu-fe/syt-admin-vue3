<template>
  <el-dialog
    destroy-on-close
    :before-close="handleBeforeClose"
    v-model="setting.visible"
    :title="props.setting.formData.id ? '修改' : '新增'"
  >
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      :rules="fromRules"
      :model="props.setting.formData"
    >
      <el-form-item label="医院名称" prop="hosname">
        <el-input v-model="props.setting.formData.hosname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="医院编号" prop="hoscode">
        <el-input v-model="props.setting.formData.hoscode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="api基础路径" prop="apiUrl">
        <el-input v-model="props.setting.formData.apiUrl" autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系人姓名" prop="contactsName">
        <el-input
          v-model="props.setting.formData.contactsName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="联系人手机" prop="contactsPhone">
        <el-input
          v-model="props.setting.formData.contactsPhone"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="handleAddOrUpdate(ruleFormRef)" type="primary">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, PropType, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { HospitalSetListInterfaceRes } from '@/api/hospital/types'
import { saveHospitalSet, updateHospitalSet } from '@/api/hospital'
import { ElMessage } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const props = defineProps({
  setting: {
    type: Object as PropType<{
      visible: boolean
      formData: HospitalSetListInterfaceRes
      handleRefresh: () => void
    }>,
    required: true,
    default: () => ({
      visible: false,
      formData: {} as HospitalSetListInterfaceRes,
      handleRefresh: () => ({}),
    }),
  },
})

const fromRules = reactive<FormRules>({
  hosname: [{ required: true, message: '请输入医院名称', trigger: 'blur' }],
  hoscode: [{ required: true, message: '请输入医院编号', trigger: 'blur' }],
  apiUrl: [{ required: true, message: '请输入api基础路径', trigger: 'blur' }],
  contactsName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
  ],
  contactsPhone: [
    { required: true, message: '请输入联系人手机', trigger: 'blur' },
  ],
})

const cancel = () => {
  props.setting.visible = false
  // 初始化表单
  props.setting.formData = {
    hosname: '', //医院名称
    hoscode: '', //医院编号
    apiUrl: '', //api基础路径
    contactsName: '', //联系人姓名
    contactsPhone: '', //联系人手机
  }
}
// 关闭前
const handleBeforeClose = (done: () => void) => {
  cancel()
  done()
}
// 新增或者修改
const handleAddOrUpdate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        props.setting.formData?.id
          ? await updateHospitalSet(props.setting.formData)
          : await saveHospitalSet(props.setting.formData)
        ElMessage({
          type: 'success',
          message: `${props.setting.formData?.id ? '修改' : '新增'}成功`,
        })
        props.setting.handleRefresh()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped></style>
