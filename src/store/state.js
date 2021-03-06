export default {
    urlApi: process.env.VUE_APP_API_URL_BACKEND,
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    loadingState: false,
    snackbar: {
      visible: false,
      color: 'success',
      text: null,
      timeout: 10000,
      multiline: false,
    },
}
