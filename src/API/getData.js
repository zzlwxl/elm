import axios from 'axios'
import { getRestaurantUrl } from './getDataUrl';
export const getRestaurants =(latitude, longitude, offset, limit,restaurant_category_id, 
restaurant_category_ids, order_by, delivery_mode, support_ids = [])=>{
    let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids=' + item.id;
		}
    });
        let data = {
            latitude,
            longitude,
            offset,
            limit,
            restaurant_category_id,
            restaurant_category_ids,
            order_by,
            delivery_mode: (delivery_mode + supportStr) ? undefined : (delivery_mode + supportStr)
        };
        let result= axios.get(getRestaurantUrl('/shopping/restaurants',data))
        return (result)
    }