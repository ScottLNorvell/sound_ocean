require "spec_helper"

describe User do
  
  before do 
   @user = User.create email: 'test@example.com', username: 'Joe The Burger', password: "makethislonger", password_confirmation: "makethislonger", score: 1.0 
 end

  subject { @user }

  it { should respond_to(:email) }
  it { should respond_to(:username) } 
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) } 
  it { should respond_to(:score) }
  #omniauth attribuates
  # it { should respond_to(:omniauthable) }
  # 
  it { should respond_to(:discoveries)}
  
  # it { should_not be_admin } 

end