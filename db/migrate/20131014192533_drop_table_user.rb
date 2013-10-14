class DropTableUser < ActiveRecord::Migration
  def up
    drop_table :users
  end

  def down
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password
      t.string :password_confirmation

      t.timestamps
    end
  end
end
