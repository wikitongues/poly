class SearchesController < ApplicationController
  # Janky
  def search
    @query = params[:q]

    if params[:q].length > 0
      q = params[:q].downcase
      glottocode = params[:glottocode]

      # guess the glottocode if it is not set
      if glottocode.length == 0
        res_id = id_check(q)
        if res_id != nil
          glottocode = res_id
        end
      end

      if glottocode.length > 0
        @language = Book.all.select{ |book| book if q == book.source_language.downcase || q == book.target_language.downcase || q == book.title.downcase || glottocode == book.target_language_id || glottocode == book.source_language_id}.sort_by{|book| book.created_at}
          .reverse
          .map do |book|
            BookSerializer.new(book)
          end
      else
        @language = Book.all.select{ |book| book if q == book.source_language.downcase || q == book.target_language.downcase || q == book.title.downcase}.sort_by{|book| book.created_at}
          .reverse
          .map do |book|
            BookSerializer.new(book)
          end
      end

      @user = User.all.select{ |user| user if are_close?(q, user.username.downcase) }.sort_by{|user| user.created_at}
        .reverse
        .map do |user|
          UserSerializer.new(user)
        end

      # @phrase = PhrasePair.where("source_phrase || target_phrase ilike ?", q).sort_by{|phrasePair| phrasePair.created_at}
      #   .reverse
      #   .map do |phrase|
      #     PhraseSerializer.new(phrase)
      #   end

      render 'search/index'

    else
      redirect_to '/'
    end

  end

  private
    # TODO this function copied from books_controller. put in a helper class
    # given an identifier string, get the language ID
    # only returns an ID if the verbatim search returns exactly one result
    def id_check(input_lang)
      # TODO do not hard-code this URL, move to a config constant
      url_string = 'http://localhost:6543/search?q=' + input_lang + '&whole=true'
      uri = URI(url_string)
      result = Net::HTTP.get_response(uri)
      json_obj = JSON.parse(result.body)
      parsed_result = (json_obj != nil && json_obj.length == 1) ? json_obj[0]['glottocode'] : nil
      return parsed_result
    end
    #Damerau–Levenshtein distance algorithm (https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance)
    def are_close?(q, target)

      # Initialization for the algorithm
      query_length = q.length
      target_length = target.length

      char_dictionary = {}

      distance_2d_array = Array.new(query_length+1){Array.new(target_length+1){0}}

      for i in 0..query_length do
        distance_2d_array[i][0] = i
      end

      for j in 0..target_length do
        distance_2d_array[0][j] = j
      end

      # Populate a dictionary with alphapets of the two strings
      q.each_char{ |char| char_dictionary[char] = 0 }
      target.each_char{ |char| char_dictionary[char] = 0 }

      #Determine substring distances
      for i in 1..query_length do
        db = 0
        for j in 1..target_length do
          i1 = char_dictionary[target[j-1]]
          j1 = db
          cost = 0

          if q[i-1] == target[j-1]
            db = j
          else
            cost = 1
          end

          distance_2d_array[i][j] = [
            distance_2d_array[i][j-1] + 1, #insertion
            distance_2d_array[i-1][j] + 1, #deletion
            distance_2d_array[i-1][j-1] + cost #substitution
          ].min

          if i1 > 0 && j1 > 0
            distance_2d_array[i][j] = [
              distance_2d_array[i][j],
              distance_2d_array[i1-1][j1-1] + (i-i1-1) + (j-j1-1) + 1
            ].min #transposition
          end
        end

        char_dictionary[q[i-1]] = i
      end

      # You can change 'desired_distance' value so that catching more results will happen
      desired_distance = 4

      return distance_2d_array[query_length][target_length] <= desired_distance
    end
end
