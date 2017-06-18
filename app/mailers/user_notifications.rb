class UserNotifications < ApplicationMailer
  def welcome_new_user(user)
    @user = user
    mail(to: user.email, subject: "Welcome to Poly, "+@user.username+"!")
  end
end
