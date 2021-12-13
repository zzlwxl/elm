import axios from 'axios'
import { getRestaurantUrl } from './getDataUrl'
export const getRestaurants2 = (url, latitude, longitude, offset, limit, keyword, restaurant_category_id, restaurant_category_ids, order_by, delivery_mode, support_ids = []) => {
  let supportStr = ''
  support_ids.forEach((item) => {
    if (item.status) {
      supportStr += '&support_ids=' + item.id
    }
  })
  let data = {
    latitude,
    longitude,
    offset,
    limit,
    keyword,
    restaurant_category_id,
    restaurant_category_ids,
    order_by,
    delivery_mode: delivery_mode + supportStr ? undefined : delivery_mode + supportStr,
  }
  let result = axios.get(getRestaurantUrl(url, data))
  return result
}

export const getRestaurants = (data) => {
  let supportStr = ''
  if (data.hasOwnProperty('support_ids')) {
    support_ids.forEach((item) => {
      if (item.status) {
        supportStr += '&support_ids=' + item.id
      }
    })
  }
  //   data.delivery_mode = data.delivery_mode + supportStr ? undefined : data.delivery_mode + supportStr
  return requestGet('/shopping/restaurants', data)
}

export const requestGet = (url, data) => {
  let params = []
  if (data) {
    Object.keys(data).forEach((key) => {
      if (!(data[key] === undefined || data[key] == null || data[key] === 'null' || data[key] === {} || data[key] === [] || data[key].length === 0)) {
        if (data[key].constructor === Array) {
          data[key].forEach((value) => {
            console.log(key + '[]=' + value)
            params.push(key + '[]=' + value)
          })
        }
        //如果传过来的对象是坐标，就做处理
        else if (data[key].constructor === Object) {
          params.push('latitude' + '=' + data.obj.latitude)
          params.push('longitude' + '=' + data.obj.longitude)
        } else {
          console.log(data[key])
          params.push(key + '=' + data[key])
        }
      }
    })
    console.log(url + '?' + params.join('&'))
    return axios.get(url + '?' + params.join('&'))
  } else {
    console.log(url)
    return axios.get(url)
  }
}
