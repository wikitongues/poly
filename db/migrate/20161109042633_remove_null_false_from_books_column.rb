class RemoveNullFalseFromBooksColumn < ActiveRecord::Migration
  def change
    change_column :books,  :status, :string, :null => true
  end
end
