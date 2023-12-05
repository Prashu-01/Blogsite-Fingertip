// API service CALL
// need service call: {url,method,params,query}
export const SERVICE_URLS={
    userSignup: { url: '/signup', method: 'POST'},
    userLogin: {url: '/login', method: 'POST'},
    userLogout: {url: '/logout', method: 'DELETE', query:true},
    uploadFile: {url: '/file/upload', method: 'POST'},
    createPost: {url: '/create', method: 'POST'},
    updatePost:{url:'/update', method:'PUT', query:true},
    deletePost:{url:'/delete', method:'DELETE', query:true},
    getAllPosts: {url: '/posts', method: 'GET', params:true},
    getPostById:{url:'/post',method:'GET',query:true},
    Comment:{url:'/comment/new',method:'POST'},
    getComment:{url:'/comments', method:'GET', query:true},
    deleteComment:{url:'/comment/delete', method:'DELETE', query:true},
    delComment:{url:'/comment/del', method:'DELETE', query:true}
}

// API NOTIFICATION MESSAGES
// export const API_NOTIFICATION_MESSAGES = {
//     loading: {
//         title: "Loading...",
//         message: "Data is being loaded. Please wait"
//     },
//     success: {
//         title: "Success",
//         message: "Data successfully loaded"
//     },
//     requestFailure: {
//         title: "RequestError!",
//         message: "An error occur while parsing request data"
//     },
//     responseFailure: {
//         title: "ResponseError!",
//         message: "An error occur while fetching response from server. Please try again"
//     },
//     networkError: {
//         title: "NetworkError!",
//         message: "Unable to connect to the server."
//     }
// }
