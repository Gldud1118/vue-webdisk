<template>
    <div class="filemgr-wrapper">
        <div class="filemgr-content">
            <div class="filemgr-content-body ps ps--active-y">
                <div>
                    <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">파일</label>
                    <div class="row row-xs file-list">
                        <FileItem v-for="file in fileLibrary" :key="`${file.fileId}`" :data="file"/>
                    </div>
                </div>
                <Dropdown v-show="isOpenDropdown"/>
            </div>

        </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import FileItem from "@/components/FileItem.vue";
import Dropdown from "@/components/Dropdown.vue";

export default {
    components : {
        FileItem,
        Dropdown
    },
    created(){
        this.fetchData();
    },
    computed : {
        ...mapState(['fileLibrary','isOpenDropdown'])
    },
    watch: {
        '$route': 'fetchData'
    },
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions(['FETCH_FILE_LIBRARY']),
        fetchData(){
            let mimeType = this.$route.name.toLowerCase();
             this.FETCH_FILE_LIBRARY({mimeType});
        },
      
    },

}
</script>