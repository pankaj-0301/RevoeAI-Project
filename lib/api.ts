"use client"

import axios from 'axios';
import { getToken } from './auth';
import io from 'socket.io-client';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const socket = io('http://localhost:5000', {
  autoConnect: false,
});

export const createTable = async (data: { name: string; columns: Array<{ name: string; type: string }> }) => {
  const response = await api.post('/tables', data);
  return response.data;
};

export const getTables = async () => {
  const response = await api.get('/tables');
  return response.data;
};

export const getTableData = async (tableId: string) => {
  const response = await api.get(`/tables/${tableId}/data`);
  return response.data;
};

export const addCustomColumn = async (tableId: string, data: { name: string; type: string }) => {
  const response = await api.post(`/tables/${tableId}/columns`, data);
  return response.data;
};