$(document).ready(function () {
  /*
    Amenities selections
  */
  $('.amenities .popover ul li input').click(function () {
    const amenitiesId = [];
    const amenitiesName = [];
    $.each($('.amenities .popover ul li input:checked'), function () {
      amenitiesId.push(this.dataset.id);
      amenitiesName.push(this.dataset.name);
    });
    $('.amenities h4').text(amenitiesName.join(', '));
    /* console.log(amenitiesId); */
  });

  /*
    Status API
  */
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    /* console.log(data.status); */
    if (data.status === 'OK') {
      $('header div#api_status').removeClass('not-available').addClass('available');
    }
  });
});
