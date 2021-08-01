import request from '@/utils/request';

class GenericRequest{
  get(url, query) {
    return request({
      url: url,
      method: 'get',
      params: query,
    });
  }
  post(url, data) {
    return request({
      url: url,
      method: 'post',
      data: data,
    });
  }
  postWithId(url, id, data) {
    return request({
      url: url + '/' + id,
      method: 'post',
      data: data,
    });
  }
  put(url, data) {
    return request({
      url: url,
      method: 'put',
      data: data,
    });
  }
  putWithId(url, id, data) {
    return request({
      url: url + '/' + id,
      method: 'put',
      data: data,
    });
  }
  delete(url, data) {
    return request({
      url: url,
      method: 'delete',
    });
  }
}
export { GenericRequest as default };
