import { appConfig } from '@/config/app-config';
import AxiosServiceBuilder from './axios-service-builder';

const axiosInstance = AxiosServiceBuilder.Create()
  .WithBaseUrl(appConfig.apiUrl)
  .WithTimeout(appConfig.apiTimeout)
  .Build();

export default axiosInstance;
