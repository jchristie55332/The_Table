class MessagesController < ApplicationController

  def create
    @user = User.find(params[:user_id])
    @restaurant = Restaurant.find(params[:restaurant_id])
    @content = params[:content]
    UserMailer.email_confirmation(@user, @restaurant, @content).deliver
    redirect_to restaurant_path(@restaurant)
  end

end