import{
    RECORD_ADDRESS
} from '@/store/mutation-types.js'
export default{
    [RECORD_ADDRESS](state,lltude){
        state.latitude=lltude[0],
        state.longitude=lltude[1]
    }
}