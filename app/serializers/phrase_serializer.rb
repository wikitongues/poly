class PhraseSerializer < ActiveModel::Serializer
  attributes :id, :source_phrase, :target_phrase, :created_at

  belongs_to :book
end
