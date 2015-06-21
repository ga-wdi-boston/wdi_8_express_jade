$('form[name="new-contact"]').on('submit', function(event){
  event.preventDefault();
  var contact = {
    firstName: $('input[name="first-name"]').val(),
    lastName: $('input[name="last-name"]').val(),
    title: $('input[name="title"]').val()
  };
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/contacts',
    data: JSON.stringify(contact),
    contentType: "application/json; charset=utf-8"
  }).done(function(response){
    $('.contacts').append(response);
  });
});
