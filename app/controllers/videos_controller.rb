require 'csv'

class VideosController < ApplicationController
  def index
  	video_data = load_data
  	@videos = video_data[0..4]
  end

  private
  def load_data
  	data = []
	filename = 'archive/resources/video_data.csv'
	CSV.foreach(filename, :headers => true) do |row|
		data << row.to_hash
	end
	return data
  end
end
