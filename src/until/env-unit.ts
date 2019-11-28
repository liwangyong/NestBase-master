import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

/**
 * 格式化环境变量
 * @param key 环境变量的键值
 * @param defaultValue 默认值
 * @param callback 格式化函数
 */
const frontValue = <T>(
  key: string,
  defaultValue: T,
  callback: (value: string) => T,
): T => {
  const value: string | undefined = process.env[key];
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  return callback(value);
};

/**
 * 提取环境变量
 * @date 2019-11-28
 * @param {string} key 环境变量的键值
 * @param {any} defaultValue:any='默认值'
 * @returns {any} 映射值 || 默认值
 */
export const env = (key: string, defaultValue: any = '') =>
  frontValue(key, defaultValue, value => value)