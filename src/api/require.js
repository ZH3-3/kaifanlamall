// axios 二次封装
import axios from "axios";

let requests = axios.create({
    baseURL:"http://mengtion.vip/kfl-api/api/",
    timeout:3000,
})

export default requests;