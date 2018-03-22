require 'csv'

class VideosController < ApplicationController
  def index
  	video_data = load_data
  	@videos = video_data[0..4]
  end

  def show
    debugger
    @video = get_by_id(:id)
  end

  def create
    redirect_to :video => :id
  end

  private
  def load_data
  	data = []
	  filename = 'archive/resources/video_data.csv'
    CSV.foreach(filename, :headers => true) do |row|
	      data << row.to_hash
       end
	  data
  end

  def get_by_id(id)
    filename = 'archive/resources/video_data.csv'
    contents = File.read(filename)
    parsed_contents = CSV.parse(contents, :headers => true)
    row = parsed_contents.find { |row| row['IDv2'] == id }
    row
  end
end
