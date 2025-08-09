class CreateTarefas < ActiveRecord::Migration[8.0]
  def change
    create_table :tarefas do |t|
      t.string :nome
      t.date :data_inicio
      t.date :data_conclusao
      t.decimal :custo
      t.integer :status

      t.timestamps
    end
  end
end
