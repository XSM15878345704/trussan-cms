import axios from 'axios';


const urlGetList = '/select';
const urlDelList = '/delData';
const urlGetPage = '/getPage';
const urlEditor = '/editor';
const urlAdd = '/addData';
const urlEditorItem = '/selectItem';
const urlUpdate = '/update';
const urlGetPageList = '/getPageList';


const api = {
  getList(status) { // 获取数据
    const url = `${urlGetList}?status=${status}`;
    return axios.get(url);
    // .then(res =>{
    //   return res
    // });
  },
  getEditorItem(status, id) { // 获取单条数据信息
    const url = `${urlEditorItem}?status=${status}&id=${id}`;
    return axios.get(url);
  },
  delList(id, status) { // 单条删除
    const url = `${urlDelList}?id=${id}&status=${status}`;
    return axios.get(url);
  },
  delAll(status, idArr) { // 批量删除
    const url = `${urlDelList}?status=${status}&idArr=${idArr}`;
    return axios.get(url);
  },
  getpage(status) { // 获取页数
    const url = `${urlGetPage}?status=${status}`;
    return axios.get(url);
  },
  addList(params) { // 添加文章
    return axios.post(urlAdd, params);
  },
  updataList(params) { // 更新编辑
    return axios.post(urlUpdate, params);
  },
  getPageList(st, cur_page) { // 翻页请求
    const url = `${urlGetPageList}?status=${st}&cur_page=${cur_page}`;
    return axios.get(url);
  },
};


export default api;
