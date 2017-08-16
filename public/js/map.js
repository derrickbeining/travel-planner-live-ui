$(function initializeMap() {
  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [
    {
      featureType: "landscape",
      stylers: [{ saturation: -100 }, { lightness: 60 }]
    },
    {
      featureType: "road.local",
      stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: "on" }]
    },
    {
      featureType: "transit",
      stylers: [{ saturation: -100 }, { visibility: "simplified" }]
    },
    {
      featureType: "administrative.province",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "water",
      stylers: [{ visibility: "on" }, { lightness: 30 }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ef8c25" }, { lightness: 40 }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#b6c54c" }, { lightness: 40 }, { saturation: -40 }]
    }
  ];

  var mapCanvas = document.getElementById("map-canvas");

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: "/images/lodging_0star.png",
    restaurant: "/images/restaurant.png",
    activity: "/images/star-3.png"
  };

  function drawMarker(type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng,
    });
    marker.setMap(currentMap);
    return marker
  }

  // drawMarker('hotel', [40.705137, -74.007624])
  // drawMarker('restaurant', [40.705137, -74.013940])
  // drawMarker('activity', [40.716291, -73.995315])

  ////////////////////////////////////////////////////////////////////
  // UI CODE HERE /////////////////////////////////////////////////////


  // DATA ///////////////////////////////////////

  const $optionsPanel =  $("#options-panel")
  const $hotelsDropdown = $("#hotel-choices");
  const $restaurantsDropdown = $("#restaurant-choices");
  const $activitiesDropdown = $("#activity-choices");
  const $itineraryPanel = $('#itinerary-panel')
  const $dayButtons = $('#day-buttons')
  const $places = {
    $hotels: $hotelsDropdown,
    $restaurants: $restaurantsDropdown,
    $activities: $activitiesDropdown
  };
  const places = {
    hotel: hotels,
    restaurant: restaurants,
    activity: activities
  }




  // MODELS ////////////////////////////////////////////////////

  const iteneraryByDay = [ {} ]; //

  // UTILITIES ////////////////////////////////////////////////////

  // loads dummy data into <select> <options> lists
  function createOptionsList(DOMParent, arrOfPlaces, placeType) {
    arrOfPlaces.forEach(place => {
      const html = `<option data-place-id="${place.id}" data-place-type="${placeType}" data-place-location="${place
        .place.location}">${place.name}</option>`;
        DOMParent.append(html);
      });
    }

    // setup
    createOptionsList($hotelsDropdown, hotels, "hotel");
    createOptionsList($restaurantsDropdown, restaurants, "restaurant");
    createOptionsList($activitiesDropdown, activities, "activity");

  function makeItineraryItem(type, name, id, location) {
    return `<div  id="${type}${id}"  class="itinerary-item">
        <span class="title" data-place-id="${id}" data-place-type="${type}">${name}</span><button class="btn btn-xs btn-danger remove btn-circle" data-target="#${type}${id}">x</button> </div>`;
  }

  function addItemToItenerary (type, name, id, location, mapMarker) {
     iteneraryByDay[ iteneraryByDay.length ]
  }

  // EVENT HANDLING ///////////////////////////////////////////

  // add place to map and itinerary panel when "+" is clicked
  $optionsPanel.on("click", "button", event => {
    const dataSource = $(event.target.dataset.source);
    const dataTarget = $(event.target.dataset.target);
    const { placeId, placeType } = dataSource[0].selectedOptions[0].dataset;
    const location = places[ placeType ].find(place => {
      return place.id === Number(placeId)
    }).place.location
    drawMarker(placeType, location);
    dataTarget.append(makeItineraryItem(placeType, dataSource.val(), placeId, location)
    );
  });

  // remove itinerary item
  $("#itinerary-panel").on("click", "button", event => {
    $(event.target.dataset.target).remove()
  });


});
