class AddColumnToBook < ActiveRecord::Migration
  def change
    add_column :books, :videoDescription, :string
  end
end
