export interface HospitalSetListInterfaceRes {
  id?: number
  createTime?: string
  updateTime?: string
  isDeleted?: number
  param?: any
  hosname: string
  hoscode: string
  apiUrl: string
  signKey?: string
  contactsName: string
  contactsPhone: string
  status?: number
}
// * 分页响应参数
export interface PageRes<T> {
  records: T[]
  pages?: number
  size?: number
  total: number
}
// 医院设置搜索条件
export interface HospitalSetListInterfaceReq {
  pageNum: number
  pageSize: number
  hosname: string
  hoscode: string
}
// 请求医院列表所需要参数
export interface HospitalListInterfaceReq {
  pageNum: number
  pageSize: number
  provinceCode?: number
  cityCode?: number
  districtCode?: number
  hosname?: string
  hoscode?: string
  hostype?: number
  status?: number
}
// * 分页响应参数
export interface HospitalListInterfacePageRes<T> {
  content: T[]
  pages?: number
  size?: number
  totalElements: number
}
// 医院列表响应接口
export interface HospitalListInterfaceRes {
  id: string
  intro?: string
  createTime: string
  updateTime: string
  isDeleted: number
  logoData: string
  param: {
    hostypeString: string
    fullAddress: string
  }
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  route: string
  status: number
  bookingRule?: BookingRuleInterface
}
// bookingRule条件
export interface BookingRuleInterface {
  cycle: number
  releaseTime: string
  stopTime: string
  quitDay: number
  quitTime: string
  rule: string[]
}
// 省份信息
export interface ProvinceInfoInterfaceRes {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: Record<string, unknown>
  parentId: number
  name: string
  value: string
  dictCode: null | string
  hasChildren: boolean
  label?: string
}
// 查看医院详情接口
export interface HospitalDetailInterfaceRes {
  hospital: HospitalListInterfaceRes
  bookingRule: BookingRuleInterface
}
// 医院科室信息接口
export interface DepartmentInterfaceRes {
  depcode: string
  depname: string
  children: DepartmentInterfaceRes[]
}
// 预约详情接口
export interface BookingScheduleRuleInterfaceRes {
  baseMap: {
    workDateString: string
    releaseTime: string
    bigname: string
    stopTime: string
    depname: string
    hosname: string
  }
  bookingScheduleList: BookingScheduleDateInterface[]
  total: number
}
// 预约日期接口
export interface BookingScheduleDateInterface {
  workDate: string
  workDateMd: string
  dayOfWeek: string
  docCount: number
  reservedNumber: number
  availableNumber: number
  status: number
  curClass?: string
}
// 日程列表接口
export interface ScheduleListInterfaceRes {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    dayOfWeek: string
    depname: string
    hosname: string
  }
  hoscode: string
  depcode: string
  title: string
  docname: string
  skill: string
  workDate: string
  workTime: number
  reservedNumber: number
  availableNumber: number
  amount: number
  status: number
  hosScheduleId: string
}
