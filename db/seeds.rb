# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
r = Restaurant.create(name: "St James's Hotel", lng: -0.14028, lat: 51.506159, price: 40, food_style: "cuisine", description: "In Seven Park Place William Drabble has created his own inimitable style menu, influenced by classic French cuisine but made using the best British ingredients and taking inspiration from the seasons.  Of course, like any great chef, William has his signature dishes, poached native lobster tail with cauliflower purée and lobster butter sauce springs to mind, but his continuing love of good food ensures that each dish he creates is as exquisite as the next.", user_id: 1, city: "London"),
r1 = Restaurant.create(name: "Criterion Restaurant", lng: -0.134091, lat: 51.509704, price: 40, food_style: "cuisine", description: "The Criterion, situated in the heart of Piccadilly Circus, is an elegant and breathtakingly beautiful restaurant. Originally opened in 1874, the Grade II listed lavish space has undergone a gentle and sympathetic restoration of its spectacular interiors, adding warmth and softness to the space.", user_id: 1, city: "London")