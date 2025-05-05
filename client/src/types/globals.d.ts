// 全局類型聲明

// React 模塊聲明
declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

// React DOM 模塊聲明
declare module 'react-dom/client' {
  import * as ReactDOM from 'react-dom/client';
  export = ReactDOM;
}

// React Router DOM 模塊聲明
declare module 'react-router-dom' {
  export interface NavigateOptions {
    replace?: boolean;
    state?: any;
  }
  
  export function useNavigate(): (to: string, options?: NavigateOptions) => void;
  export function useLocation(): { pathname: string; search: string; hash: string; state: any };
  export function Link(props: { to: string; className?: string; children: React.ReactNode }): JSX.Element;
  export function BrowserRouter({ children }: { children: React.ReactNode }): JSX.Element;
  export function Routes({ children }: { children: React.ReactNode }): JSX.Element;
  export function Route(props: { path: string; element: React.ReactNode }): JSX.Element;
  export function Outlet(): JSX.Element;
  export function Navigate(props: { to: string; replace?: boolean; state?: any }): JSX.Element;
}

// React Hot Toast 模塊聲明
declare module 'react-hot-toast' {
  export interface ToastOptions {
    duration?: number;
    position?: string;
  }
  
  export interface ToastFunction {
    (message: string, options?: ToastOptions): void;
    success(message: string, options?: ToastOptions): void;
    error(message: string, options?: ToastOptions): void;
  }
  
  export const toast: ToastFunction;
  export function Toaster(props: any): JSX.Element;
}

// JWT Decode 模塊聲明
declare module 'jwt-decode' {
  export default function jwtDecode<T>(token: string): T;
}

// Axios 模塊聲明
declare module 'axios' {
  interface AxiosRequestConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    params?: any;
  }
  
  interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig;
  }
  
  interface AxiosError<T = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
  }
  
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<AxiosResponse>;
    (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    defaults: AxiosRequestConfig;
    interceptors: {
      request: any;
      response: any;
    };
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  }
  
  export function create(config?: AxiosRequestConfig): AxiosInstance;
  export default create({});
}

// 為了解決vite.config.ts的類型錯誤
declare module 'vite' {
  export function defineConfig(config: any): any;
}

declare module '@vitejs/plugin-react' {
  function plugin(): any;
  export default plugin;
}

declare module 'path' {
  export function resolve(...paths: string[]): string;
}

// 全局命名空間擴展
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare const __dirname: string; 