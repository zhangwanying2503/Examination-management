import axios from 'axios';
function request(url,option={}){
  option.headers={
    Authorization:localStorage.getItem('token')
  };
  const {method,data}=option;
  return axios({
    url:'/api'+url,
    method:method||'GET',
    params:method===('GET'||'DELETE')?data:'',
    data:method!==('GET'||'DELETE')?data:'',
    headers:option.headers
  });
}
export default request;