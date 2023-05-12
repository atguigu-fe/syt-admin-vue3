import http from '@/utils/http'
import { StatisticsInterfaceRes } from '@/api/statistics/types'
import { HospitalListInterfaceRes } from '@/api/hospital/types'
/**
 * @description 获取预约统计数据
 * @param params
 */
export function getAppointmentStatistics(params: {
  hoscode: string
  reserveDateBegin: string
  reserveDateEnd: string
}) {
  return http.get<StatisticsInterfaceRes>(
    '/admin/order/orderInfo/getCountMap',
    params,
  )
}
/**
 * @description 动态搜索医院列表
 * @param hosname
 */
// /api/hosp/hospital/findByHosname/%E4%BA%BA%E6%B0%91
export function getHospitalListByHosname(hosname: string) {
  return http.get<HospitalListInterfaceRes>(
    `/api/hosp/hospital/findByHosname/${hosname}`,
  )
}
