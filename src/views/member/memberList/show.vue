<template>
  <el-card v-if="memberInfo.userInfo">
    <el-descriptions title="用户信息" :column="2" border>
      <el-descriptions-item
        label="姓名"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ memberInfo.userInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item
        label="手机号"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ memberInfo.userInfo.phone }}
      </el-descriptions-item>
      <el-descriptions-item
        label="状态"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ memberInfo.userInfo.status === 0 ? '锁定' : '正常' }}
      </el-descriptions-item>
      <el-descriptions-item
        label="注册时间"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ memberInfo.userInfo.createTime }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="m-t-30" title="认证信息" :column="2" border>
      <el-descriptions-item
        label="姓名"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ memberInfo.userInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item
        label="证件类型"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ memberInfo.userInfo?.param?.certificatesTypeString || '' }}
      </el-descriptions-item>
      <el-descriptions-item
        label="证件号"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ memberInfo.userInfo.certificatesNo }}
      </el-descriptions-item>
      <el-descriptions-item
        label="证据图片"
        label-align="right"
        align="center"
        width="100px"
      >
        <img
          v-if="memberInfo.userInfo.certificatesUrl"
          :src="memberInfo.userInfo.certificatesUrl"
          style="width: 80px; height: 80px"
        />
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="m-t-30"
      title="就诊人信息"
      :column="2"
      border
    ></el-descriptions>
    <el-table :data="memberInfo.patientList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="70" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="param.certificatesTypeString" label="证件类型" />
      <el-table-column prop="certificatesNo" label="证件编号" />
      <el-table-column label="性别">
        <template #default="{ row }">
          {{ row.sex == 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="birthdate" label="出生年月" />
      <el-table-column prop="phone" label="手机" />
      <el-table-column label="是否结婚">
        <template #default="{ row }">
          {{ row.isMarry == 1 ? '时' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="fullAddress" label="地址">
        <template #default="{ row }">{{ row.param.fullAddress }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间" />
    </el-table>
    <div class="m-t-20 flex-center">
      <el-button style="width: 150px" type="primary" @click="router.back()">
        返回
      </el-button>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getMemberInfo } from '@/api/member'
import { MemberInfoInterfaceRes } from '@/api/member/types'

const route = useRoute()
const router = useRouter()
console.log(route.query.id)
const memberInfo = ref({} as MemberInfoInterfaceRes)
// 请求会员信息
const getMemberInfoHandle = async () => {
  try {
    const res = await getMemberInfo(route.query.id as string)
    memberInfo.value = res.data
  } catch (error) {
    console.log(error)
  }
}
/* 生命周期 */
onMounted(() => {
  getMemberInfoHandle()
})
</script>

<style lang="scss" scoped></style>
