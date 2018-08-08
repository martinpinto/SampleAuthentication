<template>
  <div class="container">
    <div class="login-form">
      <div class="main-div">
        <div class="panel">
          <h2>Login</h2>
          <p>Please enter your email and password.</p>
        </div>
        <form id="Login" @submit.prevent="handleSubmit">
          <div class="form-group">
            <input type="email" class="form-control" id="inputEmail" placeholder="Email Address" v-model="email" name="email" :class="{ 'is-invalid': submitted && !email }" >
            <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
          </div>
          <div class="form-group">
            <input type="password" id="inputPassword" placeholder="Password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
            <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="status.loggingIn">Login</button>
          <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          <router-link to="/register" class="btn btn-link">Register</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */ 
import { mapState, mapActions } from 'vuex'

export default {
  data () {
      return {
          email: '',
          password: '',
          submitted: false
      }
  },
  computed: {
      ...mapState('account', ['status'])
  },
  created () {
      // reset login status
      this.logout();
  },
  methods: {
      ...mapActions('account', ['login', 'logout']),
      handleSubmit (e) {
          this.submitted = true;
          const { email, password } = this;
          if (email && password) {
              this.login({ email, password })
          }
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
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
    color: #EEA345;
  }

  .form-heading {
    color: #fff;
    font-size: 23px;
  }

  .panel h2 {
    color: #444444;
    font-size: 18px;
    margin: 0 0 8px 0;
  }

  .panel p {
    color: #777777;
    font-size: 14px;
    margin-bottom: 30px;
    line-height: 24px;
  }

  .login-form .form-control {
    background: #f7f7f7 none repeat scroll 0 0;
    border: 1px solid #d4d4d4;
    border-radius: 4px;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
  }

  .main-div {
    background: #ffffff none repeat scroll 0 0;
    border-radius: 2px;
    margin: 10px auto 30px;
    max-width: 38%;
    padding: 50px 70px 70px 71px;
  }

  .login-form .form-group {
    margin-bottom: 10px;
  }

  .login-form {
    text-align: center;
  }

  .login-form .btn.btn-primary {
    background: #f0ad4e none repeat scroll 0 0;
    border-color: #f0ad4e;
    color: #ffffff;
    font-size: 14px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0;
  }

  .botto-text {
    color: #ffffff;
    font-size: 14px;
    margin: auto;
  }

  .login-form .btn.btn-primary.reset {
    background: #ff9900 none repeat scroll 0 0;
  }

  .back {
    text-align: left;
    margin-top: 10px;
  }

  .back a {
    color: #444444;
    font-size: 13px;
    text-decoration: none;
  }
</style>