class SourcePhrase < ActiveRecord::Base
    belongs_to :dictionary
    has_many :target_phrases
end