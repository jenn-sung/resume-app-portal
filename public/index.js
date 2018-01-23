/* global Vue, VueRouter, axios */

// Begin Login Page

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var router = new VueRouter({
  routes: [
    // { path: "/", component: HomePage },
    { path: "/myResume", component: MyResume },
    { path: "/login", component: LoginPage }
  ]
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});

// End Login


// Begin MyResume (SHOW) Page
var MyResume = {
  template: "#my-resume-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      userResume: []
    };
  },
  created: function() {
    axios.get('/students/show').then(function(response) {
      this.userResume = response.data;
    }.bind(this));
  },
  methods: {},
  computed: {}
};
