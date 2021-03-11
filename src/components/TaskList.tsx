import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // 1. Veririfcar se o input está vázio, se estiver retornar a função vazia.
    if (!newTaskTitle) return;
    // 2. Criar uma nova task com o id randomizado, com o novo título e o parâmetro do "checked"
    //    deve começar como falso (não tem como começar uma nova tarefa já compeltada).
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };
    // 3. Criar uma nova task dentro de todas as tasks, adicionando uma task ao final do vetor.
    setTasks((oldState) => [...oldState, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // 1. Fazer um mapeamento das tasks com o mesmo id da nova task, chechando se o "checked" é verdadeiro
    //    ou é falso. Após isso setar a acrescentar a nova task dentro das tasks.
    const newTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(newTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // 1. Filtrar todas as tasks com o id diferente para remover a que o id é igual a
    //    que foi utilizada como parâmetro de filtro.
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
