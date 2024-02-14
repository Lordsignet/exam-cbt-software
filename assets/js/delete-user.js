$('.postsdelete').click(function() {
var message = "Do you want to delete this posts?";

message += " ";
message += "This action is irreversible";
var response = confirm(message);
		var ids = $(this).attr('id');
		var value = $(this).closest("tr");
		console.log(value);
		if(response) {
		$.ajax({
	    url : "posts_delete",
	    type: "POST",
	    data : { ids: ids },
	    success: function(data)
	    {
	    	if(data === "YES") {
			$(value).fadeOut(1000).remove();
	    	} else {
			alert("sorry the data could not be deleted");
			}
	    }
	});
	}
});
