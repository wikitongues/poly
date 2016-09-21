class SearchesController < ApplicationController
  # Janky
  def search
    query = "%#{params[:query].downcase}%"
    @books = Book.where("source_language like ?", query)
    @books += Book.where("target_language like ?", query)
    @books = @books.sort_by{|book| book.created_at}.reverse
    render 'home/index'
  end
end
