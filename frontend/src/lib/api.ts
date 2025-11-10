import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      error.response = {
        data: {
          message: 'Erro de conexão: Backend não está respondendo. Verifique se o servidor está rodando na porta 3001.',
        },
        status: 503,
      };
    }
    return Promise.reject(error);
  }
);

export interface Client {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CreateClientData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export const clientsApi = {
  async getAll(): Promise<Client[]> {
    const { data } = await api.get<ApiResponse<Client[]>>('/clients');
    return data?.data || [];
  },

  async getById(id: string): Promise<Client> {
    const { data } = await api.get<ApiResponse<Client>>(`/clients/${id}`);
    if (!data?.data) {
      throw new Error('Cliente não encontrado');
    }
    return data.data;
  },

  async create(clientData: CreateClientData): Promise<Client> {
    const { data } = await api.post<ApiResponse<Client>>('/clients', clientData);
    if (!data?.data) {
      throw new Error('Erro ao criar cliente');
    }
    return data.data;
  },

  async update(id: string, clientData: Partial<CreateClientData>): Promise<Client> {
    const { data } = await api.patch<ApiResponse<Client>>(`/clients/${id}`, clientData);
    if (!data?.data) {
      throw new Error('Erro ao atualizar cliente');
    }
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/clients/${id}`);
  },
};

export default api;
