class AdminController < ApplicationController
  def show
    @books = Book.includes(:user).order("created_at DESC").limit(20).map do |book|
      BookSerializer.new(book)
    end

    @booksCount = Book.count

    @users = User.includes(:books).order("created_at DESC").limit(20).map do |user|
      UserSerializer.new(user)
    end

    @usersCount = User.count

    @phrases = PhrasePair.includes(:book).order("created_at DESC").limit(20).map do |phrase|
      PhraseSerializer.new(phrase)
    end

    @phrasesCount = PhrasePair.count

    @currentUser = current_user

    unless current_user.try(:admin?)
      redirect_to '/dashboard'
    end
  end
end