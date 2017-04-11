class HomeController < ApplicationController

  def index
    @books = Book.all.order("created_at DESC").map do |book|
      BookSerializer.new(book)
    end

    @users = User.all

    if current_user
      redirect_to '/dashboard'
    end

  end
end