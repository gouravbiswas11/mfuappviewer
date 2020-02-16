<template>
 <div style="background-image: url('@/assets/sc.jpeg')"> 
 
  <v-content>
  <v-container>
  
    <v-expansion-panels accordion style="background: #5c005c;" popout>
        <v-expansion-panel
          v-for="(item,i) in getParentproducts"
          :key="i">
          <v-expansion-panel-header style="background:#00CCFF;" expand-icon="mdi-menu-down">{{item.name}}</v-expansion-panel-header>
          <v-expansion-panel-content style="background:grey;">
          	<!-- v-treeview :items="item.treeviewProduct" :open-all="true" :rounded="true" :item-children="item.treeviewProduct.children"></v-treeview -->
            
    <v-expansion-panels accordion style="background: #5c005c;" popout>
        <v-expansion-panel
          v-for="(i,k) in item.component.Product_To_Product"
          :key="k">
          <v-expansion-panel-header style="background:#00e6e6;" expand-icon="mdi-menu-down">{{i.Product[0].Name}}     <v-spacer></v-spacer>    Guid: {{i.Product[0].Element_Guid}}</v-expansion-panel-header>
          <v-expansion-panel-content style="background:grey;">

          		 <v-expansion-panels accordion style="background: #5c005c;color:#999966; " popout>
        			<v-expansion-panel  v-for="(x,y) in i.Product[0].Product_To_Product"    :key="y">
          <v-expansion-panel-header style="background:#99e6ff;" expand-icon="mdi-menu-down">{{x.Product[0].Name}}  <v-spacer></v-spacer>    Guid: {{x.Product[0].Element_Guid}}</v-expansion-panel-header>
          <v-expansion-panel-content style="background:grey;">

          			<v-expansion-panels accordion style="background: #5c005c;color:#999966; " popout>
        			<v-expansion-panel  v-for="(z,u) in x.Product[0].Product_To_Product"    :key="u">
          <v-expansion-panel-header style="background:#ccf5ff;" expand-icon="mdi-menu-down">{{z.Product[0].Name}}   <v-spacer></v-spacer>    Guid: {{z.Product[0].Element_Guid}}</v-expansion-panel-header>
          <v-expansion-panel-content style="background:grey;">
          				<v-expansion-panels accordion style="background: #5c005c;color:#999966; " popout>
        			<v-expansion-panel  v-for="(m,n) in z.Product[0].Product_To_Product"    :key="n">
          <v-expansion-panel-header style="background:#00CCFF;" expand-icon="mdi-menu-down">{{m.Product[0].Name}}   <v-spacer></v-spacer>    Guid: {{m.Product[0].Element_Guid}}</v-expansion-panel-header>
          
            
        </v-expansion-panel>
      </v-expansion-panels>

           </v-expansion-panel-content>
            
        </v-expansion-panel>
      </v-expansion-panels> 


           </v-expansion-panel-content>
            
        </v-expansion-panel>
      </v-expansion-panels> 


           </v-expansion-panel-content>
            
        </v-expansion-panel>
      </v-expansion-panels> 
            
           </v-expansion-panel-content>
            
        </v-expansion-panel>
      </v-expansion-panels> 
      <v-row>
      <v-col>
     
      <img src="@/assets/sc.jpeg" style="align:right" v-if="getParentproducts.length==0" />
      <div style="margin:0 auto;position: absolute;left: 50%;">
      <RingLoader :loading="getParentproducts.length==0" :size="50" />
       </div> 
      </v-col>
      </v-row>
      </v-container>
      </v-content>
  
 
  </div> 
</template>

<script>
//import { store } from "./store/store";
export default {
  name: 'CatalogProduct',
  props: ['TopProductItems'],
  data () {
    return {
      title: 'Welcome to Catalog Viewer',
      welcomeMessage: "Welcome to Catalog Viewer",
      body:[],
      drawer: true,
      clipped: true,
      selectedproduct:[],
      parentProducts:[],
      selectedproduct:[],
      treeviewProduct:[],
      CFScomponenets: []
      

    }
  },
  created(){
  //this.fetch();
  this.$store.dispatch('GET_CFS',this.$store.getters.CFScomponenets)
  },
 methods:{
  async fetch(){
    console.log("callong api")
    axios.get('http://172.17.2.104/SigmaCatalogServices/api/types(TDCCustomerFacingService)/entities').then((response) => {
        console.log(response.data);
        this.body=response.data.Entities.Component
               
        
      })
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
      this.body=this.$store.getters.CFScomponenets
      
      for(var i=0;i<this.body.length;i++){
     // console.log(this.body[i].Name)
      
        if(this.body[i].Product_To_Product){
        for(var j=0;j<this.body[i].Product_To_Product.length;j++){
        productToProduct.push(this.body[i].Product_To_Product[j]);
        }
       
      }
      }
    //  console.log(productToProduct)
       for(var i=0;i<this.body.length;i++){
       let found=false
      for(var j=0;j<productToProduct.length;j++){
       if(this.body[i].Name==productToProduct[j].Product[0].Name){
       //console.log(productToProduct[j].Product[0].Name)
       		
         found=true;
         break;
       }
      }
      if(!found){
      let treeviewProduct=[]
      //console.log(this.body[i].Name)
      
      for(var j=0;j<this.body[i].Product_To_Product.length;j++){
       
       var item={ name:this.body[i].Product_To_Product[j].Product[0].Name, 
                   index:j,
                   children:[]
				}
		if(this.body[i].Product_To_Product[j].Product[0].Product_To_Product){
						for(var k=0;k<this.body[i].Product_To_Product[j].Product[0].Product_To_Product.length;k++){
							var childItem={		name:this.body[i].Product_To_Product[j].Product[0].Product_To_Product[k].Product[0].Name,
                   								index:this.body[i].Product_To_Product[j].Product[0].Product_To_Product.length+k
                      						}
                      		item.children.push(childItem)				
						}
				}
				treeviewProduct.push(item)			
         
       }
      // console.log(treeviewProduct)
      var item={name:this.body[i].Name,index:listOfProducts.length+1,treeviewProduct:treeviewProduct,component:this.body[i]};
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
.border {
border: 2px dashed orange;
}
</style>
