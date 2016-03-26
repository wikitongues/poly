class Book < ActiveRecord::Base
  has_many :phrase_pairs, dependent: :destroy
end
