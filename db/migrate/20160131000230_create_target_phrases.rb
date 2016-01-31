class CreateTargetPhrases < ActiveRecord::Migration
  def change
    create_table :target_phrases do |t|
      t.belongs_to :source_phrase, index: true, foreign_key: true
      t.string :text

      t.timestamps null: false
    end
  end
end
