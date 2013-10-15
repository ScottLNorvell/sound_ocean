class AddAndRemoveDiscovererIdToSong < ActiveRecord::Migration
  def up
  	remove_column :songs, :discoverer_id
    add_column :songs, :discoverer_id, :integer
  end
  def down
  	remove_column :songs, :discoverer_id
    add_column :songs, :discoverer_id, :string
  end
end
