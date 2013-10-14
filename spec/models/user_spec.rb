require "spec_helper"

describe User do
	
	before { @user = User.create email: 'test@example.com', username: 'Joe The Burger' }

	subject { @user }

	it { should respond_to(:email) }
	it { should respond_to(:username) } 
	it { should respond_to(:soundcloud_id) }
	it { should respond_to(:score) } 
	it { should respond_to(:discovered_songs) }   

	it { should be_valid } 

end