<template>
    <div class="filemgr-wrapper">
        <div class="filemgr-content">
            <div class="filemgr-content-body ps ps--active-y">
                <FolderContents :data="starredDisk"/>
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
        ...mapState(['starredDisk', 'isStarredUpdate'])
    },
    created(){
        this.fetchData();
    },
    methods: {
        ...mapActions(['FETCH_STARRED_DISK']),
        fetchData(){
            if(this.isStarredUpdate){
                this.FETCH_STARRED_DISK();
            }
        }
    },
}
</script>