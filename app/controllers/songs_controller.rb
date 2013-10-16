class SongsController < ApplicationController
<<<<<<< HEAD
  
  def discover
    if song = Song.find_by_sc_track_id(params[:sc_track_id])
      song.discoveries.increment
    else
      song = current_user.discoveries.create(params[:song])
    end

    render :json => song
=======

  def discover
  	song = Song.find_by_sc_track_id(params[:sc_track_id])
  	if song 
  		song.discoveries.increment
  		current_user.score += 1
  	else
  		song = current_user.discoveries.create params[:song]
  		curre
  	end

  	render json: song 
    
>>>>>>> 3ca5f980936c14c9ebc42802e3fbe18737f12647
  end

end