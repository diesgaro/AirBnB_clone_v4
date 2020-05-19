$(document).ready(function () {
  let amenitiesId = [];
  fetchPlaces();
  /*
    Amenities selections
   */
  $('.amenities .popover ul li input').click(function () {
    amenitiesId = [];
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
   * Filter places by amenities
   */
  $('section.filters button').click(function () {
    /* console.log(amenitiesId); */
    fetchPlaces(amenitiesId);
  });

  /*
   * Functions
   */
  function fetchPlaces (amenitiesId = {}) {
    const URL = 'http://0.0.0.0:5001/api/v1/places_search/';
    amenitiesId = JSON.stringify({ amenities: amenitiesId });
    /* console.log(amenitiesId); */
    $.ajax({
      url: URL,
      type: 'post',
      contentType: 'application/json',
      data: amenitiesId,
      success: function (response) {
        /* console.log(response); */
        $('article').detach();
        $('div.placesh1 h2').text('We found ' + response.length + ' places for you');
        /* console.log(response.length); */
        $.each(response, function () {
          /* console.log(this); */
          const template = `
            <article>
              <div class="title_box">
                <h2>` + this.name + `</h2>
                <div class="price_by_night">$` + this.price_by_night + `</div>
              </div>
              <div class="information">
                <div class="max_guest">` + this.max_guest + ` Guest</div>
                <div class="number_rooms">` + this.number_rooms + ` Bedroom</div>
                <div class="number_bathrooms">` + this.number_bathrooms + ` Bathroom</div>
              </div>
              <div class="user">
                <b>Owner:</b> ` + userName(this.user_id) + `
              </div>
              <div class="description">` + this.description + `</div>
            </article>
          `;
          $('section.places').append(template);
        });
      }
    });
  }

  function userName (idUser) {
    let user = '';
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/users/' + idUser,
      dataType: 'json',
      async: false,
      success: function (data) {
        user = data.first_name + ' ' + data.last_name;
      }
    });
    /* console.log(user); */
    return user;
  }
});
