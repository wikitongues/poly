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

    @favorites = @user.favorites
      .order("created_at DESC")
      .map do |book|
          BookSerializer.new(book)
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
