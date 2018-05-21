require 'rubygems'
require 'json'
require 'net/http'
class BooksController < AuthenticatedController
  skip_before_filter :authenticate_user!, only: [:show, :show_more]

  def show
    @users=User.all
    @book = Book.find(params[:id])
    if current_user
      @serialized_current_user = UserSerializer.new(current_user).as_json
    end
    if @book.present?
      @phrase_pairs = @book.phrase_pairs.order("created_at ASC")
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
    book = current_user.books.build(create_or_update_params)

    book = fill_language_id(book)

    if book.present? && book.save
      authorize book
      render json: { id: book.id }, status: :ok
    else
      skip_authorization
      render json: { errors: book.errors.full_messages }, status: 422
    end
  end

  def destroy
    book = Book.find(params[:id])
    if book.present?
      authorize book
      book.destroy

      # Also destroy FavoriteBook records of this book
      FavoriteBook.where(book_id: params[:id])
        .map do |fav_book|
          fav_book.destroy
        end

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
     book.assign_attributes(create_or_update_params)
     book = fill_language_id(book)
     if book.save
      render json: {}, status: :ok
     else
      render json: { errors: book.errors.full_messages }, status: 422
     end
    else
      skip_authorization
      render json: { errors: book.errors.messages }, status: 422
    end
  end

  def favorite
    type = params[:type]
    if type == "favorite"
      current_user.favorites << @recipe
      redirect_to :back, notice: 'You favorited #{@recipe.name}'

    elsif type == "unfavorite"
      current_user.favorites.delete(@recipe)
      redirect_to :back, notice: 'Unfavorited #{@recipe.name}'

    else
      redirect_to :back, notice: 'Nothing happened.'
    end
  end

  def show_more
    skip_authorization
    page = params[:page]

    books = Book
      .most_recent_with_content(page)
      .map do |book|
        BookSerializer.new(book)
    end

    render json: books, status: 200
  end

  def fill_language_id(book)
    # when the source_language_id is not set, try to auto-fill it
    if book.source_language_id.length == 0
      res_id = id_check(book.source_language)
      if res_id != nil
        book.source_language_id = res_id
      end
    end

    # when the target_language_id is not set, try to auto-fill it
    if book.target_language_id.length == 0
      res_id = id_check(book.target_language)
      if res_id != nil
        book.target_language_id = res_id
      end
    end

    return book
  end

  # given a identifier string, get the language ID
  # only returns an ID if the verbatim search returns exactly one result
  def id_check(input_lang)
    # TODO do not hard-code this URL, move to a config constant
    url_string = 'http://localhost:6543/search?q=' + input_lang + '&whole=true';
    uri = URI(url_string);
    result = Net::HTTP.get_response(uri);
    json_obj = JSON.parse(result.body);
    parsed_result = (json_obj != nil && json_obj.length == 1) ? json_obj[0]['glottocode'] : nil
    return parsed_result;
  end

  private

  def create_or_update_params
    params.require(:book).permit(
      :title,
      :description,
      :video_description,
      :source_language,
      :target_language,
      :source_language_id,
      :target_language_id,
    )
  end
end
