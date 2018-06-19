class AddSourceLanguageIdToBooks < ActiveRecord::Migration
  def change
    add_column :books, :source_language_id, :string
  end
end
