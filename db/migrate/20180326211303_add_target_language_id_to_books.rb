class AddTargetLanguageIdToBooks < ActiveRecord::Migration
  def change
    add_column :books, :target_language_id, :string
  end
end
