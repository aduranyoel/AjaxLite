var AjaxLite = function (settings) {
    'use strict';

    var http = new XMLHttpRequest();
    settings = settings || new Object;
    settings.type = settings.type || "POST";
    settings.data = settings.data || new Object;
    settings.success = settings.success || new Function();
    settings.error = settings.error || new Function();
    if (settings.type.toUpperCase() === "GET" && settings.url !== undefined) {
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                var contentType = http.getResponseHeader("Content-Type").split(';')[0];
                if (contentType === "application/json") {
                    settings.success(JSON.parse(http.responseText));
                } else {
                    settings.success(http.responseText);
                }
            }
        };
        http.onerror = function () {
            settings.error(http.responseText);
        };
        http.open('GET', settings.url, true);
        http.send();
    }
    if (settings.type.toUpperCase() === "POST" && settings.url !== undefined) {
        http.open('POST', settings.url, true);
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                var contentType = http.getResponseHeader("Content-Type").split(';')[0];
                if (contentType === "application/json") {
                    settings.success(JSON.parse(http.responseText));
                } else {
                    settings.success(http.responseText);
                }
            }
        };
        http.onerror = function () {
            settings.error(http.responseText);
        };
        http.setRequestHeader("Content-Type", settings.contentType ? settings.contentType : "application/json; charset=utf-8");
        http.send(JSON.stringify(settings.data));
    }
    if (settings.type.toUpperCase() !== "POST" && settings.type.toUpperCase() !== "GET") {
        var err = new Error("El Tipo del Metodo debe ser POST o GET");
        settings.error(err);
        throw "Propiedad 'type' Invalida!!!";
    }
    if (settings.url === undefined) {
        throw "Propiedad 'url' no puede estar vacia!!!";
    }
};

    //  AjaxLite({
    //      url: "https://jsonplaceholder.typicode.com/users/",
    //      type: "GET",
    //      success: function(data){
    //          console.log("BIEN", data)
    //      },
    //      error: function(err){
    //          console.log("ERROR", err)
    //      }
    //  })
    // AjaxLite({
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
