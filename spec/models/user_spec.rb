require 'rails_helper'

RSpec.describe User do
  it { should validate_presence_of(:username) }
  it { should validate_uniqueness_of(:username) }
  it { should have_many(:books) }
  it { should have_many(:favorite_books) }
  it { should have_many(:favorites) }
end
