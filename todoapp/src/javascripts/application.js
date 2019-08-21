import axios from 'axios';
import Vue from 'vue'

var app = new Vue({
  el: '#login-form',
  data: {
    title: '',
    memo: ''
  },
  methods: {
    createUser: function() {
      axios.post('https://script.google.com/macros/s/AKfycbzPqbtPRlmmacan7j2P5ZH_c2QttGPtrimaoNELY7zw09Ve1CgZ/exec',
      {
        title: this.title,
        memo: this.memo
      },
      {headers: {'content-type': 'application/x-www-form-urlencoded' }})
    }
  }
})

new Vue({
  el: '#app',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://script.google.com/macros/s/AKfycbzPqbtPRlmmacan7j2P5ZH_c2QttGPtrimaoNELY7zw09Ve1CgZ/exec',
      {headers : {
               'content-type': 'application/x-www-form-urlencoded'
             }}
      )
      .then(response => (this.info = response))
  }
})
