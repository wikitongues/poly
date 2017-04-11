module ApplicationHelper
  def gravatarify(user)
    @hashedEmail = Digest::MD5.hexdigest(@user.email)
  end
end
