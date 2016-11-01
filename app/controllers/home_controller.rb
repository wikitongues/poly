class HomeController < ApplicationController

  def index
    @books = Book.all
      .where(status:"public")
      .order("created_at DESC").map do |book|
      BookSerializer.new(book)
    end
    @users = User.all

    if current_user
      redirect_to '/dashboard'
    end

  end
end