class Book < ActiveRecord::Base

  has_many :phrase_pairs, dependent: :destroy

  belongs_to :user

  validates :user, presence: true

  after_create :send_admin_notification

  def self.most_recent_with_content(limit = 10)
    joins(:phrase_pairs)
      .uniq
      .includes(:user)
      .order("created_at DESC")
      .limit(limit)
  end

  def send_admin_notification
    AdminNotifications.new_book_email(self).deliver
  end

  def children?
    phrase_pairs.any?
  end

end
