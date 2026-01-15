import axios from 'axios';
import type { Task } from './types';

export const getAllTasks = async () => {
  const response = await axios.get<Task[]>('/api/tasks');
  return response.data;
};

export const markTaskDone = async (nr: string) => {
  const data = { id: `D${parseInt(nr) + 1}` };
  const response = await axios.post('/api/tasks', data);
  console.log('task is marked as done');
  return response.data;
};
