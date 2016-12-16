require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of :username }
  it { should validate_uniqueness_of :username }
  it { should have_many :books }
  it { should have_many :favorite_books }
  it { should have_many :favorites }

  scenario "gives a list of authored books, with newest books appearing first" do
    user = create(:user)
    oldest_book = create(:book, user: user)
    middle_book = create(:book, user: user)
    newest_book = create(:book, user: user)
    extra_book = create(:book)

    authored_books = user.authored_books
    expect(authored_books).not_to include(extra_book)
    expect(authored_books).to eq([newest_book, middle_book, oldest_book])
  end
end
