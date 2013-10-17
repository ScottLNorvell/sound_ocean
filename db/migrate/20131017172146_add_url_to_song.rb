class AddUrlToSong < ActiveRecord::Migration
  def change
  	add_column :songs, :url, :string
  end
end
