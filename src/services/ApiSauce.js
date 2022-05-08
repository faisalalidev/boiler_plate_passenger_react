import base64 from "base-64";
import { create } from "apisauce";
import Utils from "../util";
import {
    API_LOG,
    BASE_URL,
    API_TIMEOUT,
    API_PASSWORD,
    APPLICATION_TOKEN,
    API_USER_NAME,
    ERROR_CLIENT,
    ERROR_REQUEST_CANCEL,
    ERROR_REQUEST_TIMEOUT,
    ERROR_SERVER_CONNECTION,
    ERROR_SOMETHING_WENT_WRONG,
    ERROR_NETWORK_NOT_AVAILABLE
} from "@config/WebService";

const api = create({
    baseURL: BASE_URL,
    headers: {
        token: APPLICATION_TOKEN
    },
    timeout: API_TIMEOUT
});

class ApiSauce {
    async post(url, data, headers) {
        // const mobileJson = { mobile_json: 1, ...data };
        // const response = await api.post(url, mobileJson, { headers });
        console.log("Post APisause *******   : ", url, data, headers);
        const response = await api.post(url, data, { headers });

        if (__DEV__ && API_LOG) {
            console.log(response);
        }
        return new Promise((resolve, reject) => {
            if (response.ok && response.data && !response.data.error) {
                resolve(response.data);
            } else {
                let error = ERROR_SOMETHING_WENT_WRONG;
                console.log("response ******* :", response);
                switch (response.problem) {
                    case "CLIENT_ERROR":
                        error = ERROR_CLIENT;
                        break;
                    case "TIMEOUT_ERROR":
                        error = ERROR_REQUEST_TIMEOUT;
                        break;
                    case "CONNECTION_ERROR":
                        error = ERROR_SERVER_CONNECTION;
                        break;
                    case "NETWORK_ERROR":
                    case "SERVICE_NOT_AVAILABLE":
                        error = ERROR_NETWORK_NOT_AVAILABLE;

                        Utils.noInternetMessage();

                        break;
                    case "CANCEL_ERROR":
                        error = ERROR_REQUEST_CANCEL;
                        break;
                    default:
                        error = "SERVER_ERROR";
                    // error = { status: response.status, ...ERROR_SOMETHING_WENT_WRONG };
                }

                // if (response.status !== 200) {
                //   Alert.alert(error.title, error.message, [{ text: "OK" }]);
                // }

                if (response && response.data && response.data.data) {
                    var values = Object.keys(response.data.data).map(key => {
                        return response.data.data[key];
                    });
                    // return "• " + values.join("\n• ");
                    const errorMessage = "• " + values.join("\n• ");
                    console.log("errorMessage ******* ", errorMessage);

                    Utils.MessageAlertError("", errorMessage);
                }

                if (response.status === 500) {
                    reject(ERROR_SOMETHING_WENT_WRONG);
                }
                reject(response.data || error);
            }
        });
    }

    async get(url, data, headers) {
        // const mobileJson = { mobile_json: 1, ...data };
        // const response = await api.get(url, mobileJson, { headers });
        console.log("url : ", url, "data  : ", data, "header : ", headers);
        const response = await api.get(url, data, { headers });
        console.log("response get Api sause : ", response);

        if (__DEV__ && API_LOG) {
            console.log(response);
        }
        return new Promise((resolve, reject) => {
            if (response.ok && response.data && !response.data.error) {
                resolve(response.data);
            } else {
                if (response.status === 500) {
                    reject(ERROR_SOMETHING_WENT_WRONG);
                }
                reject(response.data || error);
            }
        });
    }
    async postImage(url, data) {
        const response = await api.post(url, data);

        if (__DEV__ && API_LOG) {
            console.log(response);
        }
        return new Promise((resolve, reject) => {
            if (response.ok && response.data && !response.data.error) {
                resolve(response.data);
            } else {
                if (response.status === 500) {
                    reject(ERROR_SOMETHING_WENT_WRONG);
                }
                reject(response.data || ERROR_SOMETHING_WENT_WRONG);
            }
        });
    }
}

export default new ApiSauce();
