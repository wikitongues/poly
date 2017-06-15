class UserNotifications < ApplicationMailer
  def welcome_new_user()
    @user = "User.first"
    UserNotifications.welcome_new_user(to: 'poly@wikitongues.org', subject: 'Welcome to Poly!')
  end
end
