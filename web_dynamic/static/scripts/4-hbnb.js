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
    url: URL,
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(myData),
    success: function (response) {
      /* console.log(response); */
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

  /*
   * 5. Filter places by Amenity
   */
  $('button').click(function (){
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      type: 'POST',
      data: JSON.stringify({'amenities': Object.keys(amenityID)}),
      dataType: 'json',
      contentType: 'application/json',
      success:  function (data) {
        for (let cont = 0; cont < data.length, cont++) {
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
        }      
      }
    });
});
