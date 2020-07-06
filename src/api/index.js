import {request} from "@/common/utils/request";

// banner
export function getBanner() {
  return request('banner', 'get');
}

// 推荐列表
export function getList(page) {
  return request(`/list?page=${page}`, 'get')
}

// 音乐详情
export function getDetail(id) {
  return request(`/detail?id=${id}`, 'get')
}

// 相关列表
export function getOther() {
  return request('/other', 'get')
}


