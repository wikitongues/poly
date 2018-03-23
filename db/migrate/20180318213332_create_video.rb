class CreateVideo < ActiveRecord::Migration
  def change
    create_table :videos, :id=>false do |t|
      t.integer :id
      t.string :video_url
      t.string :srt_url
    end
  end
end
