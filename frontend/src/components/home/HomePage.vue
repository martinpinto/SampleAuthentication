<template>
  <div class="container">
    <div class="form">
      <div class="main-div">
        <div class="panel">
          <p>You're logged in!</p>
          <h3>Users from secure api end point:</h3>
        </div>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users">
          <li v-for="user in users.items" :key="user.id">
            {{user.firstname + ' ' + user.lastname}}
          </li>
        </ul>
        <p>
          <router-link to="/login" class="btn btn-link">Logout</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    computed: {
      ...mapState({
        account: state => state.account,
        users: state => state.users.all
      })
    },
    created() {
      this.getAllUsers();
    },
    methods: {
      ...mapActions('users', {
        getAllUsers: 'getAll'
      })
    }
  };
</script>

<style scoped>
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  ul {
    margin: 2em 0;
  }

  li {
    margin: 1em;
    margin-left: 3em;
  }

  li:before {
    content: '\f006';
    font-family: 'FontAwesome';
    float: left;
    margin-left: -1.5em;
    color: #0074D9;
  }

  h3 {
    margin: 40px 0 0;
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

  .form .form-control {
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

  .form .form-group {
    margin-bottom: 10px;
  }

  .form {
    text-align: center;
  }

  .form .btn.btn-primary.reset {
    background: #ff9900 none repeat scroll 0 0;
  }
</style>
