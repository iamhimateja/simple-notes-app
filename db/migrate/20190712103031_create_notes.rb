class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :body
      t.timestamps
    end
    add_index :notes, :title, unique: true
    add_reference :notes, :user, foreign_key: true
  end
end
