<template>
    <!-- Sidebar -->
    <aside id="main-sidebar" class="dt-sidebar">
        <div class="dt-sidebar__container">
            <div class="d-flex mb-6" style="padding-left: 30px;">
                <div class="dropdown-wrapper mr-2">
                    <div class="dropdown">
                        <button class="btn btn-xs btn-block btn-outline-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click.prevent="dropdownToggle">New</button>
                        <div class="dropdown-menu dropdown-file">
                             <button class="dropdown-item btn-show-folderCreate-modal" data-toggle="modal" @click.prevent="isAddFolder = true">폴더</button>
                        </div>
                        
                     </div>
                </div>
                <div class="dropdown-wrapper">
                    <div class="dropdown">
                        <button class="btn btn-xs btn-block btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click.prevent="dropdownToggle">Upload</button>
                        <div class="dropdown-menu dropdown-file">
                            <label for="uploadFile" class="dropdown-item" style="cursor: pointer;">파일</label>
                            <input type="file" id="uploadFile" class="btn-upload" multiple style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0">
                            <a href="" class="dropdown-item">폴더</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sidebar Navigation -->
            <ul class="dt-side-nav">
                <!-- Menu Header -->
                <li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">MY DRIVE</span>
                </li>
                <!-- /menu header -->
        
                <!-- Menu Item -->
                <li class="dt-side-nav__item open selected" style="position: relative;">
                <div class="folder-tree">
                    <router-link to="/disk/mydisk" class="dt-side-nav__link"><i class="far fa-desktop"></i><span class="dt-side-nav__text">내 디바이스</span></router-link>
                </div>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/recents" class="dt-side-nav__link"><i class="far fa-clock"></i><span class="dt-side-nav__text">최신</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/starred" class="dt-side-nav__link"><i class="far fa-star"></i><span class="dt-side-nav__text">중요</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/trash" class="dt-side-nav__link"><i class="far fa-trash-alt"></i><span class="dt-side-nav__text">휴지통</span></router-link>
                </li>
                <li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">FILE LIBRARY</span>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/documents" class="dt-side-nav__link"><i class="far fa-file-alt"></i><span class="dt-side-nav__text">문서</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/images" class="dt-side-nav__link"><i class="far fa-images"></i><span class="dt-side-nav__text">이미지</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/videos" class="dt-side-nav__link"><i class="far fa-video"></i><span class="dt-side-nav__text">비디오</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/audios" class="dt-side-nav__link"><i class="far fa-music"></i><span class="dt-side-nav__text">오디오</span></router-link>
                </li>
                <li class="dt-side-nav__item">
                    <router-link to="/disk/zip" class="dt-side-nav__link"><i class="far fa-box-alt"></i><span class="dt-side-nav__text">Zip</span></router-link>
                </li>
            </ul>
            <!-- /sidebar navigation -->
        
            </div>
            <AddFolder v-if="isAddFolder" @close="isAddFolder=false"/>
    </aside>
    <!-- /sidebar -->

</template>

<script>
import AddFolder from "@/components/AddFolder.vue";

export default {
    components:{
        AddFolder
    },
    data(){
        return{
            isAddFolder: false

        }
    },
    mounted(){
        this.init();
        this.setupClickOutside();
    },
    methods:{
        init(){
            Array.from(document.querySelectorAll(".dropdown-menu"), (el) => {
                el.style.display = 'none';
            })
        },
        setupClickOutside(){
            document.querySelector('body').addEventListener('click', e =>{
                Array.from(document.querySelectorAll(".dropdown-menu"), (el) => {
                    if(e.target.nextSibling == el) return;
                    el.style.display = 'none';
                })
            })
        },
        dropdownToggle(e){
            if(e.target.nextSibling.style.display == 'none'){
                e.target.nextSibling.style.display = 'block'
            }else{
                e.target.nextSibling.style.display = 'none';
            }
        },
        
    }
}
</script>
<style lang="scss">
    .dropdown-menu{
        display: initial
    }
</style>
