class AccountController < SecureController
  skip_after_action :verify_authorized, only: [:index]
  skip_after_action :verify_policy_scoped, only: [:index]

  def index
    @user = current_user
    @hashedEmail = Digest::MD5.hexdigest(@user.email)
        @books = Book
        .where(user_id: @user)
        .order("created_at DESC")
        .map do |book|
            BookSerializer.new(book)
        end
    # if @user.present?
    #   @phrase_pairs = @user.phrase_pairs
    #   authorize @user
    # else
    #   skip_authorization
    #   redirect_to root_path
    # end
  end

end
