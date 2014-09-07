class Image < ActiveRecord::Base
  belongs_to :user

  attr_accessible :description, :name, :upload_description, :user_id, :picture

  mount_uploader :picture, PictureUploader

  def picture_name
    File.basename(picture.path || picture.filename) if picture
  end

  def enqueue_picture
    PictureWorker.perform_async(id, key) if key.present?
  end

  class PictureWorker
  include Sidekiq::Worker
      
  def perform(id, key)
    image = Image.find(id)
    image.key = key
    image.remote_picture_url = image.picture.direct_fog_url(with_path: true)
    image.save!
    image.update_column(:picture_processed, true)
    end
  end
end
