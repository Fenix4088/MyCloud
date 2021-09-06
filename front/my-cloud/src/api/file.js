import {$instanceWithToken} from "./instance";

export const fileAPI = {
    async getFiles(dirId) {
        return $instanceWithToken.get(`file/get${dirId ? `?parent=${dirId}` : ''}`)
    }
}