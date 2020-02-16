<template>
 <div> 
  <img src="@/assets/sc.jpeg" style="align:right"  />
   <router-view/>

  </div> 
</template>

<script>

import CatalogProduct from './CatalogProduct.vue';
export default {
  name: 'CatalogParent',
   components: {CatalogProduct},
  data () {
    return {
      title: 'Welcome to Catalog Viewer',
      welcomeMessage: "Welcome to Catalog Viewer",
      body:[],
      drawer: true,
      clipped: true,
      selectedproduct:[],
      parentProducts:[],
       menu: [
               {
                    href: '/',
                    title: 'Home',
                    icon: 'home'
                },
                {
                    href: '/Products',
                    title: 'Display Product Info',
                    icon: 'fa fa-user'
                },
                {
                    href: '#',
                    title: 'View CFS Characteristics',
                    icon: 'fa fa-chart-area'
                },
                {
                    href: '#',
                    title: 'View RFS Characteristics',
                    icon: 'fa fa-chart-area'
                }
            ]

    }
  },
  created(){
  // this.fetch();
  },
  methods:{
  async fetch(){
    console.log("callong api")
    axios.get('http://172.17.2.104/SigmaCatalogServices/api/types(TDCCustomerFacingService)/entities').then((response) => {
        console.log(response.data);
        this.body=response.data.Entities.Component
               
        
      })
  },
  fetchAllParent(){
  this.fetch();
  },
  parentProduct(item){
        console.log(item)
      for(var i=0;i<this.body.length;i++){
      if(this.body[i].Name==item){
      this.parentProducts.push(this.body[i])
      }
      
      }
  }
  },
  computed :{
   getParentproducts(){
      let listOfProducts=[]
      let productToProduct=[]
      let products=[]

      
      for(var i=0;i<this.body.length;i++){
      console.log(this.body[i].Name)
      
        if(this.body[i].Product_To_Product){
        for(var j=0;j<this.body[i].Product_To_Product.length;j++){
        productToProduct.push(this.body[i].Product_To_Product[j]);
        }
       
      }
      }
      console.log(productToProduct)
       for(var i=0;i<this.body.length;i++){
       let found=false
      for(var j=0;j<productToProduct.length;j++){
       if(this.body[i].Name==productToProduct[j].Product[0].Name){
       console.log(productToProduct[j].Product[0].Name)
         found=true;
         break;
       }
      }
      if(!found){
      console.log(this.body[i].Name)
      var item={name:this.body[i].Name,index:listOfProducts.length+1,component:this.body[i]};
      listOfProducts.push(item)
      this.parentProduct(item.name)
      }
      }
        
      return listOfProducts;
   }
}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
group {
display: flex;
flex: 1;
justify-content: space-around;
}
</style>
