<template>
    <!-- Sidebar -->
    <aside id="main-sidebar" class="dt-sidebar">
        <div class="dt-sidebar__container">
            <div class="mb-6" style="padding-left: 30px;">
                <div class="dropdown-wrapper mr-2">
                    <div class="dropdown">
                        <button class="btn btn-xs btn-outline-light dropdown-toggle-new" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggleDropdownDefault">New</button>
                        <div class="dropdown-menu dropdown-new-menu" v-show="isOpenDropdownDefault">
                             <button class="dropdown-item btn-show-folderCreate-modal" data-toggle="modal" @click.prevent="isAddFolder = true"> 폴더</button>
                             <div class="dropdown-item">
                                 <label for="uploadFile" style="cursor: pointer;">파일 업로드</label>
                                 <input type="file" id="uploadFile" ref="files" @change="onUploadFile" multiple style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0">
                             </div>
                            <a href="" class="dropdown-item"> 폴더 업로드</a>
                        </div>
                        
                     </div>
                </div>
            </div>
            <!-- Sidebar Navigation -->
            <ul class="dt-side-nav">
                <!-- Menu Header -->
                <li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">MY DRIVE</span>
                </li>
                <!-- /menu header -->
                <!-- Menu Item -->
                <li class="dt-side-nav__item">
                    <div class="folder-tree">
                        <FolderTreeItem class="item" :item="folderTree" @make-folder="makeFolder"></FolderTreeItem>
                    </div>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/recents" class="dt-side-nav__link"><i class="far fa-clock"></i><span class="dt-side-nav__text">최근</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/starred" class="dt-side-nav__link"><i class="far fa-star"></i><span class="dt-side-nav__text">중요</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/trash" class="dt-side-nav__link"><i class="far fa-trash-alt"></i><span class="dt-side-nav__text">휴지통</span></router-link>
                </li>
                <li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">FILE LIBRARY</span>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/documents" class="dt-side-nav__link"><i class="far fa-file-alt"></i><span class="dt-side-nav__text">문서</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/images" class="dt-side-nav__link"><i class="far fa-images"></i><span class="dt-side-nav__text">이미지</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/videos" class="dt-side-nav__link"><i class="far fa-video"></i><span class="dt-side-nav__text">비디오</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/audios" class="dt-side-nav__link"><i class="far fa-music"></i><span class="dt-side-nav__text">오디오</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/zip" class="dt-side-nav__link"><i class="far fa-box-alt"></i><span class="dt-side-nav__text">Zip</span></router-link>
                </li>
            </ul>
            <!-- /sidebar navigation -->
        
            </div>
            <ModalInput title="새폴더" ok="만들기" v-if="isAddFolder" @close="isAddFolder=false" @submit="onAddFolder"/>
    </aside>
    <!-- /sidebar -->

</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import ModalInput from "@/components/ModalInput.vue";
import FolderTreeItem from "@/components/FolderTreeItem.vue";

export default {
    components:{
        ModalInput,
        FolderTreeItem
    },
    data(){
        return{
            isAddFolder: false,
            inputFolderName : '',
        }
    },
    created(){
        this.fetchTreeData();
    },
    computed:{
        ...mapState(['openedFolder', 'rootFolderId','folderTree','isOpenDropdownDefault']),
        invalidInput(){
            return !this.inputFolderName.trim()
        }
    },
  
    methods:{
        ...mapActions(['ADD_FOLDER','UPLOAD_FILE','FETCH_FOLDER_TREE']),
        ... mapMutations(['SET_IS_OPEN_DROPDOWN_DEFAULT', 'SET_IS_OPEN_DROPDOWN']),
        onAddFolder(value){
            this.inputFolderName = value;
            if(this.invalidInput) return;
            
            this.ADD_FOLDER({
                parentId : this.openedFolder.folderId,
                folderName : value
            }).catch(err => {
                console.error(err);
            }).finally(()=>{
                this.isAddFolder = false;
            })
        },

        toggleDropdownDefault(){
            this.SET_IS_OPEN_DROPDOWN(false);
            this.isOpenDropdownDefault === false ? this.SET_IS_OPEN_DROPDOWN_DEFAULT(true) : this.SET_IS_OPEN_DROPDOWN_DEFAULT(false);
        },
        onUploadFile(){
            let formData = new FormData();
            let files = this.$refs.files.files;

            for(let i=0; i < files.length;i++)
            {
                formData.append(`files[${i}]`, files[i] );
            }

            formData.append("folderId", this.openedFolder.folderId)

            this.UPLOAD_FILE({
                file : formData
            }).finally(() => {
                //this.$refs.menu2.style.display = 'none';
            })
        },
        fetchTreeData(){
            this.FETCH_FOLDER_TREE()
        },
        makeFolder: function (item) {
            //Vue.set(item, 'children', []);//동적으로 반응형 속성을 추가
        }
       
        
    }
}
</script>
<style lang="scss">
 .toggleFolderTree  {
    position: absolute;
    top: 8px;
    left: 14px;
    z-index: 10;
 }

 .dropdown-menu{
     display: initial;
 }

 .dropdown-toggle-new{
     width: 180px;
     height: 35px;
     border-radius: 50px;
 }
</style>
