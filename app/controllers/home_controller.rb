class HomeController < ApplicationController

  def index
    @books = Book.joins(:user, :phrase_pairs).where.not(phrase_pairs: {id: nil}).order("created_at DESC").limit(10).map do |book|
        BookSerializer.new(book)
    end

    if current_user
      redirect_to '/dashboard'
    end
  end
end
