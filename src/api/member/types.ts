// 会员信息接口
export interface MemberInfoInterfaceRes {
  patientList: PatientInfoInterfaceRes[]
  userInfo: MemberUserInfoInterface
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
export interface MemberUserInfoInterface {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    certificatesTypeString: string
    statusString: string
    authStatusString: string
  }
  openid: string
  nickName: string
  phone: string
  name: string
  certificatesType: string
  certificatesNo: string
  certificatesUrl: string | null
  authStatus: number
  status: number
}
