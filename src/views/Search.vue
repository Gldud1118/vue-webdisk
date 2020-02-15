<template>
    <div>
        <div class="mb-10">검색결과</div>
        <div class="row row-xs file-list">
             <FileItem v-for="file in searchResults" :key="`${file.fileId}`" :data="file"/>
        </div>
        <Dropdown v-show="isOpenDropdown"/>
    </div>
</template>

<script>

import {file}  from "../api";
import FileItem from "@/components/FileItem.vue";
import Dropdown from "@/components/Dropdown.vue";
import { mapState } from 'vuex';

export default {
    components:{
        FileItem,
        Dropdown
    },
    computed:{
        ...mapState(['isOpenDropdown'])
    },
    watch:{
        '$route': 'fetchData' 
    },
    data(){
        return{
            searchResults: []
        }
    },
    created(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            const searchQuery = this.$route.query.q; 
            file.search(searchQuery).then(data => {
               this.searchResults = data; 
            })
        }
    }
}
</script>