'use strict';

//AJAXUTIL
var AjaxUtil = function(settings){
    var http  = new XMLHttpRequest();
    var settings = settings || {};
    if (settings.type.toUpperCase() == "GET"){
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                settings.success(JSON.parse(http.responseText));
                }
            }
        http.onerror = function(){
            settings.error(http.responseText)
        }
        http.open('GET', settings.url, true);
        http.send();
    }
    if(settings.type.toUpperCase() == "POST"){
            var params = new FormData();
            Object.keys(settings.data).forEach(function(valor, index){
                params.append(valor, settings.data[valor])
            })
            http.open('POST', settings.url, true);
            http.onload = function () {
                settings.success(JSON.parse(http.responseText));
            };
            http.onerror = function(){
                settings.error(http.responseText)
            }
            http.send(params);
        }
    }

    // AjaxUtil({
    //     url: "https://jsonplaceholder.typicode.com/users/",
    //     type: "GET",
    //     success: function(data){
    //         console.log("BIEN", data)
    //     },
    //     error: function(err){
    //         console.log("ERROR")
    //     }
    // })
    // AjaxUtil({
    //     url: "https://reqres.in/api/users/",
    //     type: "POST",
    //     data: {
    //         name: "morpheus",
    //         job: "leader"
    //     },
    //     success: function(data){
    //         console.log("BIEN", data)
    //     },
    //     error: function(err){
    //         console.log("ERROR")
    //     }
    // })