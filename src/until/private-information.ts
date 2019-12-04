import axios, { AxiosResponse } from 'axios'
import { ResultSend } from '../dto/result-dto';
export const accessToPrivate = async (sessionId: string): Promise<AxiosResponse> => {
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