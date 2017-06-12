class AdminNotifications < ApplicationMailer

  def new_user_email(user)
    @user = user
    mail(to: 'poly@wikitongues.org', subject: 'New user: '+@user.username)
  end

  def new_book_email(book)
    @book = book
    mail(to: 'poly@wikitongues.org', subject: 'New book: '+@book.title)
  end
end
