export const getRestaurantUrl = (url,data)=>{
    let paramStr='?'
    if(data){
        Object.keys(data).forEach((item)=>{
            // console.log(item)
            // console.log(data[item])
            if(data[item]===undefined){
            }
            else{
                paramStr+=item+'='+data[item]+'&'
            }
        })
        return url+=paramStr.slice(0,paramStr.length-1)
    }else{
        return url
    }
}