<template>
    <div class="dropdown-menu dropdown-menu-details">
        <div v-if="currentItem.trashed">
             <a href="#" data-toggle="modal" class="dropdown-item"  @click.prevent="onRestore"><i class="far fa-history"></i>복원</a>
             <a href="#" data-toggle="modal" class="dropdown-item"  @click.prevent="onDeleteForever"><i class="far fa-trash-alt"></i>영구삭제</a>  
        </div>
        <div v-else>
           <a href="#" class="dropdown-item" id="folder_star" @click.prevent="onChangeStarred"><i class="fa-star" :class="{fas : currentItem.starred, far: !currentItem.starred}"></i>{{starredText}}</a>
            <a :href="downloadUrl" class="dropdown-item"><i class="far fa-arrow-to-bottom"></i>다운로드</a>
            <a href="#" data-toggle="modal" class="dropdown-item"  @click.prevent="SET_IS_OPEN_COPY_MODAL(true)"><i class="far fa-copy"></i>복사</a>
            <a href="#" data-toggle="modal" class="dropdown-item"  @click.prevent="SET_IS_OPEN_MOVE_MODAL(true)"><i class="far fa-folder"></i>이동하기</a>
            <a href="#" class="dropdown-item"  @click.prevent="SET_IS_OPEN_RENAME_MODAL(true)"><i class="far fa-edit"></i>이름 바꾸기</a>
            <a href="#" class="dropdown-item"  @click.prevent="onChangeTrashed"><i class="far fa-trash"></i>삭제</a>
        </div>
        
    </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex';
export default {
    props : ['pos'],
    computed :{
        ...mapState(['currentItem', 'dropdownPos']),
        //파일이냐 폴더이냐에 따라서 host다르게 리턴
        downloadUrl(){
            if(this.currentItem.type === 'folder'){
                return `${process.env.VUE_APP_APIHOST}/api/disk/folder/download/${this.currentItem.folderId}`
            }else if(this.currentItem.type === 'file'){
                return `${process.env.VUE_APP_APIHOST}/api/disk/file/download/${this.currentItem.fileId}`
            }
        },
        //starred상태에 따라 text다르게 나오기 
        starredText(){
            return this.currentItem.starred ? '중요 문서함에서 삭제' : '중요 문서함에 추가'
        }
        
    },
    watch:{
       dropdownPos : {
           handler: function(newValue, oldValue) {
            // Vue에서 데이터와 UI를 건드려야 하는 상황에 DOM을 못 찾는 상황이 생긴다. 따라서 $nextTick사용(setTimeOut)
            let itemTop = newValue.itemPosTop;
            let itemLeft = newValue.itemPosLeft;
            let itemWidth = newValue.itemPosWidth;
            
           
           this.$nextTick(() =>{
               let dropdownEl = document.querySelector(".dropdown-menu-details");
               let dropdownWidth = dropdownEl.offsetWidth;
                dropdownEl.style.top = (itemTop + 30)+'px';
                dropdownEl.style.left = itemLeft + (itemWidth - (dropdownWidth + 30)) + 'px'; //왼쪽 위치 + (아이템 너비 - (드롭다운너비 + 30))
             })
                    
            },
            deep: true,
            immediate: true
       },
       
    },
    methods: {
        ...mapMutations(['SET_IS_OPEN_COPY_MODAL', 'SET_IS_OPEN_MOVE_MODAL', 'SET_IS_OPEN_RENAME_MODAL']),
        ...mapActions([
            'CHANGE_FOLDER_STARRED', 
            'CHANGE_FOLDER_TRASHED', 
            'RESTORE_FOLDER',
            'CHANGE_FILE_STARRED', 
            'CHANGE_FILE_TRASHED',
            'RESTORE_FILE',
            'DELETE_FOLDER',
            'DELETE_FILE'
            ]),
        onChangeStarred(){
            if(this.currentItem.type === "folder"){
                this.CHANGE_FOLDER_STARRED({folderId : this.currentItem.folderId, starred : !this.currentItem.starred});
            }else if(this.currentItem.type === "file"){
                this.CHANGE_FILE_STARRED({fileId : this.currentItem.fileId, starred : !this.currentItem.starred});
            }
        },
        onChangeTrashed(){
            if(this.currentItem.type === "folder"){
                this.CHANGE_FOLDER_TRASHED({folderId : this.currentItem.folderId, trashed : !this.currentItem.trashed});
            }else if(this.currentItem.type === "file"){
                this.CHANGE_FILE_TRASHED({fileId : this.currentItem.fileId, trashed : !this.currentItem.trashed});
            }
        },
        onRestore(){
            if(this.currentItem.type === "folder"){
                this.RESTORE_FOLDER({folderId : this.currentItem.folderId, trashed : !this.currentItem.trashed});
            }else if(this.currentItem.type === "file"){
                this.RESTORE_FILE({fileId : this.currentItem.fileId, trashed : !this.currentItem.trashed});
            }
        },
        
        onDeleteForever(){
            if (!window.confirm('완전히 삭제하시겠습니까?')) return;

            if(this.currentItem.type === "folder"){
                this.DELETE_FOLDER({folderId : this.currentItem.folderId});
            }else if(this.currentItem.type === "file"){
                this.DELETE_FILE({fileId : this.currentItem.fileId});
            }
        }
        
    },
 
}
</script>