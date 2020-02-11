<template>
    <div class="col-sm-6 col-md-4 col-lg-2" :data-file-id="data.fileId">
        <div class="card card-file">
            <a href="" class="dropdown-link" data-toggle="dropdown" @click.prevent="fetchCurrentFile"></a>
            <div :class="`card-file-thumb ${className.colorClass}`">
                <i :class="`far ${className.iconClass}`"></i>
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
        className(){
            let iconClass, colorClass;
            switch (this.data.fileExtension) {
                case "pdf":
                    iconClass = "fa-file-pdf";
                    colorClass = "tx-danger";
                    break;
                case "docx":
                    iconClass = "fa-file-word";
                    colorClass = "tx-primary";
                    break;
                case "ppt":
                    iconClass = "fa-file-powerpoint";
                    colorClass = "tx-orange";
                    break;
                case "xlsx":
                    iconClass = "fa-file-excel";
                    colorClass = "tx-success";
                    break;
                case "txt":
                    iconClass = "fa-file-alt";
                    colorClass = "tx-gray-600";
                    break;
                case "psd":
                    iconClass = "fa-file-image";
                    colorClass = "tx-indigo";
                    break;
                case "html":
                    iconClass = "fa-file-code";
                    colorClass = "tx-orange";
                    break;
                case "json":
                    iconClass = "fa-file-code";
                    colorClass = "tx-purple";
                    break;
                case "css":
                    iconClass = "fa-file-code"
                    colorClass = "tx-primary";
                    break;
                default:
                    iconClass = "fa-file-code"
                    colorClass = "tx-gray-600";
                    break;
            }

            return {iconClass, colorClass};
            
        },
        ...mapState(['currentItem', 'isOpenDropdown'])
    },
    methods : {
        ...mapMutations([
            'SET_IS_OPEN_DROPDOWN',
            'SET_IS_OPEN_DROPDOWN_DEFAULT',
            'SET_CURRENT_ITEM',
            'SET_DROPDOWN_POS'
        ]),
        fetchCurrentFile(){
            this.SET_IS_OPEN_DROPDOWN_DEFAULT(false);
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