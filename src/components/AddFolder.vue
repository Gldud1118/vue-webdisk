<template>
    <Modal>
        <div slot="header">
            <h3 class="modal-title">새폴더</h3>
        </div>
        <div slot="body">
            <input type="text" class="form-control input-value">
        </div>
        <div slot="footer">
            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" @click="$emit('close')">취소
			</button>
			<button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">만들기
			</button>
        </div>
    </Modal>
</template>
<script>
import Modal from "@/components/Modal.vue";

export default {
    components:{
        Modal
    }
}
</script>