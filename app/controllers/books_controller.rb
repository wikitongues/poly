class BooksController < AuthenticatedController
  skip_before_action :redirect_unless_user_signed_in, only: [:show]

  def show
    @book = Book.find(params[:id])
    if @book.present?
      @phrase_pairs = @book.phrase_pairs
      @source_language_name = @book.source_language_name
      @target_language_name = @book.target_language_name
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
    params = create_or_update_params
    source, target = find_or_create_language_names_from_params!(params)

    book = current_user.books.create(params)
    book.source_language_name = source
    book.target_language_name = target
    book.save
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
      params  = create_or_update_params
      source, target = find_or_create_language_names_from_params!(params)

      book.source_language_name = source
      book.target_language_name = target
      book.update_attributes(params)
      book.save
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

  #mutates params
  def find_or_create_language_names_from_params!(params)
    source = LanguageName.find_or_create!(params[:source_language])
    target = LanguageName.find_or_create!(params[:target_language])
    params.delete(:source_language)
    params.delete(:target_language)
    [source, target]
  end
end
