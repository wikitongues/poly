class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])

    @hashedEmail = Digest::MD5.hexdigest(@user.email)

    @books = Book.includes(:user).order("created_at DESC").limit(10).map do |book|
      BookSerializer.new(book)
    end

    @authoredBooks = @user.authored_books.map do |book|
      BookSerializer.new(book)
    end

    @favorites = FavoriteBook
      .where(user_id: @user)
      .order("created_at DESC")
      .map do |fav_book|
        begin
          book = Book.find(fav_book.book_id)
          BookSerializer.new(book)
        rescue
          fav_book.destroy
        end
    end

    # if @user.present?
    #   @phrase_pairs = @user.phrase_pairs
    #   authorize @user
    # else
    #   skip_authorization
    #   redirect_to root_path
    # end
  end

end
