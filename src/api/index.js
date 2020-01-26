import axios from 'axios';
import router from '../router';


const DOMAIN = 'http://localhost:';
const UNTHORIZED = 401;

const onUnauthorized = () => {
    router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
  }

const request = (method, url, data) =>{
    return axios({
        method,
        url : DOMAIN + url,
        data
    }).then(result => result.data)
    .catch(result => {
        if(status == UNTHORIZED) onUnauthorized();
        throw result.response// 이건 뭘까?
    })
}

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
  }

export const file = {
    fetch(fileId){
        return fileId ? request('get',`/api/disk/file/${fileId}`) : request('get', `api/disk/file`);
    },
    fetchRecents(){
        return request('get', '/api/disk/file/recents')
    },
    fetchTrashed(){
        return request('get', '/api/disk/file/trashed')
    },
    create(payload){
        return request('post', '/api/disk/file', payload);
    },
    rename(fileId, newFileName){
        return request('put', `/api/disk/file/rename/${fileId}`, {newFileName});
    },
    changeToTrashed(fileId){
        return request('put', `/api/disk/file/trashed/${fileId}`);
    },
    changeToStarred(fileId){
        return request('put', `/api/disk/file/starred/${fileId}`);
    },
    destroy(fileId){
        return request('delete', `/api/disk/file/${fileId}`);
    },
    restore(fileId){
        return request('put', `/api/disk/${fileId}`);
    },
    copy(fileId, targetFolderId){
        return request('', `/api/disk/file/copy${fileId}`, {targetFolderId});
    },
    move(fileId, targetFolderId){
        return request('', `/api/disk/file/move/${fileId}`, {targetFolderId});
    },
    download(fileId){
        return request('get', `/api/disk/file/download/${fileId}`)
    }
}


export const folder = {
    fetch(folderId){
        return request('get',`/api/disk/folder/${folderId}`);
    },
    fetchTrashed(){
        return request('get', '/api/disk/folder/trashed');
    },
    create(parentFolderId, folderName){
        return request('post', 'api/disk/folder', {parentFolderId, folderName});
    },
    rename(folderId, newFolderName){
        return request('put', `/api/disk/folder/rename/${folderId}`, {newFolderName});
    },
    changeToTrashed(folderId){
        return request('put', `/api/disk/folder/trashed/${folderId}`);
    },
    changeToStarred(folderId){
        return request('put', `/api/disk/folder/starred/${folderId}`);
    },
    destroy(folderId){
        return request('delete', `/api/disk/folder/${folderId}`);
    },
    restore(folderId){
        return request('put', `/api/disk/${folderId}`);
    },
    copy(folderId, targetFolderId){
        return request('put', `/api/disk/folder/copy${folderId}`, {targetFolderId});
    },
    move(folderId, targetFolderId){
        return request('put', `/api/disk/folder/move/${folderId}`, {targetFolderId});
    },
    download(folderId){
        return request('get', `/api/disk/folder/download/${folderId}`)
    }
}


export const auth = {
    login(email, password) {
      return request('post', '/login', {email, password}) 
    }
  }