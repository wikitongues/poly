class RemoveLanguageIdColumnsFromBook < ActiveRecord::Migration
  def change
    remove_column :books, :source_language_id, :string
    remove_column :books, :target_language_id, :string
  end
end
