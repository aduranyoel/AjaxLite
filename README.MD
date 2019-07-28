```
 AjaxUtil({
        url: "https://jsonplaceholder.typicode.com/users/",
        type: "GET",
        success: function(data){
            console.log("BIEN", data)
        },
        error: function(err){
            console.log("ERROR")
        }
    })
    AjaxUtil({
        url: "https://reqres.in/api/users/",
        type: "POST",
        data: {
            name: "morpheus",
            job: "leader"
        },
        success: function(data){
            console.log("BIEN", data)
        },
        error: function(err){
            console.log("ERROR")
        }
    })
```