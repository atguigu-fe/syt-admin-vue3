import http from '@/utils/http'
import {
  BookingScheduleRuleInterfaceRes,
  DepartmentInterfaceRes,
  HospitalDetailInterfaceRes,
  HospitalListInterfacePageRes,
  HospitalListInterfaceReq,
  HospitalListInterfaceRes,
  HospitalSetListInterfaceReq,
  HospitalSetListInterfaceRes,
  PageRes,
  ProvinceInfoInterfaceRes,
  ScheduleListInterfaceRes,
} from '@/api/hospital/types'

/**
 * @description 获取医院设置列表
 * @param params
 */
export function getHospitalSetList(params: HospitalSetListInterfaceReq) {
  return http.get<PageRes<HospitalSetListInterfaceRes[]>>(
    `/admin/hosp/hospitalSet/${params.pageNum}/${params.pageSize}`,
    { hosname: params.hosname, hoscode: params.hoscode },
  )
}
/**
 * @description 批量删除医院设置
 * @param params
 */
export function batchRemoveHospitalSet(params: string[]) {
  return http.delete(`/admin/hosp/hospitalSet/batchRemove`, params)
}
/**
 * @description 单个删除医院设置
 * @param id
 */
export function removeHospitalSet(id: number) {
  return http.delete(`/admin/hosp/hospitalSet/remove/${id}`)
}
/**
 * @description 新增医院设置
 * @param params
 */
export function saveHospitalSet(params: HospitalSetListInterfaceRes) {
  return http.post(`/admin/hosp/hospitalSet/save`, params)
}
/**
 * @description 修改更新医院设置
 * @param params
 */
export function updateHospitalSet(params: HospitalSetListInterfaceRes) {
  return http.put(`/admin/hosp/hospitalSet/update`, params)
}
/**
 * @description  请求医院列表
 * @param params
 */
export function getHospitalList(params: HospitalListInterfaceReq) {
  return http.get<HospitalListInterfacePageRes<HospitalListInterfaceRes[]>>(
    `/admin/hosp/hospital/${params.pageNum}/${params.pageSize}`,
    {
      provinceCode: params.provinceCode,
      cityCode: params.cityCode,
      districtCode: params.districtCode,
      hosname: params.hosname,
      hoscode: params.hoscode,
      hostype: params.hostype,
      status: params.status,
    },
  )
}
/**
 * @description  获取省份列表
 */
export function getProvinceList() {
  return http.get<ProvinceInfoInterfaceRes[]>(
    `/admin/cmn/dict/findByDictCode/Province`,
  )
}
/**
 * @description  请求市、区列表
 * @param id
 */
export function getCityOrDistrictList(id: number) {
  return http.get<ProvinceInfoInterfaceRes[]>(
    `/admin/cmn/dict/findByParentId/${id}`,
  )
}
/**
 * @description  查看医院详情接口
 * @param id
 */
export function getHospitalDetail(id: string) {
  return http.get<HospitalDetailInterfaceRes>(`/admin/hosp/hospital/show/${id}`)
}
/**
 * @description  获取医院科室列表
 * @param hoscode
 */
export function getDepartmentList(hoscode: string) {
  return http.get<DepartmentInterfaceRes[]>(`/admin/hosp/department/${hoscode}`)
}
/**
 * @description  获取预约信息列表
 * @param page
 * @param limit
 * @param hoscode
 * @param depcode
 */
export function getBookingScheduleRule(
  page: number,
  limit: number,
  hoscode: string,
  depcode: string,
) {
  return http.get<BookingScheduleRuleInterfaceRes>(
    `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
  )
}
/**
 * @description  获取医生日程列表
 * @param hoscode
 * @param depcode
 * @param workDate
 */
export function getScheduleDetail(
  hoscode: string,
  depcode: string,
  workDate: string,
) {
  return http.get<ScheduleListInterfaceRes[]>(
    `/admin/hosp/schedule/findScheduleList/${hoscode}/${depcode}/${workDate}`,
  )
}
/**
 * @description  更新医院状态
 * @param id
 * @param status
 */
export function reqUpdateStatus(id: string, status: number) {
  return http.get(`/admin/hosp/hospital/updateStatus/${id}/${status}`)
}
