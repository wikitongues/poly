# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#TODO: fix this. books now require a user
Book.create(title: "Intro to Afrikaans", description: "Afrikaans is spoken throughout South Africa and Namibia. The language is mainly derived from Dutch. However, most Afrikaans speakers in the workplace have some knowledge of English.", source_language:"English", target_language:"Afrikaans")
Book.create(title: "Visiting Ambrym Island, Daakaka style", description: "Learn how to navigate the local scene in one of the four languages of our beautiful Ambrym island.", source_language:"English", target_language:"Daakaka")
