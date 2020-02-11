
<template>
    <div>
        <div class="folder" @dblclick="makeFolder">
            <div class="toggle" @click="toggle" >
                <span v-if="isOpen"><i class="fas fa-caret-down"></i></span><span v-else><i class="fas fa-caret-right"></i></span></div>
                <router-link :to="routerLink">
                    <i class="far fa-desktop" v-if="item.path === item.folderName"></i><!--루트 폴더일 경우 -->
                    <i class="fas fa-folder" v-else></i><!--하위 폴더일 경우-->
                    <span class="folder-name">{{ item.folderName }}</span>
                </router-link>
        </div>
        <div v-show="isOpen" v-if="isFolder">
            <FolderTreeItem class="item" v-for="(child, index) in item.children" :key="index" :item="child" :idx="index" @make-folder="$emit('make-folder', $event)"></FolderTreeItem>
        </div>
    </div>
    
</template>

<script>
import {mapState} from 'vuex';
export default {
   props:['item'],
   name :"FolderTreeItem",
    data: function () {
        return {
         isOpen: false
        }
    },
    computed: {
        ...mapState(['rootFolderId']),
        isFolder() {
            return this.item.children && this.item.children.length
            
        },
        routerLink(){
            return this.item.folderId === this.rootFolderId ? '/disk/mydisk' : `/disk/folder/${this.item.folderId}`
        },
        
    },
    methods: {
        toggle: function () {
            this.isOpen = !this.isOpen
        },
        makeFolder: function () {
            if (!this.isFolder) {
                this.$emit('make-folder', this.item)
                this.isOpen = true
            }
        }
    }
}
</script>
