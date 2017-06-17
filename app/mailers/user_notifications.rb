class UserNotifications < ApplicationMailer
  def welcome_new_user(user)
    @user = user
    mail(to: 'poly@wikitongues.org', subject: 'New user: '+@user.username)
    # UserNotifications.welcome_new_user(to: 'poly@wikitongues.org', subject: 'Welcome to Poly!')
  end
end
