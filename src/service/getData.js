import http from '@/config/http.js'
/**
 * 获取商家食品分类列表
 */
//  requestGet('/shopping/v2/menu?restaurant_id=' + this.id)
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