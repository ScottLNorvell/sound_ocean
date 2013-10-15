require "spec_helper"

  # create_table "users", :force => true do |t|
  #   t.string   "email",                  :default => "", :null => false
  #   t.string   "encrypted_password",     :default => "", :null => false
  #   t.string   "reset_password_token"
  #   t.datetime "reset_password_sent_at"
  #   t.datetime "remember_created_at"
  #   t.integer  "sign_in_count",          :default => 0
  #   t.datetime "current_sign_in_at"
  #   t.datetime "last_sign_in_at"
  #   t.string   "current_sign_in_ip"
  #   t.string   "last_sign_in_ip"
  #   t.datetime "created_at",                             :null => false
  #   t.datetime "updated_at",                             :null => false
  #   t.string   "username"

describe User do
  
  before { @user = User.create email: 'test@example.com', username: 'Joe The Burger', password: "makethislonger", password_confirmation: "makethislonger", score: 1.0 }

  subject { @user }

<<<<<<< HEAD
	it { should respond_to(:email) }
	it { should respond_to(:username) } 
	it { should respond_to(:password) }
	it { should respond_to(:password_confirmation) } 
  # devise attributes
  it { should respond_to(:database_authenticatable) }   
  it { should respond_to(:registerable) }   
  it { should respond_to(:recoverable) }   
  it { should respond_to(:rememberable) }
  it { should respond_to(:trackable) }   
	it { should respond_to(:validatable) }
=======
  it { should respond_to(:email) }
  it { should respond_to(:username) } 
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) } 
  it { should respond_to(:score) }
>>>>>>> 6bc490414c6ecffcae112e610d73ec1de3428360
  #omniauth attribuates
  # it { should respond_to(:omniauthable) }

  it { should be_valid } 
  # it { should_not be_admin } 

end