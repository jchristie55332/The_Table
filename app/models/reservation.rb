class Reservation < ActiveRecord::Base
  attr_accessible :date, :restaurant_id, :start_time, :user_id, :seats

belongs_to :user
belongs_to :restaurant
end
