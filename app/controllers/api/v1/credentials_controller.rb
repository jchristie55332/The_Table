module Api::V1
  class CredentialsController < ApiController
    doorkeeper_for :all

    respond_to :json

    def me
      respond_with current_resource_owner
    end

    def reservations
      @restaurant = Restaurant.find(current_resource_owner.restaurant_id)
      @reservations = Reservation.where(restaurant_id: @restaurant.id)
      respond_with @reservations
    end

  end
end
