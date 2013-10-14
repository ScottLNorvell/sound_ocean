class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.float :score

      t.timestamps
    end
  end
end
