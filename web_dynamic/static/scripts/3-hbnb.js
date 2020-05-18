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

  /*
   * 4. Fetch places
   */
  const URL = 'http://0.0.0.0:5001/api/v1/places_search/';
  const myData = {};
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    data: myData,
    success: function (response) {
      for (const places of response) {
        const template = `
          <article>
          <div class="title_box">
            <h2>${places.name}</h2>
            <div class="price_by_night">$${places.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${places.max_guest} Guest</div>
                <div class="number_rooms">${places.number_rooms} Bedroom</div>
                <div class="number_bathrooms">${places.number_bathrooms} Bathroom</div>
          </div>
          <div class="user">
                <b>Owner:</b> ${places.user.first_name } ${places.user.last_name}
              </div>
              <div class="description">
            ${places.description}
              </div>
          </article>
        `;
        $('section.places').append(template);
      }
    }
  });
});
