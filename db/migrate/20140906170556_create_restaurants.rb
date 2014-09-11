class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name
      t.float :lng
      t.float :lat
      t.integer :price
      t.string :food_style
      t.text :description

      t.timestamps
    end
  end
end
