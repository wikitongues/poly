require "rails_helper"

RSpec.describe FavoriteBook, type: :model do
  it { should belong_to :book }
end
