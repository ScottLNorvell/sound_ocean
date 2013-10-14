class Song < ActiveRecord::Base
  attr_accessible :artist, :discoveries, :genre, :sc_track_id, :title
end
