class CreatePhrasePairs < ActiveRecord::Migration
  def change
    create_table :phrase_pairs do |t|
      t.belongs_to :dictionary, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
