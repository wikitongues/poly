require "rails_helper"

RSpec.describe Book, type: :model do
  it { should have_many :phrase_pairs }
  it { should belong_to :user }
  it { should validate_presence_of :user }

  scenario "destroys dependent phrase pairs when deleted" do
    book = create(:book_with_phrase_pairs)
    expect(book.phrase_pairs.count).to eq 3
    book.destroy
    expect(book.phrase_pairs.count).to eq 0
  end
end
