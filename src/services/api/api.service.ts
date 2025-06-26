export class ApiService {
  /**
   * Generic GET request
   * @param url - Absolute or relative URL
   * @param options - Optional RequestInit object
   * @returns Parsed JSON response
   */
  public async get<T = any>(url: string | URL, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        ...options,
      });

      if (!response.ok) {
        const message = `API error: ${response.status} ${response.statusText}`;
        throw new Error(message);
      }

      return await response.json();
    } catch (err) {
      // Optionally log or rethrow
      throw new Error(`Fetch failed: ${(err as Error).message}`);
    }
  }

  /**
   * Generic POST request.
   * Probably wont need this but you get the idea
   * @param url
   * @param options
   * @returns
   */
  public async post<T = any>(url: string | URL, options: RequestInit = {}): Promise<T> {
    return new Promise(true as any);
  }
}

const apiService = new ApiService(); // Creating singleton

export default apiService;
