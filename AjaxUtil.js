'use strict';

//AJAXUTIL
var AjaxUtil = function(settings){
    var http            = new XMLHttpRequest();
    var settings        = settings || {};
    settings.type       = settings.type || "POST";
    settings.data       = settings.data || {};
    settings.success    = settings.success || new Function();
    settings.error      = settings.error || new Function();
    if (settings.type.toUpperCase() === "GET" && settings.url !== undefined){
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
    if (settings.type.toUpperCase() === "POST" && settings.url !== undefined){
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
    if (settings.type.toUpperCase() !== "POST" && settings.type.toUpperCase() !== "GET"){
        var err = new Error("El Tipo del Metodo debe ser POST o GET")
        settings.error(err);
        throw "Propiedad 'type' Invalida!!!";
    }
    if (settings.url === undefined){
        throw "Propiedad 'url' no puede estar vacia!!!";
    }
}

    // AjaxUtil({
    //     url: "https://jsonplaceholder.typicode.com/users/",
    //     type: "GET",
    //     success: function(data){
    //         console.log("BIEN", data)
    //     },
    //     error: function(err){
    //         console.log("ERROR", err)
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