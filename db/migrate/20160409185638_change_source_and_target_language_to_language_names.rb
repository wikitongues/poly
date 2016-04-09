class ChangeSourceAndTargetLanguageToLanguageNames < ActiveRecord::Migration
  def find_by_name(name)
    Language_name.find_by_name name
  end

  def change
    reversible do |dir|
      dir.up {
        add_column :books, :source_language_name_id, :integer
        add_column :books, :target_language_name_id, :integer

        Book.all do |book|
          lang_name = find_by_name book.source_language
          if lang_name then
            book.source_language_name = lang_name
            book.save
          end

          lang_name = find_by_name book.target_language
          if lang_name then
            book.target_language_name = lang_name
            book.save
          end
        end

        remove_column :books, :source_language
        remove_column :books, :target_language
      }

      dir.down {
        add_column :books, :source_language
        add_column :books, :target_language

        Book.all do |book|
          lang_name = Book.source_language_name.name
          if lang_name then
            book.source_language = lang_name
            book.save
          end

          lang_name = book.target_language_name.name
          if lang_name then
            book.target_language = lang_name
            book.save
          end
        end

        remove_column :books, :source_language_name_id, :integer
        remove_column :books, :target_language_name_id, :integer
      }
    end
  end
end
