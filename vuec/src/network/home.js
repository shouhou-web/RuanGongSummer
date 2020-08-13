import { request } from "@/network/request";

export function addDoc(userID, teamID) {
    return request({
        url: "/addDoc",
        params: {
            userID,
            teamID
        },
        method: 'post'
    })
}