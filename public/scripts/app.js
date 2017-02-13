console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: '/api/places',
    data: 'json',
    success: onSuccess,
        // function(json){
      // $(".places_wrapper").append(json);
      // console.log(json[0].city);
    // },
    error: onError
  })

    function onSuccess(json){
      json.forEach(function(place){
        $(".places-wrapper").append(`
          <ul>
            <li>${place.city}, ${place.country}
              <ul>
                <li>${place.description}</li>
                <li><p> Year: ${place.yearWent}</p></li>
                <li><p>While living in ${place.homeCity}, ${place.homeCountry}</p></li>
              </ul>
            </li>
          </ul>
        `);

      })
    }

    var onError = function(res){
      console.log("ERROR");
    }

  // $('.places_wrapper').append


});
