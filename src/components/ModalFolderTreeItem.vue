
<template>
    <div>
        <div class="folder" @dblclick="makeFolder">
            <div class="whole-row" @click.prevent="addActive(item.folderId)"></div>
            <div class="toggle" @click="toggle"><span v-if="isOpen"><i class="fas fa-caret-down"></i></span><span v-else><i class="fas fa-caret-right"></i></span></div>
                <a href="" class="folder-item" ref="folderItem">
                    <i class="far fa-desktop" v-if="item.path === item.folderName"></i><!--루트 폴더일 경우 -->
                    <i class="fas fa-folder" v-else></i><!--하위 폴더일 경우-->
                    <span class="folder-name" >{{ item.folderName }}</span>
                    <!-- <span v-if="currentId === item.folderId">현재 위치</span> -->
                </a>
        </div>
        <div v-show="isOpen" v-if="isFolder">
            <ModalFolderTreeItem class="item" v-for="(child, index) in item.children" :key="index" :item="child" :idx="index" @make-folder="$emit('make-folder', $event)"></ModalFolderTreeItem>
        </div>
    </div>
    
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
   props:['item'],
   name :"ModalFolderTreeItem",
    data: function () {
        return {
            isOpen: true,
        }
    },
    computed: {
        ...mapState(['rootFolderId', 'currentItem']),
        isFolder() {
            return this.item.children && this.item.children.length
            
        },
        currentId(){
            return this.currentItem.type === "file" ? this.currentItem.folderId : this.currentItem.parentId
        }
        
    },
    methods: {
        ...mapMutations(['SET_TARGET_FOLDER_ID']),
        toggle(){
            this.isOpen = !this.isOpen;
        },
      
        makeFolder: function () {
            if (!this.isFolder) {
                this.$emit('make-folder', this.item)
                this.isOpen = true
            }
        },
        addActive(id){
            Array.from(document.querySelectorAll('.folder-item')).forEach(el => {
                el.style.fontWeight = "normal";
            });

            if(this.currentId !== id){
                this.$refs.folderItem.style.fontWeight = "bold";
                this.SET_TARGET_FOLDER_ID(id);
            }   
            
        }
    }
}
</script>

<style lang="scss">
    .whole-row{
        &:hover{
            position: absolute;
        left: 0;
        right: 0;
        height: 32px;
        /* padding-top: 10px; */
        /* top: -10px; */
        margin-top: -7px;
        /* background: #999; */
        /* opacity: 0.9; */
        /* background-color: #f00; */
        z-index: 0;
        background-color: rgba(0,0,0,0.05);
        }
        
    }

    .modal-folder-tree{
        padding-top: 10px;
        position:relative;
    }

    .toggle{
        position: relative;
        z-index: 2;
    }
</style>