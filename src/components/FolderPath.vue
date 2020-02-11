<template>
    <router-link :to="`/disk/folder/${data.folderId}`" class="folder-path-item">
        <span class="path mr-3" :data-id="data.folderId">{{data.folderName}}</span><span class="mr-3" v-if="index != count-1">></span>
    </router-link>
</template>

<script>
export default {
    props : ['data', 'index', 'count']
}
</script>
