class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    if user.role? :admin
      can :manage, :all
    elsif user.role? "manager"
      can [:create, :update, :read], [Restaurant, Images, Review]
      can :manage, Reservation
    else
      can :read, :all
    end
  end
end