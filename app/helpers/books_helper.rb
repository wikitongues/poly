module BooksHelper
  #hack because running out of time on hackathon
  def book_props(book)
    {
      id: book.id,
      source_language: book.source_language_name.name,
      target_language: book.target_language_name.name,
      source_iso: iso_code_or_unknown(book.source_language_name),
      target_iso: iso_code_or_unknown(book.target_language_name),
      title: book.title
    }
  end
end
