class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation, :username
end
