class PlaylistsController < ApplicationController
  
  def show
	if user_signed_in?
		playlist = current_user.playlists.first
		if playlist
			@songs = playlist.songs
		else
			render json: {crap: 'oops'}
		end
	else
		redirect_to root_path
	end	  
  end
end
