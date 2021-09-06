import {$instanceWithToken} from "./instance";

export const fileAPI = {
    getFiles(dirId) {
        return $instanceWithToken.get(`file/get${dirId}`)
    }
}