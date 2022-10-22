$(function(){
   todoslist();
   $(".body").on("click", ".btn-danger", deleteFun)
})

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
                <input type="text" class="form-control" id="exampleInputEmail1">

                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
          
                <!-- Modal footer -->
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
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