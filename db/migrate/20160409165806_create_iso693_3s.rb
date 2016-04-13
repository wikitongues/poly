class CreateIso6933s < ActiveRecord::Migration
  def change
    create_table :iso6933s do |t|
      t.string :code, limit: 3

      t.timestamps null: false
    end

    add_index :iso6933s, :code
  end
end
