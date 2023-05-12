import http from '@/utils/http'
import {
  MemberInfoInterfaceRes,
  MemberUserInfoInterface,
} from '@/api/member/types'
/**
 * @description 获取会员列表
 * @param params
 */
export function getMemberList(params: {
  pageNum: number
  pageSize: number
  keyword: string
  createTimeBegin: string
  createTimeEnd: string
}) {
  return http.get<MemberUserInfoInterface[]>(
    `admin/user/${params.pageNum}/${params.pageSize}`,
    {
      keyword: params.keyword,
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
