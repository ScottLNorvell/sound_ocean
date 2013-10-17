class SongsController < ApplicationController

  def discover
  	song = Song.find_by_sc_track_id(params[:sc_track_id])
    score = current_user.score
  	if song 
  		song.increment(:discoveries)
  		score += 1
      discovered = false
  	else
  		song = current_user.discoveries.create params[:song]
  		score += 10
      discovered = true
  	end

    current_user.update_attributes score: score 

    resp = {success: 'yay', song: song, user_score: score, dicovered: discovered }

  	render json: resp
    
  end

end