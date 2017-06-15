# Preview all emails at http://localhost:3000/rails/mailers/user_notifications
class UserNotificationsPreview < ActionMailer::Preview
  def welcome_new_user
    @user = User.first
    UserNotifications.welcome_new_user(to: 'poly@wikitongues.org', subject: 'Welcome to Poly!')
  end
end
