class CreateSourcePhrases < ActiveRecord::Migration
  def change
    create_table :source_phrases do |t|
      t.belongs_to :dictionary, index: true, foreign_key: true
      t.string :text

       t.timestamps null: false
    end
  end
end
