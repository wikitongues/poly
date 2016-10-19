class Book < ActiveRecord::Base
  belongs_to :user

  has_many :phrase_pairs, dependent: :destroy

  # has_many :favorited_by, through: :favorite_books, source: :user

  validates :user, presence: true
end
