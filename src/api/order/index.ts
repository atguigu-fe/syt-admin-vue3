import http from '@/utils/http'
import {
  OrderDetailsInterfaceRes,
  OrderInfoInterfaceRes,
  OrderStatus,
  PageRes,
} from '@/api/order/types'
/**
 * @description 获取订单列表
 * @param params
 */
export function getOrderList(params: {
  pageNum: number
  pageSize: number
  hosname: string // 医院名称
  outTradeNo: string // 订单号
  patientName: string // 就诊人姓名
  createTimeBegin: string // 开始日期
  createTimeEnd: string // 结束日期
  reserveDate: string // 就诊日期
  orderStatus: number // 订单状态
}) {
  return http.get<PageRes<OrderInfoInterfaceRes[]>>(
    `/admin/order/orderInfo/${params.pageNum}/${params.pageSize}`,
    {
      hosname: params.hosname,
      outTradeNo: params.outTradeNo,
      patientName: params.patientName,
      createTimeBegin: params.createTimeBegin,
      createTimeEnd: params.createTimeEnd,
      reserveDate: params.reserveDate,
      orderStatus: params.orderStatus,
    },
  )
}
/**
 * @description 获取订单状态列表
 */
export function getOrderStatusList() {
  return http.get<OrderStatus[]>('/admin/order/orderInfo/getStatusList')
}
/**
 * @description 获取订单详情信息接口
 * @param id
 */
export function getOrderDetails(id: string) {
  return http.get<OrderDetailsInterfaceRes>(`/admin/order/orderInfo/show/${id}`)
}
