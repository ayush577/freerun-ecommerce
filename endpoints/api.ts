import { siteConfig } from '@/config/site'

const BASE_URL = siteConfig.backendUrl
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  // 'Authorization': `Bearer ${YOUR_TOKEN}`, // Include token if needed
}

interface FetchOptions extends RequestInit {
  body?: any // Use `any` type for flexibility, you can change it to `unknown` or `object` as needed
  headers?: Record<string, string>
  queryParams?: Record<string, string | number | boolean>
}

async function http<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { body, queryParams, headers, ...restOptions } = options

  // Build the URL with query parameters if provided
  const url = new URL(`${BASE_URL}${endpoint}`)
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  const response = await fetch(url.toString(), {
    headers: {
      ...DEFAULT_HEADERS, // Merge default headers
      ...headers, // Override or add custom headers
    },
    body: body ? JSON.stringify(body) : undefined,
    ...restOptions,
  })

  if (response.ok) {
    return response.json() as Promise<T>
  }

  throw await response.json()
}

// Define the API object with methods for each HTTP verb
export const api = {
  get: <T>(
    endpoint: string,
    options?: Omit<FetchOptions, 'method' | 'body'>,
  ): Promise<T> => http<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(
    endpoint: string,
    body: any,
    options?: Omit<FetchOptions, 'method' | 'body'>,
  ): Promise<T> => http<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(
    endpoint: string,
    body: any,
    options?: Omit<FetchOptions, 'method' | 'body'>,
  ): Promise<T> => http<T>(endpoint, { ...options, method: 'PUT', body }),

  patch: <T>(
    endpoint: string,
    body: any,
    options?: Omit<FetchOptions, 'method' | 'body'>,
  ): Promise<T> => http<T>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <T>(
    endpoint: string,
    options?: Omit<FetchOptions, 'method' | 'body'>,
  ): Promise<T> => http<T>(endpoint, { ...options, method: 'DELETE' }),
}
