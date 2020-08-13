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