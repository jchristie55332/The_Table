class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name
      t.float :lng
      t.float :lat
      t.string :price

      t.timestamps
    end
  end
end
