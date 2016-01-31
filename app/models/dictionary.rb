class Dictionary < ActiveRecord::Base
    belongs_to :book
    has_many :source_phrases
    has_many :target_phrases, through: :source_phrases
end