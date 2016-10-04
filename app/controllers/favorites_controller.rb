class FavoritesController < SecureController

  def create
    book = Book.find(params[:book_id])
    #TODO: get this working correctly
    skip_policy_scope
    skip_authorization

    if book
      current_user.favorites << book
      render json: {}, status: :ok
    else
      render json: {}, status: 404
    end
  end

  def destroy
    favorite_book = Book.find(params[:id])

    #TODO: get this working correctly
    skip_policy_scope
    skip_authorization

    if favorite_book
      current_user.favorites.delete(favorite_book)
      render json: {}, status: :ok
    else
      render json: {}, status: 404
    end
  end
end
