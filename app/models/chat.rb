class Chat < ActiveRecord::Base
  attr_accessible :message, :restaurant_id, :user_id
  belongs_to :user
  belongs_to :restaurant

end
