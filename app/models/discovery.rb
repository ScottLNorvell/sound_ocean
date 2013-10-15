class Discovery < ActiveRecord::Base
  attr_accessible :discoverer_id
  # we add class name so that rails will infur that follower = a user_id
  belongs_to :discoverer, class_name: "User"
  # Validations for presence!
  validates :discoverer_id, presence: true
end