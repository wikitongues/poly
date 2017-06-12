class AdminController < ApplicationController
  def show
    @books = Book.includes(:user).order("created_at DESC").limit(10).map do |book|
      BookSerializer.new(book)
    end

    @users = User.includes(:books).order("created_at DESC").limit(10).map do |user|
      UserSerializer.new(user)
    end

    @currentUser = current_user
  end
end