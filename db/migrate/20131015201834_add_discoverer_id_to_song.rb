class AddDiscovererIdToSong < ActiveRecord::Migration
  def change
    add_column :songs, :discoverer_id, :string
  end
end
