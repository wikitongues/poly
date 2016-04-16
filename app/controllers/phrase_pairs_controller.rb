class PhrasePairsController < AuthenticatedController

  def create
    book = Book.find(params[:book_id])
    if book.present?
      authorize book
      book.phrase_pairs.create(create_or_update_params)
      render json: {}, status: :ok
    else
      skip_authorization
      render json: {}, status: 422
    end
  end

  def destroy
    phrase_pair = PhrasePair.find(params[:id])
    if phrase_pair.present?
      authorize phrase_pair
      phrase_pair.destroy!
      render json: { id: params[:id] }, status: :ok
    else
      skip_authorization
      render json: {}, status: 422
    end
  end

  def update
    phrase_pair = PhrasePair.find(params[:id])
    if phrase_pair.present?
      authorize phrase_pair
      phrase_pair.update_attributes(create_or_update_params)
       render json: {}, status: :ok
    else
      skip_authorization
      render json: {}, status: 422
    end
  end

  def index
    book = Book.find(params[:book_id])
    
    if book.present?
      authorize book
      phrase_pairs = book.phrase_pairs.all
      render json: {phrasePairs: phrase_pairs}, status: :ok
    else
      skip_authorization
      render json: {}, status: 422
    end
  end

  private

  def create_or_update_params
    params.require(:phrase_pair).permit(:target_phrase, :source_phrase)
  end
end