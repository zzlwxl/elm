import http from '@/config/http.js'
/**
 * 获取商家食品分类列表
 */
export const getHttpFoodList=restaurant_id=>http('/shopping/v2/menu',{
    restaurant_id:restaurant_id
})
/**
 * 获取城市列表
 */
export const getHttpCitys=()=>http('/v1/cities',{
    type:'group'
})
/**
 * 获取当前城市名字
 */
export const getHttpCityName=id=>http('/v1/cities/'+id)
/**
 * 获取搜索地址
 */
export const getHttpSearchCityName=(id,value)=>http('/v1/pois',{
    type:'search',
    city_id:id,
    keyword:value
})
/**
 * 根据经纬度获取相信定位
 */
export const getHttpLLGetLocal=(latitude,longitude)=>http(`/v2/pois/${latitude},${longitude}`)
/**
 * 获取轮播图食品分类列表
 */
export const getHttpFoodCate=()=>http('/v2/index_entry')
/**
 * 获取附近商家列表
 */
export const getHttpLocalRestaurants=(objData,offset,limit)=>http('/shopping/restaurants',{
    latitude:objData.latitude,
    longitude:objData.longitude,
    offset:offset,
    limit:limit
})
/**
 * 获取搜索的商家列表
 */
export const getHttpSearchRestaurants=(geohash,keyword)=>http('/v4/restaurants',{
    geohash,
    keyword
})

/**
 * 获取食品分类选项列表
 */
export const getHttpFoodItemList=(latitude,longitude)=>http('/shopping/v2/restaurant/category',{
    latitude:latitude,
    longitude:longitude
})
/**
 * 获取商家头部信息
 */
export const getHttpRestaurantsHeader=(id)=>http('/shopping/restaurant/'+id)
/**
 * 获取商家评价信息
 */
export const getHttpRatings=(id)=>http(`/ugc/v2/restaurants/${id}/ratings/scores`)
/**
 * 获取评价分类
 */
export const getHttpRatingsTags=(id)=>http(`/ugc/v2/restaurants/${id}/ratings/tags`)
/**
 * 获取评价信息
 */
export const getHttpRatingsList=(restaurant_id,tag_name,offset,limit)=>http(`/ugc/v2/restaurants/${restaurant_id}/ratings`,{
    tag_name:tag_name,
    offset:offset,
    limit:limit
})
/**
 * 获取验证码
 */
export const postHttpCode=()=>http('/v1/captchas',{},"POST")
/**
 * 登录
 */
export const postHttpLogin=(username,password,captcha_code,cap)=>http('/v2/login',{
    username:username,
    password:password,
    captcha_code:captcha_code,
    cap:cap
},'POST')
/**
 * 获取用户信息
 */
export const getHttpUserInfo=(user_id)=>http('/v1/user',{
    user_id:user_id
})
/**
 * 修改密码
 */
export const postHttpChangePassword=(username,oldpassWord,newpassWord,confirmpassword,captcha_code,cap)=>http('/v2/changepassword',{
    username:username,
    oldpassWord:oldpassWord,
    newpassword:newpassWord,
    confirmpassword:confirmpassword,
    captcha_code:captcha_code,
    cap:cap
},'POST')
/**
 * 新增收货地址
 */
export const postHttpAddAddress = (user_id,address,address_detail,geohash,name,phone,tag,sex,phone_bk,tag_type)=>http(`/v1/users/${user_id}/addresses`,{
    user_id,address,address_detail,geohash,name,phone,tag,sex,phone_bk,tag_type
},'POST')
/**
 * 获取收货地址列表
 */
export const getHttpAddressList = (user_id) => http(`/v1/users/${user_id}/addresses`)
/**
 * 删除收货地址
 */
export const delHttpDelAddress = (address_id,user_id) => http(`/v1/users/${user_id}/addresses/${address_id}`,{},'DELETE')
/**
 * 加入购物车
 */
export const postHttpAddCar = (restaurant_id,geohash,entities) =>http('/v1/carts/checkout',{
    restaurant_id,geohash,entities
},'POST')
/**
 * 提交订单
 */
export const postHttpOrder = (user_id,cart_id,address_id,restaurant_id,geohash,description,entities)=> http(`/v1/users/${user_id}/carts/${cart_id}/orders`,{
    user_id,cart_id,address_id,restaurant_id,geohash,description,entities
},'POST')
/**
 * 获取订单列表
 */
export const getHttpOrderList = (user_id,limit,offset)=>http(`/bos/v2/users/${user_id}/orders`,{
    user_id,limit,offset
})
/**
 * 获取订单详情
 */
export const getHttpOrderInfo = (user_id,order_id) => http(`/bos/v1/users/${user_id}/orders/${order_id}/snapshot`)
/**
 * 获取可用红包
 */
export const getHttpRed=(user_id,limit,offset)=>http(`/promotion/v2/users/${user_id}/hongbaos`,{
    user_id,limit,offset
})