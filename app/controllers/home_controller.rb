class HomeController < ApplicationController

  def index
    @books = Book.all
  end

end