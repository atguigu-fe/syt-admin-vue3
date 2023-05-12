// 订单状态接口
export interface OrderStatus {
  comment: string
  status: number
}
// 订单信息接口
export interface OrderInfoInterfaceRes {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    orderStatusString: string
  }
  userId: number
  outTradeNo: string
  hoscode: string
  hosname: string
  depcode: string
  depname: string
  scheduleId: null | string
  title: string
  reserveDate: string
  reserveTime: number
  patientId: number
  patientName: string
  patientPhone: string
  hosRecordId: string
  number: number
  fetchTime: string
  fetchAddress: string
  amount: number
  quitTime: string
  orderStatus: number
}
// * 分页响应参数
export interface PageRes<T> {
  records: T[]
  pages?: number
  size?: number
  total: number
}
// 订单信息接口
export interface OrderDetailsInterfaceRes {
  patient: PatientInfoInterfaceRes
  orderInfo: OrderInfoInterfaceRes
}
// 就诊人信息接口
export interface PatientInfoInterfaceRes {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    certificatesTypeString: null | string
    contactsCertificatesTypeString: null | string
    cityString: string
    fullAddress: string
    districtString: string
    provinceString: string
  }
  userId: number
  name: string
  certificatesType: string
  certificatesNo: string
  sex: number
  birthdate: null | string
  phone: string
  isMarry: number
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  contactsName: string
  contactsCertificatesType: string
  contactsCertificatesNo: string
  contactsPhone: string
  isInsure: number
  cardNo: null | string
  status: string
  checked?: boolean
}
// * 分页响应参数
export interface PageRes<T> {
  records: T[]
  pages?: number
  size?: number
  total: number
}
