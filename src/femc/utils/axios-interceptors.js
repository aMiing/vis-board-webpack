function getHeader() {
  // 获取头部信息
  return window.__GDIOS__HEADER__ || {};
}
function setHeader(option, replace = false) {
  // 设置头部信息
  window.__GDIOS__HEADER__ = replace
    ? option
    : Object.assign(window.__GDIOS__HEADER__ || {}, option);
}
function axiosInterceptors(axios) {
  // 添加请求拦截器
  axios.interceptors.request.use(
    function (config) {
      // TODO:在gpu发送请求之前做些什么
      config.headers = Object.assign(config.headers, getHeader());
      return config;
    },
    function (error) {
      // TODO:对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axios.interceptors.response.use(
    function (response) {
      // TODO:对响应数据做点什么
      return response;
    },
    function (error) {
      // TODO:对响应错误做点什么
      return Promise.reject(error);
    }
  );
}

export { axiosInterceptors, setHeader, getHeader };
