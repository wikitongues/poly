# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#TODO: fix this. books now require a user
Book.create(title: "Intro to Afrikaans", description: "Afrikaans is spoken throughout South Africa and Namibia. The language is mainly derived from Dutch. However, most Afrikaans speakers in the workplace have some knowledge of English.", source_language:"English", target_language:"Afrikaans")
Book.create(title: "Visiting Ambrym Island, Daakaka style", description: "Learn how to navigate the local scene in one of the four languages of our beautiful Ambrym island.", source_language:"English", target_language:"Daakaka")

# Merges similar urls together based on author and date
archive_videos = Hash.new
File.foreach('./db/seed_data/archive_videos.txt') do |line|
    # Ignore non video or srt files
    unless line.strip.ends_with? '.mp4' or line.strip.ends_with? '.srt'
        next
    end

    # Determine type
    type = nil
    if line.strip.ends_with? '.mp4'
        type = '.mp4'
    else
        type = '.srt'
    end

    # Remove edge cases
    url = 'https://s3.amazonaws.com/wikitongues/poly-dropbox' + line
    temp = line.split('/')[2]
    if temp.nil?
        next
    end

    # Construct ID
    name = temp.split('_')[0].downcase
    date = /\d{8}/.match(temp).to_s
    id = name + '_' + date

    unless archive_videos.has_key?(id)
        archive_videos[id] = Hash.new
    end
    archive_videos[id][type] = url.strip
end

# Adds everything into the db
archive_videos.each do |k, v|
    unless v.length >= 1
        next
    end
    ArchiveVideo.create(video_id: k, video_url: v.fetch('.mp4', ''), srt_url: v.fetch('.srt', ''))
end
