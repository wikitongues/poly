class ChangeAdminColumnOnUser < ActiveRecord::Migration
  def change
    change_column :users, :admin, :boolean, :default=>false, :null=>false
  end
end
