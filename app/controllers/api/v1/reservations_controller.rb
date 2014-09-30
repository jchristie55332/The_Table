module Api::V1
  class ReservationsController < ApiController
    doorkeeper_for :all
    respond_to :json

    def index
      current_user = User.find(doorkeeper_token.resource_owner_id)
      @restaurant = Restaurant.find(current_user.restaurant_id)
      @reservations = Reservation.  where(restaurant_id: @restaurant.id)
      respond_with @reservations
    end
  end
end