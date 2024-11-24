const TIMEOUT_DURATION = 8000; // 8 seconds
const MAX_RETRIES = 2;

export async function fetchWithRetry(
  url: string,
  options: RequestInit & { timeout?: number } = {}
) {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        options.timeout || TIMEOUT_DURATION
      );

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        cache: 'force-cache', // Use full route cache
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error: unknown) {
      lastError = error as Error;
      
      // Only retry on network errors or timeouts
      if (!(error instanceof Error && 
          (error.name === "AbortError" || error.name === "TypeError"))) {
        throw error;
      }

      // Use shorter delay for retries
      if (attempt < MAX_RETRIES - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError || new Error("Failed after multiple retries");
}
