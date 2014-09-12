class Restaurant < ActiveRecord::Base
  attr_accessible :lat, :lng, :name, :price, :user_id, :food_style, :description
  belongs_to :user
  has_many :reviews
  has_many :reservations
  has_many :chats
end
