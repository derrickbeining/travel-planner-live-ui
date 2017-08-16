$(function loadTheThings () {

  const $hotelsDropdown = $("#hotel-choices");
  const $restaurantsDropdown = $("#restaurant-choices");
  const $activitiesDropdown = $("#activity-choices");

  hotels.forEach(hotel => {
    const hotelHTML = "<option>" + hotel.name + "</option>";
    $hotelsDropdown.append(hotelHTML);
  });
  restaurants.forEach(restaurant => {
    const restaurantHTML = "<option>" + restaurant.name + "</option>";
    $restaurantsDropdown.append(restaurantHTML);
  });
  activities.forEach(activity => {
    const activityHTML = "<option>" + activity.name + "</option>";
    $activitiesDropdown.append(activityHTML);
  });

  function makeItineraryItem(itinerarySelection) {
    return `<div class="itinerary-item">
        <span class="title">${itinerarySelection}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button> </div>`;
  }

  $("#options-panel").on("click", "button", event => {
    console.dir(event.target)
    const dataSource = $(event.target.dataset.source);
    const dataTarget = $(event.target.dataset.target);
    dataTarget.append(makeItineraryItem(dataSource.val()));
  });

  // Remove the hotel

  // Remove a restaurant

  // Remove an activity

  // Add a day

  // Remove a day

  // Switch days
});
