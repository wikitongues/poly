class DashboardController < SecureController
  skip_after_action :verify_authorized, only: [:index]
  skip_after_action :verify_policy_scoped, only: [:index]

  def index
    @user = current_user
    @hashedEmail = Digest::MD5.hexdigest(@user.email)
    @books = Book
      .most_recent_with_content(@user.id)
      .map do |book|
        BookSerializer.new(book)
    end
    @authoredBooks = Book
      .where(user_id: @user)
      .order("created_at DESC")
      .map do |book|
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
  end

end
