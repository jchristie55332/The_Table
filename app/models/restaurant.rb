class Restaurant < ActiveRecord::Base
  attr_accessible :lat, :lng, :name, :price
end
