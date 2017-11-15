class AddNullConstrainToBookAttributesInBookTable < ActiveRecord::Migration
  def change
    change_column_null(:books, :title, false)
    change_column_null(:books, :source_language, false)
    change_column_null(:books, :target_language, false)
  end
end
