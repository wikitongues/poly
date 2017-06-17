# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment', __FILE__)
run Rails.application
Launchy.open("http://localhost:3000") if Rails.env.development?