import { BASE_URL } from '@/utils/EnvUrl';
import { showAlert } from '@/utils/modalAlerts';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';


const api = (prefix = '') => {
  //   const { showAlert } = useAlert();

  const instance = axios.create({
    baseURL: BASE_URL + `${prefix}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('tokenApp')}`
    }
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const msg = error.response?.headers.message
        ? `${error.response?.headers.message}`
        : `${error.response?.data || error.message}`;

      const configAlert = {
        title: "Error",
        message: msg,
        type: 'error',
        callBackFunction: false
      };
      showAlert(configAlert);

      return Promise.reject(error);
    }
  );
  return instance;
};

export const request = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: unknown,
  params?: Record<string, unknown>,
  isDownload?: boolean
): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
    responseType: isDownload ? 'blob' : 'json'
  };

  const response = await api().request<T>(config);

  if (isDownload && response.data instanceof Blob) {
    const contentType = response.headers['content-type'];
    const contentDisposition = response.headers['content-disposition'];

    // Extraer el nombre del archivo
    let filename = 'documento_descargado';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '');
      }
    }

    // Crear el blob con el tipo MIME correcto
    const blob = new Blob([response.data], { type: contentType });

    // Crear enlace y descargar
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    // Limpiar
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  return response.data;
};