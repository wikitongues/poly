class SearchesController < ApplicationController
  # Janky
  def search
    @query = params[:q]

    if params[:q].length > 0
      q = "%#{params[:q].downcase}%"
      @sourceLanguage = Book.where("source_language like ?", q).sort_by{|book| book.created_at}
      .reverse
        .map do |book|
          BookSerializer.new(book)
        end

      @targetLanguage = Book.where("target_language like ?", q).sort_by{|book| book.created_at}
        .reverse
        .map do |book|
          BookSerializer.new(book)
        end

      render 'search/index'

    else
      redirect_to '/'
    end

  end
end
