Aws.config.update({
  region: 'us-east-1',
  credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY']),
})

RECORDED_VIDEOS_S3_BUCKET = Aws::S3::Resource.new.bucket(ENV['RECORDED_DOCUMENTS_S3_BUCKET'])

