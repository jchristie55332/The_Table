class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :name
      t.string :upload_description
      t.string :description
      t.belongs_to :user

      t.timestamps
    end
  end
end
