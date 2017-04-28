class HomeController < ApplicationController

  def index
    @books = Book.includes(:user).order("created_at DESC").limit(10).map do |book|
      BookSerializer.new(book)
    end

    if current_user
      redirect_to '/dashboard'
    end
  end
end
