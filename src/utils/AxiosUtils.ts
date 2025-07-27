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

  const response: AxiosResponse<T> = await api().request(config);

  if (isDownload && response.data instanceof Blob) {
    const blob = new Blob([response.data]);
    if (!blob.size) {
      return response.data;
    }
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'archivo_descargado';
    if (contentDisposition && contentDisposition.includes('filename=')) {
      filename = contentDisposition.split('filename=')[1].replace(/['"]/g, '');
    }

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  return response.data;
};
