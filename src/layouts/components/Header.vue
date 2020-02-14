<template>
    <!-- Header -->
    <header class="dt-header">
        <div class="dt-header__container">
            <!-- Brand -->
            <div class="dt-brand">
                <!-- Brand logo -->
                <span class="dt-brand__logo">
                <a class="dt-brand__logo-link" href="javascript:void(0)" style="color: #0168fa;">
                    <span style="color: #031a61;">chu</span>disk
                </a>
                </span>
                <!-- /brand logo -->
            </div>
            <!-- /brand -->        
            <!-- Header toolbar-->
            <div class="dt-header__toolbar">
                    <!-- Search box -->
                <div class="search-box">
                    <form class=" d-none d-lg-block" @submit.prevent="onRedirectSearchResult">
                        <div class="input-group">
                            <input class="form-control" placeholder="Search for files and folders" v-model="searchQuery" type="search">
                            <span class="search-icon"><i class="far fa-search"></i></span>
                        </div>
                    </form>
                    <div class="search-result">
                        <!-- 매칭되는 검색 결과 값이 나온다. -->
                    </div>
                <!-- /search box -->
                </div>
                
                <!-- Header Menu Wrapper -->
                <div class="dt-nav-wrapper">
                <!-- Header Menu -->
                <ul class="dt-nav">
                    <li class="dt-nav__item dropdown">
                    <!-- Dropdown Link -->
                    <!-- <a href="#" class="dt-nav__link dropdown-toggle no-arrow dt-avatar-wrapper" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="dt-avatar size-30" src="assets/images/user-avatar/domnic-harris.jpg" alt="Domnic Harris">
                        <span class="dt-avatar-info d-none d-sm-block">
                        <span class="dt-avatar-name">Bob Hyden</span>
                        </span> </a> -->
                    <!-- /dropdown link -->
                    </li>
                </ul>
                <!-- /header menu -->
                </div>
                <!-- Header Menu Wrapper -->
            </div>
            <!-- /header toolbar -->
            </div>
    </header>
    <!-- /header -->
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            searchQuery : ""
        }
    },

    methods: {
        ...mapActions(['SEARCH_FILE']),
        onRedirectSearchResult(){
            this.SEARCH_FILE({query : this.searchQuery}).finally(_ =>{
                this.$router.push({ name : 'Search', query: { q: this.searchQuery }})
                this.searchQuery = "";
            })
        }
    },
}
</script>

<style lang="scss">
    .search-result{
        position: absolute;
        width: 100%;
    }
</style>