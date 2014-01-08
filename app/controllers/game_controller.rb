class GameController < ApplicationController

  def index
    if user_signed_in?
    	playlist = current_user.playlists.first

    	if playlist 
    		@songs = playlist.songs
    	else
    		@songs = false
    	end

    @top_users = User.order('score desc limit 5')


    else
    	# redirect_to root_path
    end

  end

  def get_songs
		client = SoundCloud.new(client_id: ENV['SOUND_OCEAN_SC_CLIENT_ID'])

		tracks = client.get('/tracks', genres: params[:genre], filter: 3, order: 'created_at', limit: 50)
		tracks = tracks.select do |track| 
			track['playback_count'] != nil
		end
		tracks = tracks.sort_by {|track| track.playback_count}
		tracks = tracks.map do |track|
				{
					id: track["id"], 
					title: track['title'], 
					artist: track['user']['username'],
					genre: track['genre'],
					created_at: track['created_at'],
					playback_count: track['playback_count'],
					url: track['permalink_url']
				}
		end
		render json: tracks
  end

end