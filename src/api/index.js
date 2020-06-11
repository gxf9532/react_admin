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

export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', { categoryName })