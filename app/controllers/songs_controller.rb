class SongsController < ApplicationController

  def discover
  	song = Song.find_by_sc_track_id(params[:sc_track_id])
  	if song 
  		song.discoveries.increment
  		current_user.score += 1
  	else
  		song = current_user.discoveries.create params[:song]
  		current_user.score += 10
  	end

  	render json: song 
    
  end

end