class SearchesController < ApplicationController
  # Janky
  def search
    q = "%#{params[:q].downcase}%"
    @books = Book.where("source_language like ?", q)
    @books += Book.where("target_language like ?", q)
    @books = @books.sort_by{|book| book.created_at}.reverse
    render 'home/index'
  end
end
