// api接口统一管理
import requests from "./require";

// 主页
export function reqList(a1) {
    let start = 0
    let length = a1
    let param = "start=" + start + "&length=" + length
    return requests.post("/getproduct.php", param)
}


// 详情页
export function reqList1(a) {
    let did = a
    let param = "did=" + did
    return requests.post("/getItem.php", param)
}

// 商品搜索接口：
export function reqListx(value, a1) {
    let keyword = value
    let start = 0
    let length = a1
    let param = "keyword=" + keyword + "&start=" + start + "&length=" + length
    return requests.post("/searchval.php", param)
}

// 查看订单接口：
// export function reqList2(mount,begin) {
//     let length = mount
//     let start = begin
//     let param = "start=" + start + "&length=" + length
//     return requests.post("/orderInfo.php", param)
// }

// 商品的订单接口

export function reqList3() {
    let did = ""
    let tel = ""
    let uerName = ""
    let sex = ""
    let address = ""
    let param = "did=" + did + "&tel=" + tel + "& uerName=" + uerName + "&sex=" + sex + "&address=" + address
    return requests.post("/addOrder.php", param)
}


// 登录接口 loginToken.php
// export function requList4(a1, a2, a3) {
//     let userName = a1
//     let password = a2
//     let checked = a3
//     let param = "userName=" + userName + "&password=" + password
//     return requests.post("/loginToken.php", param).then((res) => {
//         console.log(res);
//         console.log(userName);
//         if (res.data.code == "1000") {
//             alert("成功登录！")
//             let token = res.data.subjects.token;
//             if (!checked) {
//                 localStorage.setItem("UserState", JSON.stringify({ token: token }))
//             }
//             else {
//                 localStorage.setItem("UserState", JSON.stringify({ token: token, userName: a1, password: a2 }))
//             }
//         }
//         else {
//             alert("失败，请重新输入！")
//         }
//     })
// }
