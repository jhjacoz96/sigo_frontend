import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/components/public/Index'),
      children: [
        {
          name: 'Login',
          path: '',
          component: () => import('@/views/components/public/Login'),
        },
      ],
    },
    {
      path: '/tienda',
      component: () => import('@/views/components/private/store/core/Index'),
      children: [
        {
          name: 'Tienda',
          path: '',
          component: () => import('@/views/components/private/store/StoreInicio'),
        },
        {
          name: 'Buscar',
          path: 'buscar',
          component: () => import('@/views/components/private/store/StoreSearch'),
        },
        {
          name: 'Carrito de compra',
          path: 'carrito',
          component: () => import('@/views/components/private/store/StoreCart'),
        },
        {
          name: 'Favoritos',
          path: 'favorito',
          component: () => import('@/views/components/private/store/StoreHeart'),
        },
        {
          name: 'Categorias',
          path: 'categoria',
          component: () => import('@/views/components/private/store/StoreCategory'),
        },
        {
          name: 'Perdidos',
          path: 'pedido',
          component: () => import('@/views/components/private/store/StoreOrder'),
        },
        {
          name: '',
          path: 'categoria/:category',
          component: () => import('@/views/components/private/store/StoreProductByCategory'),
        },
        {
          name: 'Editar Perfil',
          path: 'editar-perfil',
          component: () => import('@/views/components/private/shared/ProfileEdit'),
        },
        {
          name: 'Tabs',
          path: 'tabs',
          component: () => import('@/views/dashboard/component/Tabs'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/views/components/private/admin/core/Index'),
      children: [
        {
          name: 'Configuración de organización',
          path: 'configuracion',
          component: () => import('@/views/components/private/admin/configuration/AdminConfiguration'),
        },
        {
          name: 'Roles y permisos',
          path: 'rol',
          component: () => import('@/views/components/private/admin/role/AdminRole'),
        },
        {
          name: 'Administración',
          path: '',
          component: () => import('@/views/components/private/admin/AdminInicio'),
        },
        {
          name: 'Pedidos',
          path: 'pedido',
          component: () => import('@/views/components/private/admin/order/AdminOrder'),
        },
        {
          name: 'Agregar pedido',
          path: 'pedido/agregar',
          component: () => import('@/views/components/private/admin/order/AdminOrderAdd'),
        },
        {
          name: 'Categorias',
          path: 'categoria',
          component: () => import('@/views/components/private/admin/category/AdminCategory'),
        },
        {
          name: 'Productos',
          path: 'producto',
          component: () => import('@/views/components/private/admin/product/AdminProduct'),
        },
        {
          name: 'Clientes',
          path: 'cliente',
          component: () => import('@/views/components/private/admin/client/AdminClient'),
        },
        {
          name: 'Empleados',
          path: 'empleado',
          component: () => import('@/views/components/private/admin/employee/AdminEmployee'),
        },
        {
          name: 'Proveedores',
          path: 'proveedor',
          component: () => import('@/views/components/private/admin/provider/AdminProvider'),
        },
        {
          name: 'Ingresos de compras',
          path: 'ingreso',
          component: () => import('@/views/components/private/admin/entry/AdminEntry'),
        },
        {
          name: 'Agrgar ingreso de compra',
          path: 'ingreso/agregar',
          component: () => import('@/views/components/private/admin/entry/AdminEntryAdd'),
        },
      ],
    },
    {
      path: '/pages',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Lock',
          path: 'lock',
          component: () => import('@/views/pages/Lock'),
        },
        {
          name: 'Pricing',
          path: 'pricing',
          component: () => import('@/views/pages/Pricing'),
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'RTL',
          path: 'pages/rtl',
          component: () => import('@/views/dashboard/pages/Rtl'),
        },
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Timeline',
          path: 'pages/timeline',
          component: () => import('@/views/dashboard/pages/Timeline'),
        },
        // Components
        {
          name: 'Buttons',
          path: 'components/buttons',
          component: () => import('@/views/dashboard/component/Buttons'),
        },
        {
          name: 'Grid System',
          path: 'components/grid-system',
          component: () => import('@/views/dashboard/component/Grid'),
        },
        {
          name: 'Tabs',
          path: 'components/tabs',
          component: () => import('@/views/dashboard/component/Tabs'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Forms
        {
          name: 'Regular Forms',
          path: 'forms/regular',
          component: () => import('@/views/dashboard/forms/RegularForms'),
        },
        {
          name: 'Extended Forms',
          path: 'forms/extended',
          component: () => import('@/views/dashboard/forms/ExtendedForms'),
        },
        {
          name: 'Validation Forms',
          path: 'forms/validation',
          component: () => import('@/views/dashboard/forms/ValidationForms'),
        },
        {
          name: 'Wizard',
          path: 'forms/wizard',
          component: () => import('@/views/dashboard/forms/Wizard'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        {
          name: 'Extended Tables',
          path: 'tables/extended-tables',
          component: () => import('@/views/dashboard/tables/ExtendedTables'),
        },
        {
          name: 'Data Tabels',
          path: 'tables/data-tables',
          component: () => import('@/views/dashboard/tables/DataTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        {
          name: 'Full Screen Map',
          path: 'maps/full-screen-map',
          component: () => import('@/views/dashboard/maps/FullScreenMap'),
        },
        // Root level
        {
          name: 'Widgets',
          path: 'widgets',
          component: () => import('@/views/dashboard/Widgets'),
        },
        {
          name: 'Charts',
          path: 'charts',
          component: () => import('@/views/dashboard/Charts'),
        },
        {
          name: 'Calendar',
          path: 'calendar',
          component: () => import('@/views/dashboard/Calendar'),
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})
