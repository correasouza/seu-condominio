class Tarefa < ApplicationRecord
    enum :status, { concluido: 0, pendente: 1, andamento: 2 }

    validates :nome, :data_inicio, :data_conclusao, :custo, :status, presence: true

    validates :data_conclusao, comparison: { greater_than_or_equal_to: :data_inicio }

    validates :nome, length: { in: 3..60, message: "O nome precisa ter entre 3 e 60 caracteres." }

end
