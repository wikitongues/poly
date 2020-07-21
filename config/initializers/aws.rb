Aws.config.update({
  region: ENV['AWS_REGION'],
  credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY']),
})

RECORDED_VIDEOS_S3_BUCKET = Aws::S3::Resource.new.bucket(ENV['RECORDED_VIDEOS_S3_BUCKET'])