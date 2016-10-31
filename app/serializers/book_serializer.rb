class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :source_language, :target_language, :created_at, :status

  belongs_to :user
end
