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

const postAuxEnd = (path, postData, fData=false, media=false) => {
    const newPostData = fData ? new FormData() : postData;
    if(fData){
        for (let data in postData) {
          newPostData.append(data, postData[data]);
        }
    }
    const basePath = media ? import.meta.env.VITE_APP_BACKOFFICE_BASE_URL : import.meta.env.VITE_APP_BACKOFFICE_BASE_URL
    return axios.post(`${basePath}${path}`, newPostData).then(res => {
        return res
    }).catch(err => {
        let status = err?.response?.data?.status
        if(status == -1000){
            localStorage.clear();
            window.location.href = `${RouteLinks.loginPage}?sessionExpired=true`;
            return
        }
        return err?.response
        // throw new Error(message);
    })
}

const getAuxEnd = (path, reqData= null) => {
    const basePath = import.meta.env.VITE_APP_BACKOFFICE_BASE_URL
    return axios.get(`${basePath}${path}`,{ params: reqData }).then(res => {
        return res
    }).catch(err => {
        let status = err?.response?.data?.status
        if(status == -1000){
            localStorage.clear();
            window.location.href = `${RouteLinks.loginPage}?sessionExpired=true`;
            return
        }
        return err?.response
    })
}

// FUNCTION TO VERIFY USER
export const userVerify = (reqData) => {
    let postData = {
        ...reqData
    }
    return postAuxEnd('/users/verify', postData, false)
}

// FUNCTION TO LOGIN USER IN
export const loginUser = (reqData) => {
    let postData = {
        ...reqData
    }
    return postAuxEnd('/users/login', postData, false)
}

// FUNCTION TO GET LOGGED IN USER PROFILE
export const userProfile = (reqData) => {
    let postData = {
        ...reqData
    }
    return getAuxEnd('/users/profile', postData, false)
}

// FUNCTION TO GET ALL USERS
export const getAllUsersData = (reqData) => {
    let postData = {
        ...reqData
    }
    return getAuxEnd('/users/all', postData, false)
}

// FUNCTION TO ADD USER
export const addUser = (reqData) => {
    let postData = {
        ...reqData
    }
    return postAuxEnd('/users/add', postData, false)
}

// FUNCTION TO ADD USER BY AN ADMIN
export const addUserByAdmin = (reqData) => {
    let postData = {
        ...reqData
    }
    return postAuxEnd('/users/add/admin', postData, false)
}

// FUNCTION TO DELETE USER BY AN ADMIN
export const deleteUserByAdmin = (reqData) => {
    let postData = {
        ...reqData
    }
    return postAuxEnd('/users/delete', postData, false)
}


// FUNCTION TO ADD NEW PV
export const addNewPV = (reqData) => {
    let postData = {
        ...reqData
    }
    return postAuxEnd('/expenses/add', postData, false)
}

// FUNCTION TO GET ALL USERS
export const getAllPVData = (reqData) => {
    let postData = {
        ...reqData
    }
    return getAuxEnd('/expenses/all', postData, false)
}

// FUNCTION TO DELETE PV
export const deletePV = (reqData) => {
    let postData = {
        ...reqData
    }
    return postAuxEnd('/expenses/delete', postData, false)
}


// FUNCTION TO GET ALL ECONOMIC ITEMS
export const getAllEconomicItems = (reqData) => {
    let postData = {
        ...reqData
    }
    return getAuxEnd('/economic-items/all', postData, false)
}

// FUNCTION AN ECONOMIC ITEM
export const getAnEconomicItem = (reqData) => {
    let postData = {
        ...reqData
    }
    return postAuxEnd('/economic-items/item', postData, false)
}

// FUNCTION TO GET DASHBOARD DATA
export const getDashData = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/dashboard/data`, postData)
}

// FUNCTION TO GET DASHBOARD SUMMARY DATA
export const getDashSummaryData = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/dashboard/summary`, postData)
}

// FUNCTION TO GET DASHBOARD RIGHT PANEL SUMMARY DATA
export const getDashRightPanelSummaryData = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/dashboard/right-panel`, postData)
}

// FUNCTION TO ADD MDA
export const addMDA = (reqData) => {
    const postData = { ...reqData }
    return postAuxEnd(`/mdas/add`, postData)
}

// FUNCTION TO UPLOAD MDA
export const uploadMDA = (reqData) => {
    const postData = { ...reqData }
    return postAuxEnd(`/mdas/upload-mdas`, postData, true)
}

// FUNCTION TO GET ALL MDAS DATA
export const getAllMDAData = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/mdas/all`, postData)
}

// FUNCTION TO ADD ECONOMIC ITEM
export const addEconomicLine = (reqData) => {
    const postData = { ...reqData }
    return postAuxEnd(`/economic-items/add`, postData)
}

// FUNCTION TO GET ALL WARRANTS
export const getAllWarrants = (reqData) => {
    const postData = { ...reqData }
    return getAuxEnd(`/warrants/all`, postData)
}

// FUNCTION TO REMOVE ITEM(S) FROM WARRANT
export const removeWarrantItem = (reqData) => {
    const postData = { ...reqData }
    return postAuxEnd(`/warrants/remove`, postData)
}

// FUNCTION TO DELETE WARRANT
export const deleteWarrant = (reqData) => {
    const postData = { ...reqData }
    return postAuxEnd(`/warrants/delete`, postData)
}

// FUNCTION TO CREATE WARRANT
export const createWarrant = (reqData) => {
    const postData = { ...reqData }
    return postAuxEnd(`/warrants/add`, postData)
}