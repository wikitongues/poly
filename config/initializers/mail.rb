ActionMailer::Base.smtp_settings = {
  address: ENV['SPARKPOST_SMTP_HOST'],
  port: ENV['SPARKPOST_SMTP_PORT'],
  enable_starttls_auto: true,
  user_name: ENV['SPARKPOST_SMTP_USERNAME'],
  password: ENV['SPARKPOST_API_KEY'],
  authentication: 'login'
}

ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.default charset: 'utf-8'