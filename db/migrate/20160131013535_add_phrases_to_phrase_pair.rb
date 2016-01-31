class AddPhrasesToPhrasePair < ActiveRecord::Migration
  def change
    add_column :phrase_pairs, :source_phrase, :text, null: false
    add_column :phrase_pairs, :target_phrase, :text, null: false
  end
end
