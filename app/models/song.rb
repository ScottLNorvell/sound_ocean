class Song < ActiveRecord::Base
  attr_accessible :artist, :discoveries, :genre, :sc_track_id, :title, :discoverer_id


  belongs_to :discoverer, class_name: "User"
  has_and_belongs_to_many :playlists
end
