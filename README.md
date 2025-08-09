# Seu Condomínio

Essa API gerencia as tarefas do sistema, permitindo criar, listar, visualizar, atualizar e deletar tarefas.

---

## Endpoints

### Listar todas as tarefas

* **URL:** `/tarefas`
* **Método:** `GET`
* **Descrição:** Retorna uma lista de todas as tarefas cadastradas.
* **Resposta de sucesso:**

  * Código HTTP: `200 OK`
  * Corpo: JSON com array das tarefas

```json
[
  {
    "id": 1,
    "nome": "Exemplo de tarefa",
    "data_inicio": "2025-08-10",
    "data_conclusao": "2025-08-15",
    "custo": 150.0,
    "status": "0",
    "created_at": "2025-08-01T12:00:00Z",
    "updated_at": "2025-08-01T12:00:00Z"
  },
  ...
]
```

---

### Obter uma tarefa específica

* **URL:** `/tarefas/:id`
* **Método:** `GET`
* **Parâmetros de URL:**

  * `id` — ID da tarefa que deseja buscar
* **Descrição:** Retorna os dados da tarefa especificada pelo ID.
* **Resposta de sucesso:**

  * Código HTTP: `200 OK`
  * Corpo: JSON com os dados da tarefa

```json
{
  "id": 1,
  "nome": "Exemplo de tarefa",
  "data_inicio": "2025-08-10",
  "data_conclusao": "2025-08-15",
  "custo": 150.0,
  "status": "2",
  "created_at": "2025-08-01T12:00:00Z",
  "updated_at": "2025-08-01T12:00:00Z"
}
```

* **Resposta de erro:**

  * Código HTTP: `404 Not Found` se a tarefa não existir.

---

### Criar uma nova tarefa

* **URL:** `/tarefas`
* **Método:** `POST`
* **Corpo da requisição (JSON):**

```json
{
  "tarefa": {
    "nome": "Nova tarefa",
    "data_inicio": "2025-08-10",
    "data_conclusao": "2025-08-15",
    "custo": 200.0,
    "status": "2"
  }
}
```

* **Descrição:** Cria uma nova tarefa com os dados fornecidos.
* **Resposta de sucesso:**

  * Código HTTP: `201 Created`
  * Corpo: JSON com os dados da tarefa criada
  * Header `Location`: URL da nova tarefa criada
* **Resposta de erro:**

  * Código HTTP: `422 Unprocessable Entity`
  * Corpo: JSON com mensagens de erro de validação

---

### Atualizar uma tarefa existente

* **URL:** `/tarefas/:id`
* **Método:** `PUT` ou `PATCH`
* **Parâmetros de URL:**

  * `id` — ID da tarefa que deseja atualizar
* **Corpo da requisição (JSON):**

```json
{
  "tarefa": {
    "nome": "Nome atualizado",
    "data_inicio": "2025-08-11",
    "data_conclusao": "2025-08-20",
    "custo": 250.0,
    "status": "1"
  }
}
```

* **Descrição:** Atualiza os dados da tarefa especificada pelo ID.
* **Resposta de sucesso:**

  * Código HTTP: `200 OK`
  * Corpo: JSON com os dados atualizados da tarefa
* **Resposta de erro:**

  * Código HTTP: `422 Unprocessable Entity`
  * Corpo: JSON com mensagens de erro de validação
  * Código HTTP: `404 Not Found` se a tarefa não existir.

---

### Deletar uma tarefa

* **URL:** `/tarefas/:id`
* **Método:** `DELETE`
* **Parâmetros de URL:**

  * `id` — ID da tarefa que deseja remover
* **Descrição:** Remove a tarefa especificada.
* **Resposta de sucesso:**

  * Código HTTP: `204 No Content` (sem corpo)
* **Resposta de erro:**

  * Código HTTP: `404 Not Found` se a tarefa não existir.

---

## Parâmetros aceitos para criação e atualização

| Campo            | Tipo    | Obrigatório | Descrição                                                            |
| ---------------- | ------- | ----------- | -------------------------------------------------------------------- |
| `nome`           | String  | Sim         | Nome da tarefa                                                       |
| `data_inicio`    | Date    | Sim         | Data de início da tarefa                                             |
| `data_conclusao` | Date    | Sim         | Data de conclusão da tarefa                                          |
| `custo`          | Decimal | Sim         | Custo estimado da tarefa                                             |
| `status`         | Enum    | Sim         | Status atual da tarefa (ex: "pendente", "em andamento", "concluída") |

---

## Observações importantes

* Para os endpoints que exigem um ID, se o registro não existir, o servidor retornará erro 404.
* Para `POST` e `PUT/PATCH`, se os dados não passarem pelas validações do model, o servidor retornará erro 422 com as mensagens detalhadas.
* As datas devem estar no formato ISO 8601 (ex: `YYYY-MM-DD`).
