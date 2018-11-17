$(function () {
    $('#distpicker3').distpicker({
      province: '广东省',
      city: '广州市',
    });
  
  });
  
var app = new Vue({
    el: "#app",
    data: {
        poem: '',
        weather:[],
        something: '',
    },
    created: function () {
        axios.get('https://www.apiopen.top/weatherApi?city=广州')
            .then((response) => {
                // 箭头函数this指向是固定的
                this.poem = response.data.data;
                this.weather = response.data.data.forecast;
                // console.log(this.poem)
                // console.log(this.weather)
            })
            .catch(function (error) {
                console.log(error);
            });
   
    },
    watch:{
        something:  function (something) {
            axios.get('https://www.apiopen.top/weatherApi?city='+something)
                .then((response) => {
                    // 箭头函数this指向是固定的
                    this.poem = response.data.data;
                    this.weather = response.data.data.forecast;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})
var app2 = new Vue({
    el: "#app2",
    data: {
        poem:'',
    },
    created: function () {
        axios.get('https://www.apiopen.top/novelApi')
            .then((response) => {
                // 箭头函数this指向是固定的
                this.poem = response.data.data;
                // console.log(this.poem)
            })
            .catch(function (error) {
                console.log(error);
            });
   
    }
})

var app3 = new Vue({
    el: "#app3",
    data: {
        poem:[]
    },
    created: function () {
    
        axios.get('https://api.apiopen.top/musicRankings')
            .then((response) => {
                // 箭头函数this指向是固定的
                this.poem = response.data.result;              
                
                
                console.log(this.poem)
               
            })
            .catch(function (error) {
                console.log(error);
            });
            
    }
})


