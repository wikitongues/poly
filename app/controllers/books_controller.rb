class BooksController < ApplicationController
  def show
    @book = Book.find(params[:id])
    @dictionary = @book.dictionary
    @phrase_pairs = @dictionary.phrase_pairs
  end
end
