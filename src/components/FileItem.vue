<template>
    <div class="col-sm-6 col-md-4 col-lg-2" :data-file-id="data.fileId">
        <div class="card card-file">
            <a href="" class="dropdown-link" data-toggle="dropdown" @click.prevent="fetchCurrentFile"></a>
            <div class="card-file-thumb">
                <i :class="`far ${iconName}`"></i>
            </div>
            <div class="card-body">
                <h6><div class="link-02">{{data.fileName}}</div></h6>
                <p>{{data.fileExtension}}</p>
                <span>{{data.fileSize}}</span>
            </div>
        </div>
    </div>	
</template>
<script>
import {mapState, mapMutations} from 'vuex';

export default {

    props: ['data'],
    computed :{
        iconName(){
            let iconClass;
            switch (this.data.fileExtension) {
                case "pdf":
                    iconClass = "fa-file-pdf"
                    break;
                case "docx":
                    iconClass = "fa-file-word"
                    break;
                case "ppt":
                    iconClass = "fa-file-powerpoint"
                    break;
                case "xls":
                    iconClass = "fa-file-excel"
                    break;
                case "txt":
                    iconClass = "fa-file-alt"
                    break;
                case "psd":
                    iconClass = "fa-file-image"
                    break;
                case "html":
                    iconClass = "fa-file-code"
                    break;
                case "json":
                    iconClass = "fa-file-pdf"
                    break;
                case "css":
                    iconClass = "fa-file-pdf"
                    break;
            
            
                default:

                    break;
            }

            return iconClass;
            
        },
        ...mapState(['currentItem', 'isOpenDropdown'])
    },
    methods : {
        ...mapMutations([
            'SET_IS_OPEN_DROPDOWN',
            'SET_CURRENT_ITEM',
            'SET_DROPDOWN_POS'
        ]),
        fetchCurrentFile(){
            if(this.currentItem.fileId !== this.data.fileId || !this.currentItem.fileId || this.currentItem.type !== this.data.type){
                this.SET_IS_OPEN_DROPDOWN(true);
                this.SET_CURRENT_ITEM(this.data);
            }else{
                this.isOpenDropdown === false ? this.SET_IS_OPEN_DROPDOWN(true) : this.SET_IS_OPEN_DROPDOWN(false);
            }

            //전역에서 상태관리하기  
            this.SET_DROPDOWN_POS({itemPosTop : this.$el.offsetTop, itemPosLeft : this.$el.offsetLeft, itemPosWidth : this.$el.offsetWidth})
        }
    }
}
</script>