class CreateFavoriteBooks < ActiveRecord::Migration
  def change
    create_table :favorite_books do |t|
      t.integer :book_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
