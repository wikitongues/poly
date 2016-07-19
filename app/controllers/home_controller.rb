class HomeController < ApplicationController

  def index
    @books = Book.all.order("created_at DESC")
    @users = User.all
  end

end