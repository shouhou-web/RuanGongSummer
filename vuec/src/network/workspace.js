import {request} from "@/network/request";

export function getMyDocs(userID) {
    return request({
        url: "/getMyDocs",
        params: {
            userID
        },
        method: 'post'
    })
}

export function getFavoriteDocs(userID) {
    return request({
        url: "/getFavoriteDocs",
        params: {
            userID
        },
        method: 'post'
    })
}