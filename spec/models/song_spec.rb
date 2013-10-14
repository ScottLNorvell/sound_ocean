require "spec_helper"

describe Song do
	
	before { @song = Song.create title: 'Toxic', artist: 'Britney Spears', sc_track_id: 115301957 }

	subject { @song }

	it { should respond_to(:title) }
	it { should respond_to(:artist) } 
	it { should respond_to(:sc_track_id) }
	it { should respond_to(:discoverer_id) } 
	it { should respond_to(:discoveries) } 
	 

	it { should be_valid } 

end