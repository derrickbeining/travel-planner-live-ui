$(function loadTheThings () {

    const $hotelsDropdown = $('#hotel-choices');
    const $restaurantsDropdown = $('#restaurant-choices');
    const $activitiesDropdown = $('#activity-choices');

    hotels.forEach(hotel => {
      const hotelHTML = '<option>' + hotel.name + '</option>';
      $hotelsDropdown.append(hotelHTML);
    })
    restaurants.forEach(restaurant => {
      const restaurantHTML = '<option>' + restaurant.name + '</option>';
      $restaurantsDropdown.append(restaurantHTML);
    })
    activities.forEach(activity => {
      const activityHTML = '<option>' + activity.name + '</option>';
      $activitiesDropdown.append(activityHTML);
    })

    function makeItineraryItem (itinerarySelection){
      return `<div class="itinerary-item">
        <span class="title">${itinerarySelection}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button> </div>`}

// Select and set the hotel
$('#add-hotel').on('click', function(event){
  $('#hotel-itinerary').append(makeItineraryItem($hotelsDropdown.val()));
})

// Select and add a restaurant
$('#add-restaurant').on('click', function(event){
  $('#restaurant-itinerary').append(makeItineraryItem($restaurantsDropdown.val()));
})
// Select and add an activity
$('#add-activity').on('click', function(event){
  $('#activity-itinerary').append(makeItineraryItem($activitiesDropdown.val()));
})
// Remove the hotel

// Remove a restaurant

// Remove an activity

// Add a day

// Remove a day

// Switch days
})
