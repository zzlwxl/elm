//拼接URL字符串
function urlStr(url,data={}){
    let urlStr='';
        Object.keys(data).forEach(key=>{
            urlStr+=key+'='+data[key]+'&'
        })
        if(urlStr !== ''){
            urlStr=urlStr.slice(0,urlStr.length-1)
            url=url+'?'+urlStr
        }
        return url;
}
//搜索页面
export const searchPage='/search'
//城市列表页面
export const homePage='/home'
//搜索地点的商品页面
export const searchFoodsPage=(latitude,longitude)=>{
    return urlStr('/msite',{
        geohash:`${latitude},${longitude}`
    })
}
//商家食品列表页面
export const restaurantInfoPage=(latitude,longitude,id)=>{
    return urlStr('/shop',{
        geohash:`${latitude},${longitude}`,
        id:id
    })
}