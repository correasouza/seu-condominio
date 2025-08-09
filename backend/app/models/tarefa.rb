class Tarefa < ApplicationRecord
    enum :status, { concluido: 0, pendente: 1, andamento: 2 }

    validates :nome, :data_inicio, :data_conclusao, :custo, :status, presence: true
end
