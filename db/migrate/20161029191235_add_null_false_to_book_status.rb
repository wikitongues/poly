class AddNullFalseToBookStatus < ActiveRecord::Migration
  def change
    change_column :books, :status, :string, null: false
  end
end
