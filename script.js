var url = "https://usman-cui-recipies.herokuapp.com/api/recipes/"
$(function(){
   todoslist();
   $(".body").on("click", ".btn-danger", deleteFun)
   $(".body").on("click", ".submit", addTodo)
   $(".submit").click(addTodo)
   $(".body").on("click", ".btn-warning", updateTodo)
   $(".fa-plus").click(function UpdateButtonOff() { 
    $("#head").val("")
    $("#body").val("")
    $(".update").prop("disabled", true)
    $(".submit").prop("disabled", false)
    })
    $("#Clear").click(Clearall)
})


function Clearall() { 
    $.ajax({    
        type: "GET",
        url: url,
        success: function (response) {
            for(let i = 0;i < response.length;i++){
                $.ajax({
                    url: url+response[i]._id,
                    type: "DELETE",
                    success: function (response) {
                        todoslist()
                    }
                })
            }
        }
    })
}

function updateTodo(){
    $(".update").prop("disabled", false)
    $(".submit").prop("disabled", true)
    var btn = $(this)
    let parent = btn.closest(".card")
    let id = parent.attr("id")
    $(".update").click(function(){
        let heading = $("#head").val()
        let body = $("#body").val()
        $.ajax({
            type: "PUT",
            url: url+id,
            data: {title:heading, body},
            success: function(response){
                $("#head").val("")
                $("#body").val("")
                $(".btn-primary").click();
                todoslist()
            }
        })
    })
    $.ajax({
        url: url+id,
        success: function(response){
            id = response._id
            $("#head").val(response.title)
            $("#body").val(response.body)
        }
    })
}


function addTodo() { 
    let heading = $("#head").val()
    let body = $("#body").val()
    $.ajax({
        type: "POST",
        url: url,
        data: {title: heading, body},
        success: function(response) {
            $(".btn-primary").click();
            todoslist()
        }
    })

 }

function deleteFun(){
    var btn = $(this)
    let parent = btn.closest(".card")
    let id = parent.attr("id")

    $.ajax({
        url: url+id,
        type: "DELETE",
        success: function (response) {
            todoslist()
        }

    })
}


function todoslist() {
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
           var body = $(".body");
           body.empty();
            for(let i = 0;i < response.length;i++){
                // Displaying each menu in card with title and body
                body.append(`
                    <div class="card col-sm-4 col-md-3" id="${response[i]._id}">
                    <div class="card-body">
                    <h1 class="card-title fs-5">${response[i].title}</h1>
                    <p class="card-text">${response[i].body}</p>
                    <a href="#" class="btn btn-warning d-inline btn-sm" data-bs-toggle="modal" data-bs-target="#myModal">Edit</a>
                    <a href="#" class="btn btn-danger d-inline btn-sm">Delete</a>
                `)
            }            
        },
        error: function (err) {
            console.log("Some error")
          }
    });
}