import request from "../utils/instance";
// 1.单文件上传处理「FORM-DATA」:由服务器自动生成文件的名字
export const uploadSingle = (data) => {
  return request({
    url: "/upload_single",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
// 2.单文件上传处理「FORM-DATA」:由客户端生成文件的名字，传递给服务器处理
export const uploadSingleName = (data) => {
  return request({
    url: "/upload_single_name",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
// 3.单文件上传处理「BASE64」
export const uploadSingleBase64 = (data) => {
  return request({
    url: "/upload_single_base64",
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
// 4.上传切片
export const uploadChunk = (data) => {
  return request({
    url: "/upload_chunk",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
// 5.合并切片
export const uploadMerge = (data) => {
  return request({
    url: "/upload_merge",
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
// 6.获取已经上传的切片
export const uploadAlready = (params) => {
  return request({
    url: "/upload_already",
    method: "GET",
    params
  });
};
