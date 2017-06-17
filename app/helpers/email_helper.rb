module EmailHelper
  def email_image_tag(image, **options)
    attachments[image] = {
        :data => File.read(Rails.root.join("app/assets/images/#{image}")),
        :mime_type => "image/#{image.split('.').last}"
    }
    image_tag attachments[image].url, **options
  end
end


