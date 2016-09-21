class CreateFavoriteBooks < ActiveRecord::Migration
  def change
    create_table :favorite_books do |t|
      t.integer :book_id
      t.integer :user_id

      t.timestamps null: false
    end

    drop_table :favorites
    drop_table :favorite_projects
  end
end
