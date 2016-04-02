class BookPolicy < ApplicationPolicy

  def show?
    true
  end

  def new?
    user.present?
  end

  def create?
    user.present?
  end

  def destroy?
    record.user_id == user.id
  end

  def update?
    record.user_id == user.id
  end
end