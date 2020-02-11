import { setAuthInHeader } from "../api";


const mutations = {
    LOGIN(state, token){
        if(!token) return
        state.token = token;
        localStorage.setItem('token', token)
        setAuthInHeader(token)
    },
    LOGOUT(state){
        state.token = null;
        delete localStorage.token;
        setAuthInHeader(null)
    },
    SET_IS_TRASHED_UPDATE(state,toggle){
        state.isTrashedUpdate = toggle;
    },
    SET_TRASHED_DISK(state, trashedDisk){
        state.trashedDisk = trashedDisk;
    },
    SET_IS_STARRED_UPDATE(state,toggle){
        state.isStarredUpdate = toggle;
    },
    SET_STARRED_DISK(state, starredDisk){
        state.starredDisk = starredDisk;
    },
    SET_RECENT_FILES(state, recentFiles){
        state.recentFiles=recentFiles
        
    },
    SET_FILE_LIBRARY(state, fileLibrary){
        state.fileLibrary = fileLibrary;
    },
    SET_TARGET_FOLDER_ID(state, targetFolderId){
        state.targetFolderId = targetFolderId;
    },
    SET_FOLDER(state, openedFolder){
        state.openedFolder = openedFolder;
    },
    SET_CURRENT_ITEM(state, currentItem){
        state.currentItem = currentItem;
    },
    SET_FOLDER_PATH(state, folderPath){
        state.folderPath = folderPath;
    },
    SET_FOLDER_TREE(state, folderTree){
        state.folderTree = folderTree;
    },
    SET_IS_OPEN_DROPDOWN(state, toggle){
        state.isOpenDropdown = toggle;
    },
    SET_IS_OPEN_COPY_MODAL(state, toggle){
        state.isOpenCopyModal = toggle;
    },
    SET_IS_OPEN_MOVE_MODAL(state, toggle){
        state.isOpenMoveModal = toggle;
    },
    SET_IS_OPEN_RENAME_MODAL(state, toggle){
        state.isOpenRenameModal =toggle;
    },
    SET_DROPDOWN_POS(state, dropdownPos){
       state.dropdownPos =dropdownPos;
    }

}

export default mutations;