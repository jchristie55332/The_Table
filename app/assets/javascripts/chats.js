var railsChat = railsChat || {};

railsChat.fields = ["username", "other_user", "message"]

railsChat.getNotes = function(){
  $("table tbody").html("")

  $.getJSON("/chats", function(data){
    $.each(data, function(i, chat){
      var row = $("<tr>"+
        "<td>"+ chat.message +"</td></tr>")
      row.appendTo("table tbody")
    })
  })
}

railsChat.postNote = function(event, data){
  event.preventDefault();
  $.ajax({
    url: "/chats",
    method: "POST",
    data: {chat: {'user_id': $('#user_id').val(), 'restaurant_id': $('#restaurant_id').val(), 'message': $('#message').val()}},
    dataType: "json"
  }).success(function(){railsChat.getNotes()
  })
}

$(function(){
  railsChat.getNotes();
  $("#post_chat").on("submit", railsChat.postNote)
});