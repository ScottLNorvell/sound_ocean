require "spec_helper"

describe Playlist do
	
	before { @playlist = Playlist.create name: 'test playlist', user_id: 2 }

	subject { @playlist }

	it { should respond_to(:name) }
  it { should respond_to(:user_id) }  
	it { should respond_to(:songs) }  

	it { should be_valid } 

end
