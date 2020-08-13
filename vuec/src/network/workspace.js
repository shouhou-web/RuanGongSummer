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

export function getRecentDocs(userID) {
    return request({
        url: "/getRecentDocs",
        params: {
            userID
        },
        method: 'post'
    })
}