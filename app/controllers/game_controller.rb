class GameController < ApplicationController

  def index
    
  end

  def get_songs
  	# start = Time.new
		client = SoundCloud.new(client_id: ENV['SOUND_OCEAN_SC_CLIENT_ID'])

		tracks = client.get('/tracks', genres: params[:genre], filter: 3, order: 'created_at', limit: 50)
		tracks = tracks.select do |track| 
			track['playback_count'] != nil
		end
		# tracks.playback_count.delete_if { |k, v| v.empty? }
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
		# binding.pry
		render json: tracks
  end




end