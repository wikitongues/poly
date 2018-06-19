require 'csv'

class VideosController < ApplicationController
  def index
  	video_data = load_data
    @videos = video_data[0..35]
  end

  def show
    @video = get_by_id(params[:id])
    @video_url = get_video_url(params[:id])
    render 'video'
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
    # The quotes in "IDv2" below don't come from the keyboard - they are
    # unicode quotation marks. Typing a double quote in their place
    # will not work!
    line = load_data.find { |row| row["﻿IDv2"] == id }
    line
  end

  def get_video_url(id)
    name = id.split('_')[0].downcase
    date = /\d{8}/.match(id).to_s
    data = ArchiveVideo.where(:video_id => name + '_' + date)
    return data.first
  end
end
