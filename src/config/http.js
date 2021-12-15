import http from 'axios'
export default async(url,data={},type='GET')=>{
    type=type.toUpperCase();
    if(type=='GET'){
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
        credentials: 'include',
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        cache: "force-cache"
    }
    if(type=='POST'){
        Object.defineProperty(requestConfig,'body',{
            value:JSON.stringify(data)
        })
    }
    try{
        console.log('---'+url)
        const response = await http(url,requestConfig);
        // console.log(response)
        return response
    }catch(error){
        throw new Error(error)
    }

}