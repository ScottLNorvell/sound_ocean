class ChangeDataTypeForUid < ActiveRecord::Migration
  def up
  	remove_column :users, :uid
  	add_column :users, :uid, :integer
  end

  def down
  	add_column :users, :uid, :string
  	remove_column :users, :uid
  end
end
