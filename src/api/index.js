import axios from 'axios';
import router from '../router';


const DOMAIN = 'https://localhost:44393';
const UNTHORIZED = 401;

const onUnauthorized = () => {
    router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
  }

const request = (method, url, data) =>{
    return axios({
        method,
        url : DOMAIN + url,
        data,
        headers:{
            "Content-Type":
				data instanceof FormData ? "multipart/form-data" : "application/json"
        }
    }).then(result => result.data)
    .catch(result => {
        if(status == UNTHORIZED) onUnauthorized();
        throw result.response;
    })
}

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
  }

export const file = {
    fetchRecents(){
        return request('get', '/api/disk/files/recent')
    },
    fetchFileLibrary(mimeType){
        return request('get', `/api/disk/files/mimetype/${mimeType}`)
    },
    create(payload){
        return request('post', '/api/disk/file', payload);
    },
    rename(fileId, newFileName){
        return request('put', `/api/disk/file/rename/${fileId}`, JSON.stringify(newFileName));
    },
    changeTrashedStatus(fileId, trashed){
        return request('put', `/api/disk/file/trash/${fileId}`, trashed);
    },
    changeStarredStatus(fileId, starred){
        return request('put', `/api/disk/file/starred/${fileId}`, starred);
    },
    destroy(fileId){
        return request('delete', `/api/disk/file/${fileId}`);
    },
    copy(fileId, targetFolderId){
        return request('', `/api/disk/file/copy/${fileId}`, JSON.stringify(targetFolderId));
    },
    move(fileId, targetFolderId){
        return request('', `/api/disk/file/move/${fileId}`, JSON.stringify(targetFolderId));
    },
    download(fileId){
        return request('get', `/api/disk/file/download/${fileId}`)
    },
    search(query){
        return request('get', `/api/disk/files/search?q=${query}`)
    }
}


export const folder = {
    fetch(folderId){
        return request('get',`/api/disk/folder/${folderId}`);
    },
    fetchFolderPath(folderId){
        return request('get',`/api/disk/folderPath/${folderId}`);
    },
    fetchFolderTree(folderId){
        return request('get', '/api/disk/folderTreePath');
    },
    fetchTrashed(){
        return request('get', '/api/disk/trash');
    },
    fetchStarred(){
        return request('get', '/api/disk/starred');
    },
    create(parentId, folderName){
        return request('post', '/api/disk/folder', {parentId, folderName});
    },
    rename(folderId, newFolderName){
        return request('put', `/api/disk/folder/rename/${folderId}`, JSON.stringify(newFolderName));
    },
    changeTrashedStatus(folderId, trashed){
        return request('put', `/api/disk/folder/trashed/${folderId}`, trashed);
    },
    changeStarredStatus(folderId, starred){
        return request('put', `/api/disk/folder/starred/${folderId}`, starred);
    },
    destroy(folderId){
        return request('delete', `/api/disk/folder/${folderId}`);
    },
    copy(folderId, targetFolderId){
        return request('put', `/api/disk/folder/copy/${folderId}`, JSON.stringify(targetFolderId));
    },
    move(folderId, targetFolderId){
        return request('put', `/api/disk/folder/move/${folderId}`, JSON.stringify(targetFolderId));
    },
    download(folderId){
        return request('get', `/api/disk/folder/download/${folderId}`)
    }
}


export const auth = {
    login(email, password) {
      return request('post', '/api/account/login', {email, password}) 
    }
  }