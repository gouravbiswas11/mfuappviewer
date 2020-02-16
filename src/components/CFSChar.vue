<template>
<div id="app">
 <v-app>
    <v-content>
    <v-container>
        <v-row>
        <v-col>
        
     <v-overflow-btn
            :items="getCFS"
            label="Search CFS Here to Get Characteristics"
            color="#E6EE9"
            loading
            background-color="#E6EE9"
            item-value="text"
            editable
            v-model="selectedValue"
          ></v-overflow-btn>
           <v-text-field v-model="search"     append-icon="search"    label="Search"   single-line     hide-details v-if="getCFSChar.length>0"
        ></v-text-field>
          <v-data-table
      :headers="headers"      
      :items="getCFSChar"
      :search="search"
      item-key="text"
      
      class="elevation-1" v-if="getCFSChar.length>0">
     
    </v-data-table>


         </v-col>  
      </v-row>
       
    </v-container>
    </v-content>
  
 </v-app>
  </div> 
</template>

<script>
export default {
  name: 'CFSChar',
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
      selectedValue:'',
      CFScomponenets: [],
      search:'',
      headers: [
        {
          text: 'Characteristics',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Characteristics Values', value: 'value',
          sortable: true }
      ]
      

    }
  },
 created(){
 this.$store.dispatch('GET_CFS',this.$store.getters.CFScomponenets)
  },
 methods:{
  async fetch(){
    console.log("callong api")
    axios.get('http://172.17.2.104/SigmaCatalogServices/api/types(TDCCustomerFacingService)/entities').then((response) => {
        console.log(response.data);
        this.body=response.data.Entities.Component
               
        
      })
  }
  },
 computed :{
   getCFS(){
      this.body=this.$store.getters.CFScomponenets
     let products=[]
     for (var i=0;i<this.body.length;i++){
          var item={text:this.body[i].Name,value:this.body[i]}
          products.push(item)
      }
      return products
   },
   getCFSChar(){
     let char=[]
     for (var i=0;i<this.body.length;i++){
      if(this.body[i].Name==this.selectedValue){
      var guid={name:"Element_Guid",value:this.body[i].Element_Guid}
      char.push(guid)
          for (var j=0;this.body[i].Commercial_SpecCharUse && j<this.body[i].Commercial_SpecCharUse.length;j++){
                for (var k=0;k<this.body[i].Commercial_SpecCharUse[j].Characteristic.length;k++){
                   
                    var value='';
                    for (var l=0;l<this.body[i].Commercial_SpecCharUse[j].Characteristic[0].Characteristic_CharValue.length;l++){
                    value= value+ ' | '+(this.body[i].Commercial_SpecCharUse[j].Characteristic[0].Characteristic_CharValue[l].Value);
                    
                    }

                     var item={name:this.body[i].Commercial_SpecCharUse[j].Characteristic[0].Name,value:value}
                     char.push(item)
              }
            }
            for (var j=0;this.body[i].Commercial_UserDefinedChar && j<this.body[i].Commercial_UserDefinedChar.length;j++){
              for (var k=0;k<this.body[i].Commercial_UserDefinedChar[j].Characteristic.length;k++){
                   
                    var value='';
                                    
                     var item={name:this.body[i].Commercial_UserDefinedChar[j].Characteristic[0].Name,value:value}
                     char.push(item)
              }
          }
          for (var j=0;this.body[i].IP_SpecCharUse && j<this.body[i].IP_SpecCharUse.length;j++){
              for (var k=0;k<this.body[i].IP_SpecCharUse[j].Characteristic.length;k++){
                   
                    var value='';
                                    
                     var item={name:this.body[i].IP_SpecCharUse[j].Characteristic[0].Name,value:value}
                     char.push(item)
              }
          }
          for (var j=0;this.body[i].Access_SpecCharUse && j<this.body[i].Access_SpecCharUse.length;j++){
              for (var k=0;k<this.body[i].Access_SpecCharUse[j].Characteristic.length;k++){
                   
                    var value='';
                                    
                     var item={name:this.body[i].Access_SpecCharUse[j].Characteristic[0].Name,value:value}
                     char.push(item)
              }
          }
          for (var j=0;this.body[i].QoS_SpecCharUse && j<this.body[i].QoS_SpecCharUse.length;j++){
              for (var k=0;k<this.body[i].QoS_SpecCharUse[j].Characteristic.length;k++){
                   
                    var value='';
                                    
                     var item={name:this.body[i].QoS_SpecCharUse[j].Characteristic[0].Name,value:value}
                     char.push(item)
              }
          }
           for (var j=0;this.body[i].Visitation_Request_UserDefinedChar && j<this.body[i].Visitation_Request_UserDefinedChar.length;j++){
              for (var k=0;k<this.body[i].Visitation_Request_UserDefinedChar[j].Characteristic.length;k++){
                   
                    var value='';
                                    
                     var item={name:this.body[i].Visitation_Request_UserDefinedChar[j].Characteristic[0].Name,value:value}
                     char.push(item)
              }
          }
           for (var j=0;this.body[i].Visitation_Response_UserDefinedChar && j<this.body[i].Visitation_Response_UserDefinedChar.length;j++){
              for (var k=0;k<this.body[i].Visitation_Response_UserDefinedChar[j].Characteristic.length;k++){
                   
                    var value='';
                                    
                     var item={name:this.body[i].Visitation_Response_UserDefinedChar[j].Characteristic[0].Name,value:value}
                     char.push(item)
              }
          }
          
          
          
          break;
          }
          
      }
      return char
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
