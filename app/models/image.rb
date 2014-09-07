class Image < ActiveRecord::Base
  belongs_to :user

  attr_accessible :description, :name, :upload_description, :user_id, :picture

  mount_uploader :picture, PictureUploader
end
