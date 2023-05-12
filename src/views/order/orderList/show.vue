<template>
  <el-card v-if="orderInfo.orderInfo">
    <el-descriptions title="订单信息" :column="2" border>
      <el-descriptions-item
        label="订单交易号"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.outTradeNo }}
      </el-descriptions-item>
      <el-descriptions-item
        label="医院名称"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.hosname }}
      </el-descriptions-item>
      <el-descriptions-item
        label="科室名称"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.depname }}
      </el-descriptions-item>
      <el-descriptions-item
        label="医生职称"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.title }}
      </el-descriptions-item>
      <el-descriptions-item
        label="安排日期"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.reserveDate }}
        {{ orderInfo.orderInfo.reserveTime === 0 ? '上午' : '下午' }}
      </el-descriptions-item>
      <el-descriptions-item
        label="预约号序"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.number }}
      </el-descriptions-item>
      <el-descriptions-item
        label="医事服务费"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.amount }}
      </el-descriptions-item>
      <el-descriptions-item
        label="建议取号时间"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.fetchTime }}
      </el-descriptions-item>
      <el-descriptions-item
        label="取号地点"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.fetchAddress }}
      </el-descriptions-item>
      <el-descriptions-item
        label="退号时间"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.quitTime }}
      </el-descriptions-item>
      <el-descriptions-item
        label="订单状态"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.param.orderStatusString }}
      </el-descriptions-item>
      <el-descriptions-item
        label="预约时间"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.orderInfo.createTime }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="m-t-30" title="就诊人信息" :column="2" border>
      <el-descriptions-item
        label="姓名"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.name }}
      </el-descriptions-item>
      <el-descriptions-item
        label="证件类型"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.param.certificatesTypeString }}
      </el-descriptions-item>
      <el-descriptions-item
        label="证件编号"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.certificatesNo }}
      </el-descriptions-item>
      <el-descriptions-item
        label="性别"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.sex === 1 ? '男' : '女' }}
      </el-descriptions-item>
      <el-descriptions-item
        label="出生年月"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.birthdate }}
      </el-descriptions-item>
      <el-descriptions-item
        label="手机"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.phone }}
      </el-descriptions-item>
      <el-descriptions-item
        label="是否结婚"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.isMarry === 1 ? '是' : '否' }}
      </el-descriptions-item>
      <el-descriptions-item
        label="地址"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.param.fullAddress }}
      </el-descriptions-item>
      <el-descriptions-item
        label="联系人姓名"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.contactsName }}
      </el-descriptions-item>
      <el-descriptions-item
        label="联系人证件类型"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.param.contactsCertificatesTypeString }}
      </el-descriptions-item>
      <el-descriptions-item
        label="联系人证件号"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.contactsCertificatesNo }}
      </el-descriptions-item>
      <el-descriptions-item
        label="联系人手机"
        label-align="right"
        align="center"
        width="100px"
      >
        {{ orderInfo.patient.contactsPhone }}
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
import { OrderDetailsInterfaceRes } from '@/api/order/types'
import { getOrderDetails } from '@/api/order'

const route = useRoute()
const router = useRouter()
console.log(route.query.id)
const orderInfo = ref({} as OrderDetailsInterfaceRes)
// 请求会员信息
const getOrderDetailsHandle = async () => {
  try {
    const res = await getOrderDetails(route.query.id as string)
    orderInfo.value = res.data
  } catch (error) {
    console.log(error)
  }
}
/* 生命周期 */
onMounted(() => {
  getOrderDetailsHandle()
})
</script>

<style lang="scss" scoped></style>
