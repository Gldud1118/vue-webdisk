<template>
    <div v-if="data">
        <div class="mt-4 mb-4" style="min-height:195px;">
            <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">폴더</label>
            <div class="row row-xs folder-list">
                <FolderItem  v-for="fol in data.folders" :key="`${fol.folderId}`" :data="fol"/>
            </div>
        </div>
        <div>
            <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">파일</label>
            <div class="row row-xs file-list">
                <FileItem v-for="file in data.files" :key="`${file.fileId}`" :data="file"/>
            </div>
        </div>
        <Dropdown v-show="isOpenDropdown"/>
</div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import FolderItem from "@/components/FolderItem.vue";
import FileItem from "@/components/FileItem.vue";
import Dropdown from "@/components/Dropdown.vue";


export default {
    props : ['data'],
  
    components:{
        FolderItem,
        FileItem,
        Dropdown,
       
    },
    computed:{
        ...mapState(['openedFolder', 'isOpenDropdown','rootFolderId','folderPath', 'currentItem']),
    },
    mounted() {
        this.setupClickOutside();
    },
    watch:{
        data : function(){
                this.SET_IS_OPEN_DROPDOWN(false);
        },
    },

    methods: {
        ...mapMutations(['SET_IS_OPEN_DROPDOWN','SET_IS_OPEN_COPY_MODAL', 'SET_IS_OPEN_MOVE_MODAL', 'SET_IS_OPEN_RENAME_MODAL']),
        setupClickOutside(){
            document.querySelector('body').addEventListener('click', e =>{
                Array.from(document.querySelectorAll(".dropdown-menu"), (el) => {
                    if(e.target.dataset.toggle === "dropdown") return;
                    if(el.contains(e.target)){
                        setTimeout(function(){ el.style.display = 'none';}, 100)
                    }
                    this.SET_IS_OPEN_DROPDOWN(false);
                    el.style.display = 'none';
                })
            })
        }
    },
}
</script>