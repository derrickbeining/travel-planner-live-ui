$(function loadTheThings () {

  const $hotelsDropdown = $('#hotel-choices');
  const $restaurantDropdown = $('#restaurant-choices');
  const $activitiesDropdown = $('#activity-choices');

  hotels.forEach(hotel => {
    const hotelHTML = '<option>' + hotel.name + '</option>';
    $hotelsDropdown.append(hotelHTML);
  })
  restaurants.forEach(restaurant => {
    const restaurantHTML = '<option>' + restaurant.name + '</option>';
    $restaurantDropdown.append(restaurantHTML);
  })
  activities.forEach(activity => {
    const activityHTML = '<option>' + activity.name + '</option>';
    $activitiesDropdown.append(activityHTML);
  })



})
