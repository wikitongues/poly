class CreateArchiveVideos < ActiveRecord::Migration
  def change
    create_table :archive_videos do |t|
      t.string :video_id
      t.string :video_url
      t.string :srt_url
    end
  end
end
