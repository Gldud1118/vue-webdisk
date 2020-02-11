<template>
<Modal>
    <div slot="header" class="modal-header-slot">
        <h3 class="modal-title">{{title}}</h3>
        <button type="button" class="close" aria-label="Close" data-dismiss="modal" @click="$emit('close')">
            <span aria-hidden="true">×</span>
        </button>
    </div>
    <div slot="body">
      <form @submit.prevent="onSubmit" id="form">
            <input type="text" class="form-control" v-model="input">
        </form>
    </div>
    <div slot="footer">
       <button type="button" class="btn btn-secondary btn-sm mr-1" data-dismiss="modal" @click="$emit('close')">취소
        </button>
        <button type="submit" class="btn btn-primary btn-sm" data-dismiss="modal" form="form" :disabled="invalidInput">{{ok}}
        </button>
    </div>
  </Modal>  
    
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
    props :["title", "ok", "inputOriginal"],
    components:{
        Modal
    },
    data(){
        return{
            input : '',
        }
    },
    computed: {
        invalidInput() {
         return !this.input.trim() || this.input === this.inputOriginal
        }
    },
    created() {
      this.inputOriginal ? this.input = this.inputOriginal : '';
    },
    methods: {
        onSubmit(){
            if(this.invalidInput) return;
            this.$emit('submit', this.input)
        }
    },
}
</script>
<style lang="scss">
    .modal-header-slot{
        display: flex;
        flex: 1;
        justify-content: space-between;
    }
</style>