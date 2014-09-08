class Restaurant < ActiveRecord::Base
  attr_accessible :lat, :lng, :name, :price, :user_id
  belongs_to :user
end
