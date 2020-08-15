import { request } from "@/network/request";

export function deleteDoc(userID, docID) {
  return request({
    url: "/deleteDoc",
    params: {
      userID,
      docID
    },
    method: "post"
  });
}

export function getDeletedDocs(userID) {
  return request({
    url: "/getDeletedDocs",
    params: {
      userID
    },
    method: "post"
  });
}

export function recoverDoc(userID, docID) {
  return request({
    url: "/recoverDoc",
    params: {
      userID,
      docID
    },
    method: "post"
  });
}
