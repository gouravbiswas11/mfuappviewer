import Vue from 'vue'
import Router from 'vue-router'
import CatalogParent from '@/components/CatalogParent'
import CatalogProduct from '@/components/CatalogProduct'
import CFSChar from '@/components/CFSChar'
import RFSChar from '@/components/RFSChar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CatalogParent',
      component: CatalogParent
    },
    {
      path: '/Products',
      name: 'CatalogProduct',
      component: CatalogProduct
    },
    {
      path: '/Products/CFSChar',
      name: 'CFSChar',
      component: CFSChar
    },
    {
      path: '/Products/RFSChar',
      name: 'RFSChar',
      component: RFSChar
    }
  ]
})
