<template>
    <div>
         <div class="dt-root__intra">
          <Header />
        </div>
        <main class="dt-main">
          <Sidebar />
          <div class="dt-content-wrapper">
            <div class="dt-content">
              <router-view></router-view>
            </div>
          </div>
        </main>
        <!-- modal - 새폴더 -->
        <!-- <ModalInput title="새폴더" ok="만들기" v-if="isAddFolder" @close="isAddFolder=false" @submit="onAddFolder"/> -->
        <!-- modal - 이름바꾸기 -->
        <ModalInput title="이름 바꾸기" ok="확인" :inputOriginal="inputOriginal" v-if="isOpenRenameModal" @submit="onRename" @close="SET_IS_OPEN_RENAME_MODAL(false)"/>
        <!-- modal - 이동하기 -->
        <ModalLocation v-if="isOpenMoveModal" @submit="onMove" @close="SET_IS_OPEN_MOVE_MODAL(false)" />
        <!-- modal - 복사하기 -->
        <ModalLocation v-if="isOpenCopyModal" @submit="onCopy" @close="SET_IS_OPEN_COPY_MODAL(false)" />
    </div>
   
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import Header from '@/layouts/components/Header.vue';
import Sidebar from '@/layouts/components/Sidebar.vue';
import ModalInput from "@/components/ModalInput.vue";
import ModalLocation from "@/components/ModalLocation.vue";

export default {
    components: {
      Header, 
      Sidebar,
      ModalInput,
      ModalLocation
    },
    computed :{
      ...mapState(['currentItem','isOpenCopyModal','isOpenMoveModal','isOpenRenameModal','targetFolderId']),
      inputOriginal(){
            if(this.currentItem.type === 'folder'){ return this.currentItem.folderName; }
            else if(this.currentItem.type === 'file'){ return this.currentItem.fileName; }
        }
    },
    methods : {
      ...mapMutations(['SET_IS_OPEN_COPY_MODAL', 'SET_IS_OPEN_MOVE_MODAL', 'SET_IS_OPEN_RENAME_MODAL']),
      ...mapActions(['RENAME_FOLDER','RENAME_FILE','COPY_FOLDER','COPY_FILE','MOVE_FOLDER','MOVE_FILE']),
        onRename(value){
            this.inputNewName = value;
            if(this.currentItem.type === 'folder'){
                this.RENAME_FOLDER({folderId: this.currentItem.folderId, newFolderName : this.inputNewName}).finally(_ => {
                this.SET_IS_OPEN_RENAME_MODAL(false); 
            
                //여기서 dispatch할 때 fetchfolder할지 fetchstaareddisk할지상황 난누기
                })
            }else if(this.currentItem.type === 'file'){
                this.RENAME_FILE({fileId: this.currentItem.fileId, newFileName : this.inputNewName}).finally(_ => {
                this.SET_IS_OPEN_RENAME_MODAL(false);
             })
            }
              
          },
        onCopy(){
          if(this.currentItem.type === 'folder'){
            this.COPY_FOLDER({folderId : this.currentItem.folderId, targetFolderId : this.targetFolderId}).finally(_ => {
              this.SET_IS_OPEN_COPY_MODAL(false);
            })
            
          }else if(this.currentItem.type === 'file'){
            this.COPY_FILE({fileId : this.currentItem.fileId, targetFolderId : this.targetFolderId}).finally(_ => {
              this.SET_IS_OPEN_COPY_MODAL(false);
            })  
          }
        },
        onMove(){
          if(this.currentItem.type === 'folder'){
            this.MOVE_FOLDER({folderId : this.currentItem.folderId, targetFolderId : this.targetFolderId});
            this.SET_IS_OPEN_MOVE_MODAL(false);
          }else if(this.currentItem.type === 'file'){
            this.MOVE_FILE({fileId : this.currentItem.fileId, targetFolderId : this.targetFolderId});
            this.SET_IS_OPEN_MOVE_MODAL(false);
          }
        }
    }
    
    
}
</script>