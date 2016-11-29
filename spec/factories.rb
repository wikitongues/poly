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

    factory :book_with_phrase_pairs do
      transient do
        pair_count 3
      end

      after(:create) do |book, evaluator|
        create_list(:phrase_pair, evaluator.pair_count, books: [book])
      end
    end
  end

  factory :phrase_pair do
    book
    source_phrase "fortuna audaces iuvat"
    target_phrase "fortune favors the bold"
  end

  #favorite books as join table between user and book, only have IDs

  #create user with multiple books
  #create user with favorite books
  #create mulitple books (by default will need to create users )
end
