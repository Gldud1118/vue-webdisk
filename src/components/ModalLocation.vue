<template>
<Modal>
    <div slot="header" class="modal-header-slot">
        <h3 class="modal-title">위치선택</h3>
        <button type="button" class="close" aria-label="Close" data-dismiss="modal" @click="$emit('close')">
            <span aria-hidden="true">×</span>
        </button>
    </div>
    <div slot="body">
        <div class="modal-folder-tree">
            <ModalFolderTreeItem class="item" :item="folderTree" @make-folder="makeFolder"></ModalFolderTreeItem>
        </div>
    </div>
    <div slot="footer">
       <button type="button" class="btn btn-secondary btn-sm mr-1" data-dismiss="modal" @click="$emit('close')">취소
        </button>
        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="$emit('submit')">확인
        </button>
    </div>
  </Modal> 
    
</template>

<script>
import {mapActions, mapState} from 'vuex';
import Modal from "@/components/Modal.vue";
import ModalFolderTreeItem from "@/components/ModalFolderTreeItem.vue";

export default {
    props:['title', 'ok'],
    components:{
        Modal,
        ModalFolderTreeItem
    },
    computed:{
        ...mapState(['folderTree', 'targetFolderId']),
    },
    methods:{
         ...mapActions(['FETCH_FOLDER_TREE']),
         fetchTreeData(){

            this.FETCH_FOLDER_TREE()
        },
        makeFolder(item) {
            //Vue.set(item, 'children', []);//동적으로 반응형 속성을 추가
        }
    }
}
</script>

<style lang="scss">
    .modal-folder-tree{
        height: 200px;
        overflow-y: auto;
        .item{
            padding-left: 20px;
        }
    }
</style>