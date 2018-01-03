class HomeController < ApplicationController

  def index
    @books = Book
      .most_recent_with_content
      .map do |book|
        BookSerializer.new(book)
    end

    if current_user
      redirect_to '/dashboard'
    end
  end
end
