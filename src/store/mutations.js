import{
    RECORD_ADDRESS,
    RECORD_GEOHASH
} from '@/store/mutation-types.js'
export default{
    [RECORD_ADDRESS](state,lltude){
        state.latitude=lltude[0],
        state.longitude=lltude[1]
    },
    [RECORD_GEOHASH](state,lltude){
        state.geohash=lltude[0]+','+lltude[1]
    }
}