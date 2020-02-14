<template>
    <div>
        <div class="mb-10">검색결과</div>
        <div class="row row-xs file-list">
             <FileItem v-for="file in searchResults" :key="`${file.fileId}`" :data="file"/>
        </div>
    </div>
</template>

<script>

import FileItem from "@/components/FileItem.vue";
import { mapState } from 'vuex';

export default {
    components:{
        FileItem
    },
    computed:{
        ...mapState(['searchResults'])
    }
}
</script>