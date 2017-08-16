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
      position: latLng
    });
    marker.setMap(currentMap);
    return marker;
  }

  // drawMarker('hotel', [40.705137, -74.007624])
  // drawMarker('restaurant', [40.705137, -74.013940])
  // drawMarker('activity', [40.716291, -73.995315])

  ////////////////////////////////////////////////////////////////////
  // UI CODE HERE /////////////////////////////////////////////////////

  // DATA ///////////////////////////////////////

  const $optionsPanel = $("#options-panel");
  const $hotelsDropdown = $("#hotel-choices");
  const $restaurantsDropdown = $("#restaurant-choices");
  const $activitiesDropdown = $("#activity-choices");
  const $itineraryPanel = $("#itinerary-panel");
  const $dayButtons = $("#day-buttons");
  const $places = {
    $hotels: $hotelsDropdown,
    $restaurants: $restaurantsDropdown,
    $activities: $activitiesDropdown
  };
  const places = {
    hotel: hotels,
    restaurant: restaurants,
    activity: activities
  };

  // MODELS ////////////////////////////////////////////////////


  const dayModel = {
    hotel: undefined,
    restuarant: [],
    activity: []
  }
  const itineraryByDay = [dayModel];

  let currentDay = 1;
  // const model = {
  //   name: 'whatevs',
  //   placeId: 4,
  //   coords: [],
  //   mapMarker: <markerRef>,
  // }

  // UTILITIES ////////////////////////////////////////////////////
  // adds day model to itinerary by day array
    function addNewDayInstance (){
      itineraryByDay.push(dayModel);
      return itineraryByDay.length;
    }

  // loads dummy data into select/options lists
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

  function makeItineraryItem(type, name, id) {
    return `<div  id="${type}${id}" class="itinerary-item">
        <span class="title" data-place-id="${id}" data-place-type="${type}">${name}</span><button class="btn btn-xs btn-danger remove btn-circle" data-target="#${type}${id}">x</button> </div>`;
  }

  function addItemToItinerary(selection) {
    const currentDay = itineraryByDay[currentDay];
    const { placeId, placeType } = selection[0].selectedOptions[0].dataset;
    const coords = places[placeType].find(place => {
      return place.id === Number(placeId);
    }).place.location;
    const mapMarker = drawMarker(placeType, coords);
    const itineraryItem = {
      id: placeId,
      name: selection.val(),
      coordinates: coords,
      mapMarker: mapMarker
    };

    if (!currentDay[placeType]) {
      //TODO: complete this
      if (placeType !== "hotel") {
        currentDay[placeType] = [itineraryItem];
      } else {
        currentDay[placetype] = itineraryItem;
      }
    } else if (Array.isArray(currentDay[placeType])) {
      if (currentDay[placeType].length >= 3) return;
      else currentDay[placeType].push(itineraryItem);
    } else {
      return;
    }

    $(`#${placeType}-itinerary`).append(
      makeItineraryItem(placeType, selection.val(), placeId)
    );
  }

  function updateCurrentDay() {}

  // EVENT HANDLING ///////////////////////////////////////////

  // add place to map and itinerary panel when "+" is clicked
  $optionsPanel.on("click", "button", event => {
    const dataSource = $(event.target.dataset.source);
    const dataTarget = $(event.target.dataset.target);
    const { placeId, placeType } = dataSource[0].selectedOptions[0].dataset;
    const location = places[placeType].find(place => {
      return place.id === Number(placeId);
    }).place.location;
    drawMarker(placeType, location);
    dataTarget.append(
      makeItineraryItem(placeType, dataSource.val(), placeId, location)
    );
  });

  // remove itinerary item
  $("#itinerary-panel").on("click", "button", event => {
    $(event.target.dataset.target).remove();
  });





  function makeNewDayButton(dayNumber) {
    return `<button class="btn btn-circle day-btn current-day">${dayNumber}</button> `
  }

  $('#plus-button').on("click", function (event) {
    $('#day-buttons').append(makeNewDayButton(addNewDayInstance()));
  })

  $('#day-buttons').on("click", function(event){
    currentDay = Number.parseInt(event.target.innerText) - 1
    // console.log(event.target)
    const currentDayModel = itineraryByDay[currentDay]
    const hotel = currentDayModel.hotel;
    const restaurant = currentDayModel.restuarant;
    const activity = currentDayModel.activity;
    // const {hotel, restaurant, activity} = currentDayModel
    if (hotel) {
      $('#hotel-itinerary').append(makeItineraryItem("hotel", hotel.name, hotel.id))
    }
    restaurant.forEach(function(restaurant){
      $('#restaurant-itinerary').append(makeItineraryItem("restaurant", restaurant.name, restaurant.id))
    })
    activity.forEach(function(activity){
      $('#activity-itinerary').append(makeItineraryItem("activity", activity.name, activity.id))
    })
  })
});
