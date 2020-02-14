import * as api from "../api";

const actions = {
    LOGIN({commit}, {email, password}){
        return api.auth.login(email, password).then(({accessToken}) =>commit('LOGIN', accessToken) )
    },
    UPLOAD_FILE({dispatch, state}, {file}){
        return api.file.create(file).then(_ => dispatch('FETCH_FOLDER', {folderId: state.openedFolder.folderId}));
    },

    FETCH_RECENT_FILES({commit}){
        return api.file.fetchRecents().then(data =>{
            commit('SET_RECENT_FILES', data);
        }) 
    },
    FETCH_FILE_LIBRARY({commit},{mimeType}){
        
        return api.file.fetchFileLibrary(mimeType).then(data => {
            commit('SET_FILE_LIBRARY', data);
        })
    },
   
    RENAME_FILE({state, dispatch,commit}, {fileId, newFileName}){
        return api.file.rename(fileId, newFileName).then(data => {
            commit("SET_CURRENT_ITEM", data);
        }).then(_ => dispatch('FETCH_FOLDER', {folderId:state.openedFolder.folderId }));
    },
    CHANGE_FILE_TRASHED({state, dispatch,commit}, {fileId, trashed}){
        return api.file.changeTrashedStatus(fileId,trashed).then(data => {
            commit("SET_CURRENT_ITEM", data);
            commit('SET_IS_TRASHED_UPDATE', true);
            commit('SET_IS_STARRED_UPDATE', true);
        }).then((_) => dispatch('FETCH_FOLDER', {folderId:state.openedFolder.folderId }));
    },
    RESTORE_FILE({dispatch,commit}, {fileId, trashed}){
        return api.file.changeTrashedStatus(fileId, trashed).then(data => {
            commit("SET_CURRENT_ITEM", data);
            commit('SET_IS_TRASHED_UPDATE', true);
        }).then((_) => dispatch('FETCH_TRASHED_DISK'));
    },
    CHANGE_FILE_STARRED({ commit}, {fileId, starred}){
        return api.file.changeStarredStatus(fileId, starred).then(data => {
            commit('SET_CURRENT_ITEM', data);
            commit('SET_IS_STARRED_UPDATE', true);
        });
    },
    DELETE_FILE({dispatch,commit}, {fileId}){
        return api.file.destroy(fileId).then(_ => dispatch('FETCH_TRASHED_DISK')).then((_) =>{
            commit('SET_IS_TRASHED_UPDATE', true);
            
        })
    },
    COPY_FILE(_,{fileId, targetFolderId}){
        return api.file.copy(fileId, targetFolderId);
    },
    MOVE_FILE({state, dispatch}, {fileId, targetFolderId}){
        return api.file.move(fileId, targetFolderId).then(_ => dispatch('FETCH_FOLDER', {folderId: state.openedFolder.folderId}))
    },  
    SEARCH_FILE({commit}, {query}){
        console.log(query);
        return api.file.search(query).then(data => {

            commit('SET_SEARCH_RESULTS', data);
        })
    },
    FETCH_FOLDER({dispatch,commit}, {folderId}){
        return api.folder.fetch(folderId).then(data => {
            commit('SET_FOLDER', data);
        }).then(_ => dispatch('FETCH_FOLDER_TREE'));
    },
    FETCH_FOLDER_PATH({commit}, {folderId}){
        return api.folder.fetchFolderPath(folderId).then(data => {
            commit('SET_FOLDER_PATH', data)
        })
    },
    FETCH_FOLDER_TREE({commit}){
        return api.folder.fetchFolderTree().then(data => {
            commit('SET_FOLDER_TREE', data)
        })
    },
    FETCH_TRASHED_DISK({dispatch,commit}){
        return api.folder.fetchTrashed().then(data =>{
            commit('SET_TRASHED_DISK', data);
            commit('SET_IS_TRASHED_UPDATE', false);
        }).then(_ => dispatch('FETCH_FOLDER_TREE'));
    },
    FETCH_STARRED_DISK({commit}){
        return api.folder.fetchStarred().then(data =>{
            commit('SET_STARRED_DISK', data);
            commit('SET_IS_STARRED_UPDATE', false);
        })
    },
    ADD_FOLDER({state, dispatch},{parentId, folderName}){
        return api.folder.create(parentId, folderName).then(_ => dispatch('FETCH_FOLDER', {folderId: state.openedFolder.folderId}))
    },
    
    RENAME_FOLDER({state, dispatch,commit}, {folderId, newFolderName}){
        return api.folder.rename(folderId, newFolderName).then(data =>{
            commit('SET_CURRENT_ITEM', data);
        }).then((_) => dispatch('FETCH_FOLDER', {folderId:state.openedFolder.folderId }))
    },
    CHANGE_FOLDER_STARRED({commit}, {folderId,starred}){
        return api.folder.changeStarredStatus(folderId,starred).then(data => {
            commit('SET_CURRENT_ITEM', data);
            commit('SET_IS_STARRED_UPDATE', true);
        });
    },
    CHANGE_FOLDER_TRASHED({state,dispatch,commit}, {folderId, trashed}){
        return api.folder.changeTrashedStatus(folderId, trashed).then(data => {
            commit("SET_CURRENT_ITEM", data);
            commit('SET_IS_TRASHED_UPDATE', true);
            commit('SET_IS_STARRED_UPDATE', true);
        }).then((_) => dispatch('FETCH_FOLDER', {folderId:state.openedFolder.folderId }))
    },
    RESTORE_FOLDER({dispatch,commit}, {folderId, trashed}){
        return api.folder.changeTrashedStatus(folderId,trashed).then(data => {
            commit("SET_CURRENT_ITEM", data);
            commit('SET_IS_TRASHED_UPDATE', true);
        }).then((_) => dispatch('FETCH_TRASHED_DISK'))
    },
    DELETE_FOLDER({dispatch,commit},{folderId}){
        return api.folder.destroy(folderId).then(_ => dispatch('FETCH_TRASHED_DISK')).then((_) =>{
            commit('SET_IS_TRASHED_UPDATE', true);
            
        })
    },
   
    COPY_FOLDER({dispatch},{folderId, targetFolderId}){
        return api.folder.copy(folderId, targetFolderId).then(_ => dispatch('FETCH_FOLDER_TREE'));
    },
    MOVE_FOLDER({state,dispatch},{folderId, targetFolderId}){
        return api.folder.move(folderId, targetFolderId).then(_ => dispatch('FETCH_FOLDER', {folderId: state.openedFolder.folderId}));
    }
}

export default actions;