class Book < ActiveRecord::Base
  has_one :dictionary
end
