require "rails_helper"

RSpec.describe Book, type: :model do
  it { should have_many :phrase_pairs }
  it { should belong_to :user }
  it { should validate_presence_of :user }

  scenario "cleans language names before validation" do
    book = build(:book,
                  source_language: "Hebrew",
                  target_language: "Greek")
    book.valid?
    expect(book.source_language).to eq "hebrew"
    expect(book.target_language).to eq "greek"
  end

  scenario "destroys dependent phrase pairs when deleted" do
    book = create(:book_with_phrase_pairs)
    expect(book.phrase_pairs.count).to eq 3
    book.destroy
    expect(book.phrase_pairs.count).to eq 0 
  end
end
