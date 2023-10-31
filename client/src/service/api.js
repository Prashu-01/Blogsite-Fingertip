import axios from 'axios';
import { SERVICE_URLS } from '../constants/config.js';

import { getAccessToken, getType } from '../utils/common-utils.js';

const API_URL = 'http://localhost:8000'

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept": "application/json, form-data",
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        }
        else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        // Stop global loader here
        return processResponse(response);
    },
    function (error) {
        // Stop global loader here
        // console.log('ye raha ERROR',error)
        // return Promise.reject(error.response.data.msg);
        return Promise.reject(ProcessError(error))
    }
)


const processResponse = (response) => {
    // console.log("ye raha response :----",response)
    if (response?.status === 200) {
        // console.log('ye raha reponse:---',{isSuccess: true, data: response.data})
        return { isSuccess: true, data: response.data }
    } else {
        // console.log('ye raha error')
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

// to intercept the response getting from backend
const ProcessError=(error)=>{
    if(error.response){
        return (error.response.data.msg); 
    }
    return (error.toJSON().message)
}
// const ProcessError = (error) => {
//     if (error.response) {
//         // request true but response other than 2.x.x
//         console.log("Error in RESPONSE", error.toJSON())
//         return {
//             isError: true,
//             msg: API_NOTIFICATION_MESSAGES.responseFailure,
//             code: error.response.status
//         }
//     }
//     else if (error.request) {
//         // response error
//         console.log("Error in REQUEST", error.toJSON())
//         return {
//             isError: true,
//             msg: API_NOTIFICATION_MESSAGES.requestFailure,
//             // msg: error.response,
//             code: ""
//         }
//     }
//     else {
//         // fornt end error
//         console.log("Error in NETWORK", error.toJSON())
//         return {
//             isError: true,
//             msg: API_NOTIFICATION_MESSAGES.networkError,
//             code: ""
//         }
//     }
// }

// APIhere
const API = {}

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body)
            // onUploadProgress: function (progressEvent) {
            //     if (showUploadProgress) {
            //         let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //         showUploadProgress(percentCompleted);
            //     }
            // },
            // onDownloadProgress: function (progressEvent) {
            //     if (showDownloadProgress) {
            //         let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //         showDownloadProgress(percentCompleted);
            //     }
            // }
        });
}

export { API }