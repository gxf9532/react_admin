import ajax from './ajax'
// import axios from 'axios'
// export default function loginRequest(username, password) {
//     return axios({
//         method: 'post',
//         // headers: {'content-type': 'application/x-www-form-urlencoded'},
//         url: '/login',
//         data: {
//             username,
//             password
//         }
//     })
// }

export const loginRequest = (username, password) => ajax.post('/login', {username, password})

export const reqAddCategory = (name, parentId) => ajax.post('/manage/category/add', { name, parentId })

export const reqCategory = (parentId) => ajax.get('/manage/category/list?parentId=' + parentId)

export const reqUpdateCategory = (_id, name) => ajax.post('/manage/category/update', {_id, name})

export const reqAllCategory = () => ajax.get('/manage/category/listAll')

// 删除文件
export const reqDeleteImg = name => ajax.post('/manage/img/delete', { name }) 

// 添加商品
export const reqAddProduct = product => ajax.post('/manage/product/add', { product })

// 验证商品名是否重复 
export const reqGoodsName = name => ajax.get('/manage/product/name?name=' + name)

// 请求商品数据(带分页)
export const reqProducts = (pageNum, pageSize) => ajax.get('/manage/product/list', {
    params: {
        pageNum,
        pageSize
    }
})

// 添加角色
export const addRoles = name => ajax.post('/manage/role/add', { name })

// 请求所有角色 
export const reqRoles = () => ajax.get('/manage/role/list')

// 更新角色 
export const updateRoles = role => ajax.post('/manage/role/update', role)