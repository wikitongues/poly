class RemoveDictionaries < ActiveRecord::Migration
  def up
    add_column :phrase_pairs, :book_id, :integer, null: false
    add_index :phrase_pairs, :book_id
    remove_column :phrase_pairs, :dictionary_id

    drop_table :dictionaries
  end

  def down
    create_table :dictionaries do |t|
      t.belongs_to :book, index: true, foreign_key: true

      t.timestamps null: false
    end

    add_column :phrase_pairs, :dictionary_id, :integer, null: false
    add_index :phrase_pairs, :dictionary_id
    remove_column :phrase_pairs, :book_id
  end
end
