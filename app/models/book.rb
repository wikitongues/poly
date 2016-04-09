class Book < ActiveRecord::Base
  has_many :phrase_pairs, dependent: :destroy
  belongs_to :user
  belongs_to :source_language_name, class_name: "LanguageName"
  belongs_to :target_language_name, class_name: "LanguageName"

  validates :user, presence: true
end
