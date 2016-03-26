class PhrasePairsController < ApplicationController

  def create
    dictionary = Dictionary.find(params[:dictionary_id])
    if dictionary.phrase_pairs.create(create_params)
      render json: {}, status: :ok
    else
      render json: {}, status: 422
    end
  end

  private

  def create_params
    params.require(:phrase_pair).permit(:target_phrase, :source_phrase)
  end
end