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
    SET_TRASHED_FILES(state, trashedFiles){
        state.trashedFiles = trashedFiles;
    },
    SET_TRASHED_FOLDERS(state, trashedFolders){
        state.trashedFolders = trashedFolders;
    },
    SET_RECENT_FILES(state, recentFiles){
        state.recentFiles = recentFiles;
    },
    SET_FOLDER(state, folder){
        state.openedFolder = folder;
    },
    SET_FILE(state, file){
        state.openedFile = file;
    },
    SET_IS_ADD_FOLDER(state, toggle){
        state.SET_IS_ADD_FOLDER = toggle;
    }

}

export default mutations;