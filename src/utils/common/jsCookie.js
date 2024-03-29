/**
 * @author SHUF
 * @date 2023-04-04 10:34:08
 * @Description cookie增、删、读
 */

import Cookies from 'js-cookie'

export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(TokenKey, token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}
