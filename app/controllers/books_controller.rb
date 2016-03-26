class BooksController < ApplicationController
  def show
    @book = Book.find(params[:id])
    @phrase_pairs = @book.phrase_pairs
  end

  def new
    @book = Book.new
  end
end
