<template>
    <div class="col-sm-6 col-md-4 col-lg-2" :data-folder-id="data.folderId">
        <router-link :to="`/disk/folder/${data.folderId}`">
            <div class="card media media-folder"  ref="folderItem">
                <!-- <a href="" class="dropdown-link" data-toggle="dropdown" @click.prevent="$emit('openDropdown', {folderId : data.folderId, el : $el})"></a> -->
                <a href="" class="dropdown-link" data-toggle="dropdown" @click.prevent="fetchCurrentFolder"></a>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <div class="media-body">
                    <h6><div class="link-02">{{data.folderName}}</div></h6>
                </div>
            </div>
        </router-link>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    props: ['data'],
    computed :{
        ...mapState(['currentItem', 'isOpenDropdown'])
    },
    methods : {
        ...mapMutations([
            'SET_IS_OPEN_DROPDOWN',
            'SET_CURRENT_ITEM',
            'SET_DROPDOWN_POS'
        ]),
        fetchCurrentFolder(){
            if(this.currentItem.folderId !== this.data.folderId || !this.currentItem.folderId || this.currentItem.type !== this.data.type){
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

