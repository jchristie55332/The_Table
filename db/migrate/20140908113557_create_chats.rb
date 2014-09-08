class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.string :message
      t.string :user_id
      t.string :restaurant_id

      t.timestamps
    end
  end
end
