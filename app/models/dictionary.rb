class Dictionary < ActiveRecord::Base
    belongs_to :book
    has_many :phrase_pairs
end