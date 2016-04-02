class Book < ActiveRecord::Base
  has_many :phrase_pairs, dependent: :destroy
  belongs_to :user

  validates :user, presence: true
end
