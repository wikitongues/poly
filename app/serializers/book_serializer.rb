class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :source_language, :target_language, :created_at, :phrase_pairs

  belongs_to :user
end
