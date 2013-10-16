class SongsController < ApplicationController

  def discover
  	song = Song.find(params[:sc_track_id])
  	if song 
  		song.discoveries.increment
  	else
  		song = current_user.discoveries.create params[:song]
  	end

  	render json: song 
    
  end

end