<template>
    <div>
         <div class="dt-root__intra">
          <Header />
        </div>
        <main class="dt-main">
          <Sidebar />
          <div class="dt-content-wrapper">
            <div class="dt-content">
              <router-view></router-view>
            </div>
          </div>
          
        </main>
    </div>
   
</template>

<script>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
export default {
    name : 'Main',
    components: {Header, Sidebar}
}
</script>