class PhrasePairPolicy < ApplicationPolicy
  def destroy?
    record.book.user_id == user.id
  end

  def update?
    record.book.user_id == user.id
  end
end