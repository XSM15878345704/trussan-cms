import axios from 'axios';


const urlGetList = '/select';


const api = {
  getList(status) {
    const url = `${urlGetList}?index=${status}`;
    return axios.get(url);
    // .then(res =>{
    //   return res
    // });
  },


};


export default api;
