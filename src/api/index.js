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