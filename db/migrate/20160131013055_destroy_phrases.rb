class DestroyPhrases < ActiveRecord::Migration
  def change
    drop_table :target_phrases
    drop_table :source_phrases
  end
end
