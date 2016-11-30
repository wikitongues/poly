FactoryGirl.define do
  factory :user do
    sequence(:username) { |n| "username#{n}"}
    sequence(:email) { |n| "person#{n}@example.com"}
    password "password"
  end

  #users have many books

  factory :book do
    sequence(:title) { |n| "Great Title #{n}" }
    source_language "hebrew"
    target_language "greek"
    user

    factory :book_with_phrase_pairs, parent: :book do |book|
      phrase_pairs { build_list :phrase_pair, 3}
    end
  end

  factory :phrase_pair do
    book
    source_phrase "fortuna audaces iuvat"
    target_phrase "fortune favors the bold"
  end

  #favorite books as join table between user and book, only have IDs
  #create user with favorite books
end
