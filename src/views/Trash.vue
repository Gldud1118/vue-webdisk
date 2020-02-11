<template>
<div class="filemgr-wrapper">
        <div class="filemgr-content">
            <div class="filemgr-content-body ps ps--active-y">
                <FolderContents :data="trashedDisk"/>
            </div>

        </div>
    </div>
</template>

<script>

import {mapActions, mapMutations, mapState} from 'vuex';
import FolderContents from "@/components/FolderContents.vue";

export default {
    components:{
       FolderContents
    },
    computed:{
        ...mapState(['trashedDisk', 'isTrashedUpdate'])
    },
    created(){
        this.fetchData();
    },
    methods: {
        ...mapActions(['FETCH_TRASHED_DISK']),
        fetchData(){
            if(this.isTrashedUpdate){
                this.FETCH_TRASHED_DISK();
            }
        }
    },
}
</script>