'use strict';

//AJAXUTIL
function AjaxUtil(metodo, url, parametros){
    var parametros = parametros || {};
    var http  = new XMLHttpRequest();
    var result = [];
    if (metodo.toUpperCase() == "GET"){
        http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                result.push(JSON.parse(this.responseText));
            }
        }
        http.open('GET', url, true);
        http.send();
        return result;
    }
    if(metodo.toUpperCase() == "POST"){
        var data = new FormData();
        Object.keys(parametros).forEach(function(valor, index){
            data.append(valor, parametros[valor])
        })
        http.open('POST', url, true);
        http.onload = function () {
            result.push(JSON.parse(this.responseText));
        };
        http.send(data);
        return result;
    }
    if(metodo.toUpperCase() !== "POST" || metodo.toUpperCase() !== "GET"){
        throw "NO ESTA USANDO LOS METODOS: 'GET' o 'POST'";
    }
}

var datosTabla = AjaxUtil("GET", "https://jsonplaceholder.typicode.com/users")
console.log(AjaxUtil("GET", "https://jsonplaceholder.typicode.com/users"))
