import { Injectable, HttpService } from '@nestjs/common'
import { AxiosResponse } from 'Axios'
import { Observable } from 'rxjs'
@Injectable()
export class HttpsService {
  constructor(private readonly httpService: HttpService) {
  }

  /**
   * post请求
   * @date 2019-11-28
   * @param {string} url: 请求地址
   * @param {any} data: 请求信息
   * @param {object} config: 请求配置
   * @returns {any} AxiosResponse
   */
  httpPost(url: string, data?: any, config?: object): Observable<AxiosResponse> {
    return this.httpService.post(url, data, config);
  }
  /**
   * get请求
   * @date 2019-11-28
   * @param {string} url:请求地址
   * @param {any} config?:请求体
   * @returns {any} AxiosResponse
   */
  httpGet(url: string, config?: object): Observable<AxiosResponse> {
    return this.httpService.get(url, config);
  }
}