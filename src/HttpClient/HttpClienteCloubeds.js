import { CLoubedsRoute} from "../config";

const PostGetHotelCloudbeds = async () => {
    try {
        const resp = await fetch(`${CLoubedsRoute.serverRoute}/api/hotels/cloubeds/getHotel`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        });
        if (!resp.ok) {
            throw new Error('Response is not ok');
          }
          const data = await resp.json();
          return data
    } catch (error) {
        console.error('Error in PostInformeInfomeMetricas:', error);
        throw error; // You can re-throw the error or handle it differently based on your needs
    }
};

  export default {
    PostGetHotelCloudbeds
  }