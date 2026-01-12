import axios from 'axios';
import type { Task } from './types';

export const getAllTasks = async () => {
  const response = await axios.get<Task[]>('/api/tasks');
  return response.data;
};
