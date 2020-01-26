<template>
    <!-- Header -->
    <header class="dt-header">
        <div class="dt-header__container">
            <!-- Brand -->
            <div class="dt-brand">
                <!-- Brand tool -->
                <div class="dt-brand__tool" data-toggle="main-sidebar">
                <div class="hamburger-inner"></div>
                </div>
                <!-- /brand tool -->
                <!-- Brand logo -->
                <span class="dt-brand__logo">
                <a class="dt-brand__logo-link" href="javascript:void(0)">
                    <span style="color: #031a61;">chu</span>disk
                </a>
                </span>
                <!-- /brand logo -->
            </div>
            <!-- /brand -->        
            <!-- Header toolbar-->
            <div class="dt-header__toolbar">
                <!-- Search box -->
                <form class="search-box d-none d-lg-block">
                <div class="input-group">
                    <input class="form-control" placeholder="Search in app..." value="" type="search">
                    <span class="search-icon"><i class="far fa-search"></i></span>
                </div>
                </form>
                <!-- /search box -->
                <!-- Header Menu Wrapper -->
                <div class="dt-nav-wrapper">
                <!-- Header Menu -->
                <ul class="dt-nav">
                    <li class="dt-nav__item dropdown">
                    <!-- Dropdown Link -->
                    <a href="#" class="dt-nav__link dropdown-toggle no-arrow dt-avatar-wrapper" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="dt-avatar size-30" src="assets/images/user-avatar/domnic-harris.jpg" alt="Domnic Harris">
                        <span class="dt-avatar-info d-none d-sm-block">
                        <span class="dt-avatar-name">Bob Hyden</span>
                        </span> </a>
                    <!-- /dropdown link -->
                    <!-- Dropdown Option -->
                    <div class="dropdown-menu dropdown-menu-right">
                        <div class="dt-avatar-wrapper flex-nowrap p-6 mt-n2 bg-gradient-purple text-white rounded-top">
                        <img class="dt-avatar" src="assets/images/user-avatar/domnic-harris.jpg" alt="Domnic Harris">
                        <span class="dt-avatar-info">
                            <span class="dt-avatar-name">Bob Hyden</span>
                            <span class="f-12">Administrator</span>
                        </span>
                        </div>
                        <a class="dropdown-item" href="javascript:void(0)"> <i class="icon icon-user icon-fw mr-2 mr-sm-1"></i>Account
                        </a> <a class="dropdown-item" href="javascript:void(0)">
                        <i class="icon icon-settings icon-fw mr-2 mr-sm-1"></i>Setting </a>
                        <a class="dropdown-item" href="page-login.php"> <i class="icon icon-editors icon-fw mr-2 mr-sm-1"></i>Logout
                        </a>
                    </div>
                    <!-- /dropdown option -->
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