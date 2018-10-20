class Book < ActiveRecord::Base

  has_many :phrase_pairs, dependent: :destroy

  belongs_to :user

  validates :user, presence: true
  validates_presence_of :title, :source_language, :target_language

  after_create :send_admin_notification
  self.per_page = 10

  def self.most_recent_with_content(current_user_id = nil, page = 1)
    where
      .not(user_id: current_user_id)
      .joins(:phrase_pairs)
      .uniq
      .includes(:user)
      .order("created_at DESC")
      .paginate(:page => page)
  end

  def send_admin_notification
    AdminNotifications.new_book_email(self).deliver_now if Rails.env.production?
  end

  def children?
    phrase_pairs.any?
  end

end
