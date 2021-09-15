import {$instanceWithToken} from "./instance";

export const fileAPI = {
    async getFiles(dirId) {
        return $instanceWithToken.get(`file/get${dirId ? `?parent=${dirId}` : ''}`)
    } ,
    async createFolder(name, type, parent) {
        return $instanceWithToken.post(`file/create`, {
            name,
            type,
            parent
        })
    }
}