import http from '@/utils/http'
import {
  MemberInfoInterfaceRes,
  MemberUserInfoInterface,
  PageRes,
} from '@/api/member/types'
/**
 * @description 获取会员列表
 * @param params
 */
export function getMemberList(params: {
  pageNum: number
  pageSize: number
  keyword: string
  authStatus?: number
  createTimeBegin: string
  createTimeEnd: string
}) {
  return http.get<PageRes<MemberUserInfoInterface[]>>(
    `admin/user/${params.pageNum}/${params.pageSize}`,
    {
      keyword: params.keyword,
      authStatus: params.authStatus,
      createTimeBegin: params.createTimeBegin,
      createTimeEnd: params.createTimeEnd,
    },
  )
}
/**
 * @description 获取会员信息接口
 * @param id
 */
// /admin/user/show/1
export function getMemberInfo(id: string) {
  return http.get<MemberInfoInterfaceRes>(`admin/user/show/${id}`)
}
/**
 * @description 锁定
 * @param params
 */
export function lockMember(params: { id: number; status: number }) {
  return http.get(`admin/user/lock/${params.id}/${params.status}`)
}
/**
 * @description 同意or不同意审批接口
 * @param params
 */
export function approval(params: { id: number; authStatus: number }) {
  return http.get(`admin/user/approval/${params.id}/${params.authStatus}`)
}
