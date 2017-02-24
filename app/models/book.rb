class Book < ActiveRecord::Base

  has_many :phrase_pairs, dependent: :destroy

  belongs_to :user

  validates :user, presence: true

  after_create :send_admin_notification
  def send_admin_notification
    AdminNotifications.new_book_email(self).deliver
  end

end
