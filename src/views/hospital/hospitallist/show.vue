<template>
  <el-card v-if="hospitalDetails.hospital">
    <el-descriptions title="基本信息" :column="2" border>
      <el-descriptions-item
        label="医院名称"
        label-align="right"
        align="center"
        width="100px"
      >
        <span>
          {{ hospitalDetails.hospital.hosname }}
        </span>
        <span class="m-l-10 m-r-10">|</span>
        <span>
          {{ hospitalDetails.hospital.param.hostypeString }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item
        label="医院logo"
        label-align="right"
        align="center"
        width="100px"
      >
        <img
          :src="`data:image/png;base64,${hospitalDetails.hospital.logoData}`"
          style="width: 80px; height: 80px"
        />
      </el-descriptions-item>
      <el-descriptions-item
        label="医院编号"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ hospitalDetails.hospital.hoscode }}
      </el-descriptions-item>
      <el-descriptions-item
        label="医院地址"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ hospitalDetails.hospital.param.fullAddress }}
      </el-descriptions-item>
      <el-descriptions-item
        label="坐车路线"
        label-align="right"
        align="center"
        width="100px"
        :span="2"
      >
        {{ hospitalDetails.hospital.route }}
      </el-descriptions-item>
      <el-descriptions-item
        label="医院简介"
        label-align="right"
        align="center"
        width="100px"
        :span="2"
      >
        {{ hospitalDetails.hospital.intro }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="m-t-20" title="预约规则信息" :column="2" border>
      <el-descriptions-item
        label="预约周期"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ hospitalDetails.bookingRule.cycle }}天
      </el-descriptions-item>
      <el-descriptions-item
        label="放号时间"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ hospitalDetails.bookingRule.releaseTime }}
      </el-descriptions-item>
      <el-descriptions-item
        label="停挂时间"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ hospitalDetails.bookingRule.stopTime }}
      </el-descriptions-item>
      <el-descriptions-item
        label="退号时间"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ hospitalDetails.bookingRule.quitTime }}
      </el-descriptions-item>
      <el-descriptions-item
        label="预约规则"
        label-align="right"
        align="center"
        width="100px"
        :span="2"
      >
        <div
          v-for="(item, index) in hospitalDetails.bookingRule.rule"
          :key="index"
        >
          {{ `${index + 1}. ${item}` }}
        </div>
      </el-descriptions-item>
    </el-descriptions>
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
import { HospitalDetailInterfaceRes } from '@/api/hospital/types'
import { getHospitalDetail } from '@/api/hospital'

const route = useRoute()
const router = useRouter()
console.log(route.query.id)
const hospitalDetails = ref({} as HospitalDetailInterfaceRes)
// 请求医院详情
const getHospitalDetails = async () => {
  try {
    const res = await getHospitalDetail(route.query.id as string)
    hospitalDetails.value = res.data
  } catch (error) {
    console.log(error)
  }
}
/* 生命周期 */
onMounted(() => {
  getHospitalDetails()
})
</script>

<style lang="scss" scoped></style>
