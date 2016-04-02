class AuthenticatedController < ApplicationController
  include Pundit

  before_action :redirect_unless_user_signed_in
  after_action :verify_authorized

  private

  def redirect_unless_user_signed_in
    redirect_to root_path unless current_user
  end
end