<template>
    <div class="filemgr-wrapper">
        <div class="filemgr-content">
            <div class="filemgr-content-body ps ps--active-y">
                <div class="folder-path mb-10">
                    <span v-for="(path, index) in folderPath" :key="index">
                        <FolderPath :data="path" :index="index" :count="folderPath.length"/>
                    </span>
                </div>
                <FolderContents :data="openedFolder.folder"/>
           
            </div>

        </div>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import FolderContents from "@/components/FolderContents.vue";
import FolderPath from "@/components/FolderPath.vue";
import ModalInput from "@/components/ModalInput.vue";
import ModalLocation from "@/components/ModalLocation.vue";

export default {
    components:{
        FolderContents,
        FolderPath,
    },
    computed:{
        ...mapState(['openedFolder', 'rootFolderId','folderPath']),
        
    },
    
    created(){
        this.fetchData();
    },
    data(){
        return{
            inputNewName : ''
        }
    },
    watch: {
    // 라우터 객체를 감시하고 있다가 fetchData() 함수를 호출한다
        '$route': 'fetchData'
    },
    methods:{
        ...mapActions(['FETCH_FOLDER', 'FETCH_FOLDER_PATH']),
        fetchData(){
            let folderId;
            if(!this.$route.params.fid){
                folderId = this.rootFolderId;
            }else{
                folderId = this.$route.params.fid;
            }
            this.FETCH_FOLDER({folderId});
            this.FETCH_FOLDER_PATH({folderId});
        },
        onRenameFolder(value){
            this.inputNewName = value;
            if(this.currentItem.type === 'folder'){
                this.RENAME_FOLDER({folderId: this.currentItem.folderId, newFolderName : this.inputNewName}).finally(_ => {
                this.SET_IS_OPEN_RENAME_MODAL(false);
                 })
            }else if(this.currentItem.type === 'file'){
                this.RENAME_FILE({fileId: this.currentItem.fileId, newFileName : this.inputNewName}).finally(_ => {
                this.SET_IS_OPEN_RENAME_MODAL(false);
             })
            }
            
        },
        
    }

}
</script>
<style lang="scss">
.folder-path{
    .folder-path-item{
        font-size: 15px;
        color: #202124 ;
    }
    .router-link-active{
        color: #000 !important ;
    }
}
    
</style>
