<template>
    <div class="modal-wrapper">
         <div class="modal fade show" role="dialog" aria-modal="true"> 
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="header">
                            default header
                        </slot>
                        <button type="button" class="close" aria-label="Close" data-dismiss="modal" @click="$emit('close')">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                         <slot name="body">
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            default footer
                        </slot>
                    </div>
                </div>
            </div>
		</div>
        <div class="modal-backdrop fade show"></div>
    </div>
       
</template>

<style lang="scss">
 
</style>