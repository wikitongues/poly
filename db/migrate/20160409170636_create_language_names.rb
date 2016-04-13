class CreateLanguageNames < ActiveRecord::Migration
  def change
    create_table :language_names do |t|
      t.string :name
      t.belongs_to :iso6933, index: true

      t.timestamps null: false
    end
  end
end
