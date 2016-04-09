require "csv"

lines = CSV.read "/Users/rjara/Downloads/just-langs-lang-names.csv"

CSV do |out|
  out << %w[ iso_693-3 common_name ]
  lines.each.with_index do |line,i|
    iso_code = line[0]
    names = line[1]
    if names then
      names.split(", ").each do |name|
        out << [iso_code, name]
      end
    else
      STDERR.puts "line #{i}: #{line.join(",")}"
    end
  end
end
