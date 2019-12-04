import axios, { AxiosResponse } from 'axios'
export const accessToPrivate = async (sessionId: string): Promise<AxiosResponse> => {
  return await axios({
    url: 'http://manage.yunlsp.com/unified/api/user/info',
    params: {
      sessionId,
    },
  })
}
