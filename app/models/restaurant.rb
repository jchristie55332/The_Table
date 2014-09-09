class Restaurant < ActiveRecord::Base
  attr_accessible :lat, :lng, :name, :price, :user_id
  belongs_to :user
  has_many :reservations
  has_many :chats
end
