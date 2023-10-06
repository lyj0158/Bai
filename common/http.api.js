const http = uni.$u.http

//登录
export const phoneLogin = (params) => http.post('/xcx.word/phoneLogin', params)
