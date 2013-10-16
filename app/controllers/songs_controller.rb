class SongsController < ApplicationController
  
  def discover
    if song = Song.find_by_sc_track_id(params[:sc_track_id])
      song.discoveries.increment
    else
      song = current_user.discoveries.create(params[:song])
    end

    render :json => song
  end

end