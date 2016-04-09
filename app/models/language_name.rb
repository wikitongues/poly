class LanguageName < ActiveRecord::Base
  belongs_to :iso6933

  def self.find_or_create!(name)
    instance = self.find_by_name name
    unless instance.present?
      instance = self.create(name: name)
      instance.save
    end
    instance
  end

end
