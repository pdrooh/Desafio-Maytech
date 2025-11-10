'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { clientsApi, CreateClientData } from '@/lib/api';
import Toast from '@/components/Toast';
import { Loader2 } from 'lucide-react';

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientData>();

  async function onSubmit(data: CreateClientData) {
    try {
      setLoading(true);
      // Remove formatação do CPF antes de enviar
      const cleanData = {
        ...data,
        cpf: data.cpf.replace(/\D/g, ''),
      };
      
      console.log('Enviando dados:', cleanData);
      const result = await clientsApi.create(cleanData);
      console.log('Cliente criado:', result);
      
      setToast({ message: 'Cliente cadastrado com sucesso!', type: 'success' });
      setTimeout(() => {
        router.push('/clients');
      }, 1500);
    } catch (error: any) {
      console.error('Erro ao cadastrar cliente:', error);
      
      let message = 'Erro ao cadastrar cliente';
      
      if (error.response) {
        // Erro com resposta do servidor
        message = error.response.data?.message || 
                  error.response.data?.error || 
                  `Erro ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // Erro de rede (sem resposta)
        message = 'Erro de conexão: Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
      } else {
        // Outro tipo de erro
        message = error.message || 'Erro desconhecido ao cadastrar cliente';
      }
      
      setToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/clients')}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2 transition-colors"
          >
            <span>←</span>
            <span>Voltar para listagem</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Novo Cliente</h1>
          <p className="mt-2 text-sm text-gray-600">Preencha os dados abaixo para cadastrar um novo cliente</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                {...register('name', { required: 'Nome é obrigatório' })}
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="João Silva"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠</span>
                  <span>{errors.name.message}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="joao@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠</span>
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
                CPF * <span className="text-gray-500 text-xs">(apenas números, 11 dígitos)</span>
              </label>
              <input
                {...register('cpf', {
                  required: 'CPF é obrigatório',
                  pattern: {
                    value: /^\d{11}$/,
                    message: 'CPF deve conter 11 dígitos',
                  },
                })}
                type="text"
                id="cpf"
                maxLength={11}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="12345678900"
              />
              {errors.cpf && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠</span>
                  <span>{errors.cpf.message}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                {...register('phone', { required: 'Telefone é obrigatório' })}
                type="text"
                id="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="11987654321"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠</span>
                  <span>{errors.phone.message}</span>
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/clients')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Cadastrando...
                  </>
                ) : (
                  'Cadastrar Cliente'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
