class Iso6933 < ActiveRecord::Base
  has_many :language_names

  validates :code, presence: true, length: { is: 3 }
  validates_uniqueness_of :code
  before_save :downcase_code

  def downcase_code
    self.code.downcase!
  end

end
