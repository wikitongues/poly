class BooksController < AuthenticatedController
  skip_before_action :redirect_unless_user_signed_in, only: [:show]

  def show
    @users=User.all
    @book = Book.find(params[:id])
    if @book.present?
      @phrase_pairs = @book.phrase_pairs
      authorize @book
    else
      skip_authorization
      redirect_to root_path
    end
  end

  def new
    book = current_user.books.new
    authorize book
  end

  def create
    book = current_user.books.create(create_or_update_params)
    if book.present?
      authorize book
      render json: { id: book.id }, status: :ok
    else
      skip_authorization
      render json: { errors: book.errors.messages }, status: 422
    end
  end

  def destroy
    book = Book.find(params[:id])
    if book.present?
      authorize book
      book.destroy
      render json: {}, status: :ok
    else
      skip_authorization
      render json: { errors: book.errors.messages }, status: 422
    end
  end

  def update
    book = Book.find(params[:id])
    authorize book
    if book.present?
     authorize book
     book.update_attributes(create_or_update_params)
      render json: {}, status: :ok
    else
      skip_authorization
      render json: { errors: book.errors.messages }, status: 422
    end
  end

  private

  def create_or_update_params
    params.require(:book).permit(
      :title,
      :description,
      :source_language,
      :target_language
    )
  end
end
