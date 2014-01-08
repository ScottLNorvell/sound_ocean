class SongsController < ApplicationController

  def discover
    if user_signed_in?
    	song = Song.find_by_sc_track_id(params[:sc_track_id])
      score = current_user.score
      playlist = current_user.playlists.first
      unless playlist
        playlist = current_user.playlists.create name: "#{current_user.username}'s playlist"
      end


    	if song 
    		song.increment(:discoveries)
    		score += 1
        discovered = false
    	else
    		song = current_user.discoveries.create params[:song]
    		score += 10
        discovered = true
    	end

      unless playlist.songs.include? song 
        playlist.songs << song
      end

      current_user.update_attributes score: score 

      resp = {success: 'yay', song: song, user_score: score, dicovered: discovered }

    	render json: resp
    else
      p params
      render json: {success: 'yay', song: params[:song]}
    end
    
  end

end