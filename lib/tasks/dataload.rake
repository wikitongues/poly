require "csv"

namespace :dataload do
  desc "load 693-3 iso codes and various language names into the db"
  task load_iso_names: :environment do
    datafile = File.join Rails.root, "data", "iso693-3-names.csv"
    CSV.open(datafile, 'r') do |lines|
      lines.each.with_index do |line,i|
        iso_code = line[0]
        iso = Iso6933.create(code: iso_code)
        names = line[1]
        if names then
          names.split(", ").each do |name|
            iso.language_names.create(name: name)
          end
        else
          raise "unparsable line #{i + 1}: #{line.join(",")}"
        end
      end
    end

  end
end
