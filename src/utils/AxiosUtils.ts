import { BASE_URL, BASE_URL_WHATSAPP_WEB } from '@/utils/EnvUrl';
import { showAlert } from '@/utils/modalAlerts';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// 🧩 Helper para obtener el nombre de archivo desde el header Content-Disposition
const extractFilename = (header?: string): string => {
  if (!header) return 'archivo_descargado';

  // Soporta: filename*=UTF-8''reporte%20ventas.xlsx
  const utf8Match = header.match(/filename\*\=UTF-8''([^;]+)/i);
  if (utf8Match && utf8Match[1]) {
    try {
      return decodeURIComponent(utf8Match[1]);
    } catch {
      // si falla el decode, sigue abajo al filename normal
    }
  }

  // Soporta: filename="reporte.xlsx" o filename=reporte.xlsx
  const filenameMatch = header.match(/filename="?([^"]+)"?/i);
  if (filenameMatch && filenameMatch[1]) {
    return filenameMatch[1];
  }

  return 'archivo_descargado';
};

const api = (prefix = '', isUrlWhatApp = false) => {
  const instance = axios.create({
    baseURL: (isUrlWhatApp ? BASE_URL_WHATSAPP_WEB : BASE_URL) + `${prefix}`,
    // No fijamos Content-Type aquí para que FormData funcione bien
    headers: {
      Authorization: `Bearer ${localStorage.getItem('tokenApp')}`,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const msg = (error.response?.headers as any)?.message
        ? `${(error.response?.headers as any).message}`
        : `${(error.response?.data as any) || error.message}`;

      const configAlert = {
        title: 'Error',
        message: msg,
        type: 'error' as const,
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
  isDownload: boolean = false,
  isUrlWhatApp: boolean = false
): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
    responseType: isDownload ? 'blob' : 'json',
    headers: {},
  };

  // Solo forzamos JSON si NO es FormData (para que axios maneje el boundary solo)
  if (data && !(data instanceof FormData)) {
    (config.headers as any)['Content-Type'] = 'application/json';
  }

  const response = await api('', isUrlWhatApp).request<T>(config);

  // Manejo de descarga de archivos
  if (isDownload && response.data instanceof Blob) {
    const contentType = (response as any).headers['content-type'];
    const contentDisposition = (response as any).headers['content-disposition'];

    const filename = extractFilename(contentDisposition);
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

  return response.data as T;
};
