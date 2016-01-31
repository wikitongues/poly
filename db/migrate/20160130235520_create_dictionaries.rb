class CreateDictionaries < ActiveRecord::Migration
  def change
    create_table :dictionaries do |t|
      t.belongs_to :book, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
