class Book < ActiveRecord::Base
  before_validation :clean_language_names

  has_many :phrase_pairs, dependent: :destroy

  belongs_to :user

  validates :user, presence: true

  private
    def clean_language_names
      source_language.downcase! if source_language
      target_language.downcase! if target_language
    end

end
