require 'rails_helper'

RSpec.describe User do
  fixtures :users, :books

  it { should validate_presence_of(:username) }
  it { should validate_uniqueness_of(:username) }
  it { should have_many(:books) }
  it { should have_many(:favorite_books) }
  it { should have_many(:favorites) }

  scenario "gives a list of authored books, with oldest books appearing first" do
    expect(users(:faulkner).authored_books).to eq([books(:absalom), books(:sound_fury), books(:august)])
  end
end
