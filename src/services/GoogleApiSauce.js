import {create} from 'apisauce';
import {
  API_LOG,
  API_TIMEOUT,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_NETWORK_NOT_AVAILABLE,
  UNKNOWN_ERROR,
  REQUEST_DENIED,
  INVALID_REQUEST,
  GOOGLE_MAP_BASE_URL,
} from '../config/WebService';
import Utils from '../util';

const googleApi = create({
  baseURL: GOOGLE_MAP_BASE_URL,
  timeout: API_TIMEOUT,
});

class GoogleApiSauce {
  async get(url, data) {
    console.log('url', url, 'data', data);
    let newData = {
      ...data,
      key: 'AIzaSyADvc8bS2yPhYzzZb2nnr33a42SnGDQ3ls',
    };
    const response = await googleApi.get(url, newData);
    return this.handleResponse(response);
  }

  handleResponse(response) {
    if (__DEV__ && API_LOG) {
      console.log('handleResponse for Google Api sause ', response);
    }
    return new Promise((resolve, reject) => {
      console.log('Google APi Saus', response);
      if (response.data.status === 'OK') {
        resolve(response);
      } else {
        let error = ERROR_SOMETHING_WENT_WRONG;

        if (response.data.status === 500) {
          error = ERROR_SOMETHING_WENT_WRONG;
          //   reject(ERROR_SOMETHING_WENT_WRONG);
        } else if (response.problem === 'NETWORK_ERROR') {
          error = ERROR_NETWORK_NOT_AVAILABLE;
          //   reject(ERROR_NETWORK_NOT_AVAILABLE);
        } else if (response.data.status === 'REQUEST_DENIED') {
          error = REQUEST_DENIED;
        } else if (response.data.status === 'UNKNOWN_ERROR') {
          error = UNKNOWN_ERROR;
        } else if (response.data.status === 'INVALID_REQUEST') {
          error = INVALID_REQUEST;
        }

        // var values = Object.keys(error).map(key => {
        //   return response.data.data[key];
        // });
        // return "• " + values.join("\n• ");
        // const errorMessage = "• " + values.join("\n• ");
        console.log('errorMessage ******* ', error);

        //Utils.MessageAlertError("", error.message);

        reject(error.message);
      }
    });
  }
}
export default new GoogleApiSauce();
