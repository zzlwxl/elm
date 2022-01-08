import http from 'axios'

http.defaults.withCredentials=true
export default async(url,data={},type='GET')=>{
    type=type.toUpperCase();
    if(type==='GET' || type ==='DELETE'){
        let urlStr='';
        Object.keys(data).forEach(key=>{
            urlStr+=key+'='+data[key]+'&'
        })
        if(urlStr !== ''){
            urlStr=urlStr.slice(0,urlStr.length-1)
            url=url+'?'+urlStr
        }
    }
    let requestConfig = {
        // credentials: 'include',
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        cache: "force-cache"
    }
    if(type=='POST'){
        requestConfig.data=JSON.stringify(data)
        console.log(requestConfig.data)
    }
    try{
        const response = await http(url,requestConfig);
        return response
    }catch(error){
        throw new Error(error)
    }

}