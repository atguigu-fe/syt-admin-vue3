import http from '@/utils/http'
import {
  HospitalListInterfacePageRes,
  HospitalListInterfaceReq,
  HospitalListInterfaceRes,
  HospitalSetListInterfaceReq,
  HospitalSetListInterfaceRes,
  PageRes,
  ProvinceInfoInterfaceRes,
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
export function batchRemoveHospitalSet(params: number[]) {
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
