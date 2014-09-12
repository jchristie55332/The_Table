class UserMailer < ActionMailer::Base
  default 

  def registration_confirmation(user, reservation, restaurant)
    @user = user
    @reservation = reservation
    @restaurant = restaurant
    mail(:from => user.email, :to => restaurant.user.email, :subject => "Reservation")
  end

  def email_confirmation(user, restaurant, content)
    @user = user
    @restaurant = restaurant
    @content = content
    mail(:from => user.email, :to => restaurant.user.email, :subject => user.username)
  end
end