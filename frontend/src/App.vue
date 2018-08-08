<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        // eslint-disable-next-line
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {
  height: 100%;
}

.login {
  background: #30cad8; /* Old browsers */
  background: -moz-linear-gradient(-45deg, #30cad8 0%, #53cbf1 40%, #44a0de 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(-45deg, #30cad8 0%,#53cbf1 40%,#44a0de 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(135deg, #30cad8 0%,#53cbf1 40%,#44a0de 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#30cad8', endColorstr='#44a0de',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>
