require "test_helper"

class TarefasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tarefa = tarefas(:one)
  end

  test "should get index" do
    get tarefas_url, as: :json
    assert_response :success
  end

  test "should create tarefa" do
    assert_difference("Tarefa.count") do
      post tarefas_url, params: { tarefa: { custo: @tarefa.custo, data_conclusao: @tarefa.data_conclusao, data_inicio: @tarefa.data_inicio, nome: @tarefa.nome, status: @tarefa.status } }, as: :json
    end

    assert_response :created
  end

  test "should show tarefa" do
    get tarefa_url(@tarefa), as: :json
    assert_response :success
  end

  test "should update tarefa" do
    patch tarefa_url(@tarefa), params: { tarefa: { custo: @tarefa.custo, data_conclusao: @tarefa.data_conclusao, data_inicio: @tarefa.data_inicio, nome: @tarefa.nome, status: @tarefa.status } }, as: :json
    assert_response :success
  end

  test "should destroy tarefa" do
    assert_difference("Tarefa.count", -1) do
      delete tarefa_url(@tarefa), as: :json
    end

    assert_response :no_content
  end
end
