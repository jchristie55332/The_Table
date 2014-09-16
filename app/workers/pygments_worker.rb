class PygmentsWorker
  include Sidekiq::Worker
  sidekiq_options retry: false
  
  def perform(user_id, reservation_id, restaurant_id)
    user = User.find(user_id)
    reservation = Reservation.find(reservation_id)
    restaurant = Restaurant.find(restaurant_id)
    TextMessage.new(restaurant).send
    UserMailer.registration_confirmation(user, reservation, restaurant).deliver
  end
end