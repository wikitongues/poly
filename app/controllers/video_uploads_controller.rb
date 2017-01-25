class VideoUploadsController < AuthenticatedController

  def presigned_url
    skip_authorization
    s3_object = RECORDED_VIDEOS_S3_BUCKET.object(filename)
    url = URI.parse(s3_object.presigned_url(:put))
    render json: { url: url.to_s, object_key: s3_object.key }
  end

  private

  def filename
    #uuid to ensure uniqueness
    params.require(:filename) + SecureRandom.uuid
  end
end