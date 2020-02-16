<template>
  <div id="app">
     <sidebar-menu :menu="menu" style="background: #004466;color:#95E4F1" :collapsed="true">
     <span slot="toggle-icon"><i class="fas fa-toggle-on"></i></span>
    </sidebar-menu>
 <v-toolbar style="background: #004466;" light>
   <v-spacer></v-spacer>
  
   <v-toolbar-title v-text="title" text-align="center" style="color: White;font:bold;"></v-toolbar-title>
          <v-spacer></v-spacer>
         

        </v-toolbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  return{
  title: 'Welcome to Catalog Viewer',
  menu: [
               {
                    
                },
                {
                    
                },
                {

                },
               {
                    href: '/',
                    title: 'Home',
                    icon: 'fas fa-home'
                },
                {
                    href: '/Products',
                    title: 'View Product Models',
                    icon: 'fab fa-product-hunt'
                },
                {
                    href: '/Products/CFSChar',
                    title: 'View CFS Characteristics',
                    icon: 'fas fa-copyright'
                },
                {
                    href: '/Products/RFSChar',
                    title: 'View RFS Characteristics',
                    icon: 'fas fa-registered'
                }
            ]

  }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:#ccf5ff;
  
}
</style>
