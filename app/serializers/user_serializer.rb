class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :username, :admin

  has_many :favorite_books
  has_many :books
end
