class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :genre
      t.string :sc_track_id
      t.integer :discoveries
      t.string :artist

      t.timestamps
    end
  end
end
