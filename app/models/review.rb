class Review < ActiveRecord::Base
  attr_accessible :restaurant_id, :review, :title, :user_id
  belongs_to :user
  belongs_to :restaurant
end
