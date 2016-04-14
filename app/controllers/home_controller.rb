class HomeController < ApplicationController

  def index
    @books = Book.all
    @users = User.all
  end

end