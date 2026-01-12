import type { Task } from './types';

type TaskTableProps = {
  tasks: Task[];
};

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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
