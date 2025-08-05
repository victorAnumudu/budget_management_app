import axios from "axios"
import RouteLinks from "../RouteLinks";


axios.interceptors.request.use(
    config => {
        config.headers = {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
            // "Access-Control-Allow-Headers": "Origin, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Allow-Headers, Authorization, observe, enctype, Content-Length, X-Csrf-Token",
            // "Content-Type": "application/json;charset=UTF-8",
            'Authorization': (localStorage && localStorage.getItem('token')) ? `Bearer ${localStorage.getItem('token')}` : ''
          };
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    // config.baseURL = import.meta.env.VITE_APP_BACKOFFICE_BASE_URL
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const postAuxEnd = (path, postData, media=false) => {
    const basePath = media ? import.meta.env.VITE_APP_BACKOFFICE_BASE_URL : import.meta.env.VITE_APP_BACKOFFICE_BASE_URL
    return axios.post(`${basePath}${path}`, postData).then(res => {
        return res
    }).catch(err => {
        let message = err?.response?.data?.message || err 
        throw new Error(message);
    })
}

const getAuxEnd = (path, reqData= null) => {
    const basePath = import.meta.env.VITE_APP_BACKOFFICE_BASE_URL
    return axios.get(`${basePath}${path}`,{ params: reqData }).then(res => {
        return res
    }).catch(err => {
        let message = err?.response?.data?.message || err 
        if(message.toLowerCase() == 'token error'){
            localStorage.clear();
            window.location.href = `${RouteLinks.loginPage}?sessionExpired=true`;
            return
        }
        throw new Error(message);
    })
}

// FUNCTION TO LOGIN USER IN
export const loginUser = (reqData) => {
    let postData = {
        ...reqData
    }
    return postAuxEnd('/users/login', postData, false)
}

// FUNCTION TO LOGGED USER PROFILE
export const userProfile = (reqData) => {
    let postData = {
        ...reqData
    }
    return getAuxEnd('/users/profile', postData, false)
}








// FUNCTION TO GET DASHBOARD DATA
export const getDashData = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/dashboard`, postData)
}

// FUNCTION TO GET LOANS TABLE
export const getLoans = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/loans`, postData)
}

// FUNCTION TO GET TRANSACTIONS TABLE
export const getTransactions = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/transactions`, postData)
}

// FUNCTION TO GET REPAYMENTS TABLE
export const getRepayments = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/repayments`, postData)
}

// FUNCTION TO GET LOAN CHARGES TABLE
export const getLoanCharges = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/loan-charges`, postData)
}

// FUNCTION TO GET OFFERS LIST TABLE
export const getOffers = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/offers`, postData)
}

// FUNCTION TO GET REPAYMENT SCHEDULE TABLE
export const getRepaymentSchedule = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/repayment-schedules`, postData)
}