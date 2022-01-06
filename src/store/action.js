import {getHttpUserInfo} from '@/service/getData.js'
import {GET_USERINFO} from '@/store/mutation-types.js'
export default{
    async getUserInfo(context,value){
        const {data} = await getHttpUserInfo(value)
        
        context.commit(GET_USERINFO,data)
        
    }
}