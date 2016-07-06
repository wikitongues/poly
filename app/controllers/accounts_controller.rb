class AccountsController < ApplicationController
  def show
    @user = User.find(params[:id])
    @hashedEmail = Digest::MD5.hexdigest(@user.email)
    @books = Book.where(user_id: @user)
    # if @user.present?
    #   @phrase_pairs = @user.phrase_pairs
    #   authorize @user
    # else
    #   skip_authorization
    #   redirect_to root_path
    # end
  end

end
