import { RECORD_ADDRESS, RECORD_GEOHASH, ADDCAR_LIST ,DELCAR_LIST,DELCARALL_LIST} from '@/store/mutation-types.js'
export default {
  [RECORD_ADDRESS](state, lltude) {
    ;(state.latitude = lltude[0]), (state.longitude = lltude[1])
  },
  [RECORD_GEOHASH](state, lltude) {
    state.geohash = lltude[0] + ',' + lltude[1]
  },
  //添加购物车
  [ADDCAR_LIST](state,{
      shop_id, //商铺ID
      cate_id,//分类ID
      item_id,//食品ID
      name, //食品名字
      food_id, //规格ID
      price, //价格
      specs,//规格
    }
  ) {
     let carList=state.carList
     let shop = carList[shop_id]=(carList[shop_id] || {})
     let cate = shop[cate_id]=(shop[cate_id]|| {})
     let item = cate[item_id]=(cate[item_id] || {})
     if(item[food_id]){
         item[food_id]['num']++
     }else{
         item[food_id]={
             'num':1,
             'food_id':food_id,
             'name':name,
             'price':price,
             'specs':specs,
         }
     }
     state.carList={...carList}
  },
  //移除购物车
  [DELCAR_LIST](state,{
    shop_id, //商铺ID
    cate_id,//分类ID
    item_id,//食品ID
    food_id, //规格ID
  }){
      let carList=state.carList=(state.carList || {})
      let shop = carList[shop_id]=(carList[shop_id] || {})
      let cate = shop[cate_id]=(shop[cate_id] || {})
      let item = cate[item_id]=(cate[item_id] || {})
      if(item && item[food_id]){
          if(item[food_id]['num'] > 0){
            console.log('vuex')
              item[food_id]['num']--
              state.carList={...carList}}
              if(item[food_id]['num']==0){
                item[food_id]=null
              console.log('~~~~')
            }
      }
  },
  //清空购物车
  [DELCARALL_LIST](state,shop_id){
    state.carList[shop_id]=null
    state.carList={...state.carList}
    console.log('vuex数据')
    console.log(state.carList)
  }
}
