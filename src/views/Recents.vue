<template>
    <div class="recent-files">
        <div class="file-wrapper">
            <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">오늘</label>
            <div class="row row-xs file-list">
                <FileItem v-for="file in recentFiles.today" :key="`${file.fileId}`" :data="file" />
                <!-- @setDropdownPos="setDropdownPos" -->
            </div>
        </div>
        <!-- 최근 일주일 -->
        <div class="file-wrapper">
            <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">최근 일주일</label>
            <div class="row row-xs file-list">
                <FileItem v-for="file in recentFiles.lastSevenDays" :key="`${file.fileId}`" :data="file"/>
            </div>
        </div>
        <!-- 최근 30일 -->
        <div class="file-wrapper">
            <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">최근 30일</label>
            <div class="row row-xs file-list">
                <FileItem v-for="file in recentFiles.lastThirtyDays" :key="`${file.fileId}`" :data="file"/>
            </div>
        </div>
        <!-- 최근 6개월  -->
        <div class="file-wrapper">
            <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">최근 6개월</label>
            <div class="row row-xs file-list">
                <FileItem v-for="file in recentFiles.lastSixMonth" :key="`${file.fileId}`" :data="file" />
            </div>
        </div>
        <!-- 최근 1년 -->
        <div class="file-wrapper">
            <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">최근 1년</label>
            <div class="row row-xs file-list">
                <FileItem v-for="file in recentFiles.lastOneYear" :key="`${file.fileId}`" :data="file" />
            </div>
        </div>
        <div class="file-wrapper">
            <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">이전</label>
            <div class="row row-xs file-list">
                <FileItem v-for="file in recentFiles.before" :key="`${file.fileId}`" :data="file" />
            </div>
        </div>
        <Dropdown v-show="isOpenDropdown"/>
       
    </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import FileItem from "@/components/FileItem.vue";
import Dropdown from "@/components/Dropdown.vue";

export default {
    components :{
        FileItem,
        Dropdown
    },
    computed:{
        ...mapState(['recentFiles','isOpenDropdown'])
    },

    created(){
        this.fetchData();
    },
    methods:{
        ...mapActions(['FETCH_RECENT_FILES']),
        fetchData(){
            
            this.FETCH_RECENT_FILES().then(() =>{
               
            })
 console.log(this.recentFiles)

           
        }
    }

}
</script>

<style lang="scss">
    .file-wrapper{
        min-height: 240px;
    }
</style>