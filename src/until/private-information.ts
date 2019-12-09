import axios, { AxiosResponse } from 'axios'
export const accessToPrivate = async (sessionId: string): Promise<any> => {
  return await axios({
    url: 'http://manage.yunlsp.com/unified/api/user/info',
    params: {
      sessionId,
    },
  })
}

export const loginPullOut = async (userName: string, password: string | number): Promise<any> => {
  const { data: res } = await axios({
    method: 'post',
    url: 'http://manage.yunlsp.com/unified/doLogin',
    params: {
      userName,
      password,
    },
  })
  return res
}
