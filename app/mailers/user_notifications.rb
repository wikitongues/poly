class UserNotifications < ApplicationMailer
  add_template_helper(EmailHelper)
  def welcome_new_user(user)
    @user = user
    mail(to: user.email, subject: "Welcome to Poly!")
  end
end
