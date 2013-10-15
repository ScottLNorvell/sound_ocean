class AddAcessTokenToUser < ActiveRecord::Migration
  def change
  	add_column :users, :sc_access_token, :string
  end
end
