class AdminController < ApplicationController
  def show
    @books = Book.includes(:user).order("created_at DESC").limit(20).map do |book|
      BookSerializer.new(book)
    end

    @users = User.includes(:books).order("created_at DESC").map do |user|
      UserSerializer.new(user)
    end

    @currentUser = current_user

    unless current_user.try(:admin?)
      redirect_to '/dashboard'
    end
  end
end