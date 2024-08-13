import { User } from '../types';

export const getUsers = async (): Promise<User[]> => {
  const result = await fetch('/api/user');
  return result.json();
};

export const deleteUser = async (id: string | number) => {
  const result = await fetch(`/api/user/${id}`, { method: 'DELETE' });
  return result;
};

export const createUser = async (data: User) => {
  const result = await fetch(`/api/user`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 201) {
    throw result;
  }
  return result;
};

export const updateUser = async (id: string | number, data: User) => {
  const result = await fetch(`/api/user/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 204) {
    throw result;
  }
  return result;
};
