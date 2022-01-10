import { RECORD_ADDRESS,SET_SUBSUCCESS,SET_CARID,CHOOSE_ADDRESSS,ADD_HISTORYCITY,ADD_ADDRESS,GET_CARALL_LIST,SET_CITYID,DEL_ADDRESS,CLEAR_HISORYADDRESS,GET_ADDRESS,SET_LOGINSTATE,OUT_LOGIN,SET_USERNAME, RECORD_GEOHASH, ADDCAR_LIST ,DELCAR_LIST,DELCARALL_LIST,WRITE_USERINFO,GET_USERINFO} from '@/store/mutation-types.js'
import { getStore, setStore ,removeStore} from '@/utils/utils.js'
export default {
  [RECORD_ADDRESS](state, lltude) {
    ;(state.latitude = lltude[0]), (state.longitude = lltude[1])
  },
  [CLEAR_HISORYADDRESS](state){
    state.hisorySerachAddressList=[]
  },
  //获取历史历史记录存入vuex
  [GET_ADDRESS](state){
    if (getStore('placeHistory')) {
      //如果有历史记录就添加
      state.hisorySerachAddressList = JSON.parse(getStore('placeHistory'))
    }
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
      packing_fee,
      food_id, //规格ID
      price, //价格
      sku_id,
      specs,//规格
      stock,
    }
  ) {
     let carList=state.carList
     let shop = carList[shop_id]=(carList[shop_id] || {})
     let cate = shop[cate_id]=(shop[cate_id]|| {})
     let item = cate[item_id]=(cate[item_id] || {})
     if(item[food_id]){
         item[food_id]['quantity']++
     }else{
         item[food_id]={
             'quantity':1,
             'food_id':food_id,
             'name':name,
             'packing_fee':packing_fee,
             'price':price,
             'sku_id':sku_id,
             'specs':specs,
             'stock':stock
         }
     }
     state.carList={...carList}
     setStore('carList',state.carList)
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
          if(item[food_id]['quantity'] > 0){
            console.log('vuex')
              item[food_id]['quantity']--
              state.carList={...carList}}
              setStore('carList',state.carList)
              if(item[food_id]['quantity']==0){
                item[food_id]=null
              console.log('~~~~')
            }
      }
  },
  //清空购物车
  [DELCARALL_LIST](state,shop_id){
    state.carList[shop_id]=null
    state.carList={...state.carList}
    setStore('carList',state.carList)
    console.log('vuex数据')
    console.log(state.carList)
  },
  //获取本地购物车列表存入vuex
  [GET_CARALL_LIST](state){
    let sessionCarList = getStore('carList');
		if (sessionCarList) {
			state.carList = JSON.parse(sessionCarList);
		}
  },
  //记录用户信息
  [WRITE_USERINFO](state,info){
    state.userInfo = info
    state.loginState=true
    setStore('user_id',info.user_id)
  },
  // 获取用户信息存入vuex
  [GET_USERINFO](state,value){
    state.loginState=true
    state.userInfo = value
  },
  //更改用户状态
  [SET_LOGINSTATE](state,value){
    state.loginState=value
  },
  //修改用户名
  [SET_USERNAME](state,username){
    state.userInfo=Object.assign({},state.userInfo,{username})
  },
  [OUT_LOGIN](state){
    state.userInfo=null
    state.loginState=false
  },
  [ADD_ADDRESS](state,value){
    state.address=value
  },
  [DEL_ADDRESS](state){
    state.address=''
  },
  [SET_CITYID](state,value){
    state.cityID=value
  },
  [ADD_HISTORYCITY](state,value){
    state.hisorySerachAddressList=value
  },
  //下单时选择的地址
  [CHOOSE_ADDRESSS](state,value){
    state.chooseAddress=value
  },
  //购物车ID
  [SET_CARID](state,value){
    state.carID=value
  },
  //下单成功刷新之前的商家购物车列表
  [SET_SUBSUCCESS](state,value){
    state.subSuccess = value
  },

}