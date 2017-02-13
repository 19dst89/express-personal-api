console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  // display all places
  $("#places").click(function(){
    $("div.profile").remove();
    // console.log($('.places-wrapper').length);
    $.ajax({
      method: 'GET',
      url: '/api/places',
      data: 'json',
      success: onSuccessPlaces,
      error: onErrorPlaces
    })

    // ($('#nextractor').length < 0)


    function onSuccessPlaces(placesArray){
      placesArray.forEach(function(place){
        $(".places-wrapper").append(`
          <div class="places">
          <ul>
            <li>${place.city}, ${place.country}
              <ul>
                <li>${place.description}</li>
                <li><p> Year: ${place.yearWent}</p></li>
                <li><p>While living in ${place.homeCity}, ${place.homeCountry}</p></li>
              </ul>
            </li>
          </ul>
          </div>
        `);
      });
    }
    function onErrorPlaces(res){
      console.log("ERROR");
    }
  });

  // display my profile info
  $("#profile").click(function(){
    $("div.places").remove();
    $.ajax({
      method: 'GET',
      url: '/api/profile',
      data: 'json',
      success: onSuccessProfile,
      error: onErrorProfile
    })
    function onSuccessProfile(profileObject){
      $(".profile-wrapper").append(`
        <div class="profile col-md-6">
          <h3>${profileObject.name}</h3>
          <img class="img-responsive" src="${profileObject.githubProfileImage}">
        </div>
          <div class="col-md-6">
            <ul>
              <li>${profileObject.pets[0].name} my current ${profileObject.pets[0].type}</li>
              <li>${profileObject.pets[1].name} my parents ${profileObject.pets[1].type}</li>
              <li>${profileObject.pets[2].name} my parents ${profileObject.pets[3].breed} ${profileObject.pets[2].type}</li>
              <li>${profileObject.pets[3].name} my parents ${profileObject.pets[3].breed} ${profileObject.pets[3].type}</li>
            </ul>
          </div>
        `)
    }

    function onErrorProfile(res){
      console.log("ERROR");
    }
  })

});






















