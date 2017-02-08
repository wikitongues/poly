class RemoveColumnFromBook < ActiveRecord::Migration
  def change
    remove_column :books, :videoDescription, :string
    add_column :books, :video_description, :string
  end
end
