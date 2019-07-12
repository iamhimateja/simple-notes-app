$(document).on('turbolinks:load', function() {
  $.LoadingOverlaySetup({
    size: 25
  })
  $('#new_note').off('ajax:send').on('ajax:send', function(xhr) {
    $(this).LoadingOverlay("show")
  }).off('ajax:success').on('ajax:success', function(event, data, status) {
    $(this).LoadingOverlay("hide");
    $(this).find('.modal-body').prepend('<div class="alert alert-success alert-dismissible fade show" role="alert">'+ data +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
    $(this).closest('.modal').modal('hide')
    setTimeout(function() {
      Turbolinks.visit('/')
    }, 3000)
  }).off('ajax:error').on('ajax:error', function(xhr, status, error) {
    $(this).find('.modal-body').prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+ xhr.responseJSON +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
    $(this).LoadingOverlay("hide")
  });

  $('.note_card').off('click').on('click', function(event) {
    $('#notesDetailsModal').find('.details.title').text($(this).data('title'))
    $('#notesDetailsModal').find('.details.body').text($(this).data('body'))
    $('#notesDetailsModal').find('.details.tags').empty()
    var tags = $(this).data('tags').split(', ')
    $.each(tags, function(index, val) {
       $('#notesDetailsModal').find('.details.tags').append('<span class="note_detail_tag">'+val+'</span>')
    });
    $('#notesDetailsModal').modal('show');
  })
})