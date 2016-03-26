class AddLanguagesToBooks < ActiveRecord::Migration
  def change
    add_column :books, :source_language, :string
    add_column :books, :target_language, :string
  end
end
