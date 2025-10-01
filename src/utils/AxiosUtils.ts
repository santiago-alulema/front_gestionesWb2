import { BASE_URL, BASE_URL_WHATSAPP_WEB } from '@/utils/EnvUrl';
import { showAlert } from '@/utils/modalAlerts';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const api = (prefix = '', isUrlWhatApp = false) => {
  const instance = axios.create({
    baseURL: (isUrlWhatApp ? BASE_URL_WHATSAPP_WEB : BASE_URL) + `${prefix}`,
    // ⛔️ Quitamos Content-Type fijo para permitir FormData
    headers: {
      Authorization: `Bearer ${localStorage.getItem('tokenApp')}`,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const msg = (error.response?.headers as any)?.message
        ? `${(error.response?.headers as any).message}`
        : `${error.response?.data || error.message}`;

      const configAlert = {
        title: 'Error',
        message: msg,
        type: 'error',
        callBackFunction: false,
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
  isDownload?: boolean,
  isUrlWhatApp?: boolean
): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
    responseType: isDownload ? 'blob' : 'json',
    headers: {},
  };

  // ✅ Solo forzamos JSON si NO es FormData (para que axios ponga boundary automáticamente)
  if (!(data instanceof FormData)) {
    (config.headers as any)['Content-Type'] = 'application/json';
  }

  const response = await api('', isUrlWhatApp).request<T>(config);

  if (isDownload && response.data instanceof Blob) {
    const contentType = response.headers['content-type'];
    const contentDisposition = response.headers['content-disposition'];

    let filename = 'documento_descargado';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '');
      }
    }

    const blob = new Blob([response.data], { type: contentType });

    const link = document.createElement('a');
    const urlObj = window.URL.createObjectURL(blob);
    link.href = urlObj;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObj);
    }, 100);
  }

  return response.data;
};
