class PhraseSerializer < ActiveModel::Serializer
  attributes :id, :source_phrase, :target_phrase, :created_at, :book_id

  belongs_to :book
end
