module LanguageNameHelper
  def iso_code_or_unknown(language_name)
    unk = '???'
    language_name ? (language_name.iso6933 ? language_name.iso6933.code : unk ) : unk
  end
end
