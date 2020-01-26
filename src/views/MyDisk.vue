<template>
    <div class="filemgr-wrapper">
        <div class="filemgr-content">
            <div class="filemgr-content-body ps ps--active-y">
                <div class="dt-page__header">
                    <h1 class="dt-page__title"><div class="folder-path"></div></h1>
                </div>
                <div class="mt-4 mb-4" style="min-height:235px;">
                    <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">폴더</label>
                    <div class="row row-xs folder-list">
                        
                    </div><!-- row -->
                </div>
                <div>
                    <label class="d-block tx-medium tx-10 tx-uppercase tx-sans tx-spacing-1 tx-color-03 mb-4">파일</label>
                    <div class="row row-xs file-list">
                        
                        
                    </div><!-- row -->
                </div>
            </div><!-- filemgr-content -->

        </div>
    </div>
</template>

<script>

export default {
    components:{
        //AddFolder
    },
    computed(){
        //isAddFolder: 'isAddFolder'
    }
}
</script>