class DashboardController < SecureController
  skip_after_action :verify_authorized, only: [:index]
  skip_after_action :verify_policy_scoped, only: [:index]

  def index
    @user = current_user
    @hashedEmail = Digest::MD5.hexdigest(@user.email)
    @books = Book.joins(:user).order("created_at DESC").limit(10).map do |book|
      BookSerializer.new(book)
    end
    @authoredBooks = Book
      .where(user_id: @user)
      .order("created_at DESC")
      .map do |book|
          BookSerializer.new(book)
    end
    @favorites = @user.favorites
      .order("created_at DESC")
      .map do |book|
          BookSerializer.new(book)
    end
  end

end
