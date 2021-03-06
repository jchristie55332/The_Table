module Api::V1
  class ReservationsController < ApiController
    doorkeeper_for :all
    respond_to :json

    def index
      @restaurant = Restaurant.find(current_resource_owner.restaurant_id)
      @reservations = Reservation.  where(restaurant_id: @restaurant.id)
      respond_with @reservations
    end
  end
end