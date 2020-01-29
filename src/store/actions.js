import * as api from "../api";

const actions = {
    LOGIN({commit}, {email, password}){
        return api.auth.login(email, password).then(({accessToken}) =>commit('LOGIN', accessToken) )
    },
    UPLOAD_FILE({dispatch, state}, {file}){
        return api.file.create(file).then(_ => dispatch('FETCH_FOLDER', {folderId: state.openedFolder.folderId}));
    },

    FETCH_FILE({fileId}){
        return api.file.fetch(fileId).then(data => {
            commit('SET_FILE', data.item)
        })
    },
    FECTH_TRASHED_FILES({commit}){
        return api.file.fetchTrashed().then(data => {
            commit('SET_TRASHED_FILES', data.item)
        })
    },  
    FETCH_RECENT_FILES({commit}){
        return api.file.fetchRecents().then(data => {
            commit('SET_RECENT_FILES', data.item)
        })
    },
   
    RENAME_FILE({state, dispatch}, {fileId, newFileName}){
        return api.file.rename(fileId, newFileName).then(_ => dispatch('FETCH_FOLDER', {folderId:state.openedFolder.folderId }));
    },
    CHANGE_FILE_TRASHED({state, dispatch}, {fileId}){
        return api.file.changeToTrashed(fileId).then(_ => dispatch('FETCH_FOLDER', {folderId:state.openedFolder.folderId})) //[추가] 휴지통에 들어갈 때마다 api를 호출하는 것이 아닌 처음에만 api를 호출하고 변경이 없다면 state에 있는 data를 가져옴 만약 변경이 있다면 api를 호출할 수 있도록
    },
    CHANGE_FILE_STARRED({state, dispatch}, {fileId}){
        return api.file.changeToStarred(fileId);//[추가]
    },
    DELETE_FILE({dispatch}, {fileId}){
        return api.file.destroy(fileId).then(_ => dispatch('FECTH_TRASHED_FILES'));
    },
    RESTORE_FILE({dispatch}, {fileId}){
        return api.file.restore(fileId).then(_=>dispatch('FETCH_TRASHED_FILES'))
    },
    COPY_FILE(_,{fileId, targetFolderId}){
        return api.file.copy(fileId, targetFolderId);
    },
    MOVE_FILE({state, dispatch}, {fileId, targetFolderId}){
        return api.file.move(fileId, targetFolderId).then(_ => dispatch('FETCH_FOLDER', {folderId: state.openedFolder.folderId}))
    },  
    FETCH_FOLDER({commit}, {folderId}){
        return api.folder.fetch(folderId).then(data => {
            commit('SET_FOLDER', data);
        })
    },
    FECTH_TRASHED_FOLDERS({commit}){
        return api.folder.fetchTrashed().then(data =>{
            commit('SET_TRASHED_FOLDERS', data.item);
        })
    },
    ADD_FOLDER({state, dispatch},{parentId, folderName}){
        return api.folder.create(parentId, folderName).then((_ => dispatch('FETCH_FOLDER', {folderId: state.openedFolder.folderId})))
    },
    
    RENAME_FOLDER({state, dispatch}, {folderId, newFolderName}){
        return api.folder.rename(folderId, newFolderName).then(_ => dispatch('FETCH_FOLDER', {folderId:state.openedFolder.folderId }));
    },
    CHANGE_FOLDER_STARRED({state, dispatch}, {folderId, starred}){
        return api.folder.changeToStarred(folderId, starred).then(_ => dispatch('FETCH_FOLDER', {folderId:state.openedFolder.folderId }));
    },
    CHANGE_FOLDER_TRASHED({state, dispatch}, {folderId}){
        return api.folder.changeToTrashed(folderId).then(_ => dispatch('FETCH_FOLDER', {folderId:state.openedFolder.folderId}));
    },
    DELETE_FOLDER({dispatch},{folderId}){
        return api.folder.destroy(folderId).then(_ => dispatch('FECTH_TRASHED_FOLDER'));
    },
    RESTORE_FOLDER({dispatch},{folderId}){
        return api.folder.restore(folderId).then(_=>dispatch('FETCH_TRASHED_FOLDER'));
    },
    COPY_FOLDER(_,{folderId, targetFolderId}){
        return api.folder.copy(folderId, targetFolderId);
    },
    MOVE_FOLDER({state,dispatch},{folderId, targetFolderId}){
        return api.folder.move(folderId, targetFolderId).then(_ => dispatch('FETCH_FOLDER', {folderId: state.openedFolder.folderId}))
    }
}

export default actions;