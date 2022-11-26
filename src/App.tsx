import { useRef, useState } from "react";


type ITask = {
  id: number;
  task: string;
  done: boolean;
}

function App() {
  const [tarefas, setTarefas] = useState<ITask[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const criarTarefa = () => {
    if (inputRef.current) {
      setTarefas([
        { id: Math.random(), task: inputRef.current.value, done: false },
        ...tarefas
      ]);

      inputRef.current.value = '';
    }
  };

  const doneTask = (id: number) => {
    setTarefas(tarefas.map((e) => ({
      id: e.id,
      task: e.task,
      done: e.id === id ? !e.done : e.done
    })))
  };

  const deleteTask = (id: number) => {
    setTarefas(tarefas.filter((e) => e.id !== id))
  };


  return (
    <div className="min-h-screen bg-slate-700 flex items-center justify-center px-6">
      <div className="bg-slate-200 p-4 rounded-lg flex flex-col gap-4 w-full max-w-lg">
        <h1>Tarefas:</h1>
        {tarefas.length > 0 && <div className="bg-slate-700 p-2 rounded-md flex flex-col gap-4 max-h-80 overflow-auto">
          {tarefas.map((e) =>
            <div className="bg-slate-200 rounded-md p-2 flex justify-between items-center" key={e.id}>
              <span className={e.done ? "line-through font-bold" : ""}>{e.task}</span>
              <div className="flex">
                <button onClick={() => doneTask(e.id)} className={e.done ? "bg-emerald-800" : "bg-slate-800"}>Done</button>
                <button onClick={() => deleteTask(e.id)} className="bg-red-800 ml-3">Delete</button>
              </div>
            </div>
          )}
        </div>}
        <form onSubmit={(e) => {
          e.preventDefault();
          criarTarefa();
        }} className="flex flex-col gap-4">
          <input ref={inputRef} maxLength={32} required type="text" />
          <button className="bg-emerald-800">Criar Tarefa</button>
        </form>
      </div>
    </div>
  )
}

export default App
