import { getAllTasks } from './taskService';
import { TaskTable } from './taskTable';
import type { Task } from './types';
import { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks().then(data => {
      setTasks(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>To do mājās</h1>
      <TaskTable tasks={tasks} />
    </div>
  );
};
export default App;
