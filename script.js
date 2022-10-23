$(function(){
    todoslist();
    $(".body").on("click", ".btn-danger", deleteFun)
    $(".body").on("click", ".submit", addTodo)
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
         url: "https://usman-cui-recipies.herokuapp.com/api/recipes",
         success: function (response) {
             for(let i = 0;i < response.length;i++){
                 deleteFun()
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
         console.log(heading+body+" here");
         $.ajax({
             type: "PUT",
             url: "https://usman-cui-recipies.herokuapp.com/api/recipes/"+id,
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
         url: "https://usman-cui-recipies.herokuapp.com/api/recipes/"+id,
         success: function(response){
             id = response._id
             $("#head").val(response.title)
             $("#body").val(response.body)
             console.log(`
                 ${id}
                 `)
         }
     })
 }
 
 
 function addTodo() { 
     let heading = $("#head").val()
     let body = $("#body").val()
     $.ajax({
         type: "POST",
         url: "https://usman-cui-recipies.herokuapp.com/api/recipes",
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
         url: "https://usman-cui-recipies.herokuapp.com/api/recipes/"+id,
         type: "DELETE",
         success: function (response) {
             console.log("The request is granted.")
             todoslist()
         }
 
     })
 }
 
 
 function todoslist() {
     $.ajax({
         type: "GET",
         url: "https://usman-cui-recipies.herokuapp.com/api/recipes",
         success: function (response) {
            var body = $(".body");
            body.empty();
             for(let i = 0;i < response.length;i++){
                 body.append(`
                     <div class="card col-sm-4 col-md-3" id="${response[i]._id}">
                     <div class="card-body">
                     <h1 class="card-title fs-5">${response[i].title}</h1>
                     <p class="card-text">${response[i].body}</p>
                     <a href="#" class="btn btn-warning d-inline btn-sm" data-bs-toggle="modal" data-bs-target="#myModal">Edit</a>
 
 
                     <div class="modal" id="myModal">
                     <div class="modal-dialog modal-dialog-centered">
                     <div class="modal-content">
           
                 <!-- Modal Header -->
                 <div class="modal-header">
                   <h4 class="modal-title">Enter the </h4>
                   <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                 </div>
           
                 <!-- Modal body -->
                 <div class="modal-body">
                 <label for="exampleInputEmail1" class="form-label">Title</label>
                 <input type="text" class="form-control" id="head">
 
                 <label for="exampleInputEmail1" class="form-label">Body</label>
                 <input type="text" class="form-control" id="body" aria-describedby="emailHelp">
                 </div>
           
                 <!-- Modal footer -->
                 <div class="modal-footer">
                   <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                   <button type="button" class="btn btn-warning submit" disabled="true">Submit</button>
                   <button type="button" class="btn btn-warning update">Update</button>
                 </div>
           
               </div>
               </div>
               </div>
 
 
 
 
                     <a href="#" class="btn btn-danger d-inline btn-sm">Delete</a>
                 `)
             }            
         },
         error: function (err) {
             console.log("Some error")
           }
     });
 }