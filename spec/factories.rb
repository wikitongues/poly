FactoryGirl.define do
  factory :archive_video do
    
  end
  factory :user do
    sequence(:username) { |n| "username#{n}"}
    sequence(:email) { |n| "person#{n}@example.com"}
    password "password"
  end

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
end
