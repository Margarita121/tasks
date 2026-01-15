import { markTaskDone } from './taskService';
import type { Task } from './types';

type TaskTableProps = {
  tasks: Task[];
};

async function clickEvent(nr: string) {
  await markTaskDone(nr);
  window.location.reload();
}

export function TaskTable({ tasks }: TaskTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Kategorija</th>
          <th>Kas jādara</th>
          <th>Datums</th>
          <th>Ik pēc</th>
          <th>To do?</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.nr}>
            <td>{task.kategorija}</td>
            <td>{task.kas_jadara}</td>
            <td>{task.datums}</td>
            <td>{task.ik_pec_dienas}</td>
            <td>{task.to_do}</td>
            <td>
              <button id={task.nr} type="button" onClick={() => clickEvent(task.nr)}>
                {' '}
                Done{' '}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
