const TIMEOUT_DURATION = 8000; // 8 seconds
const MAX_RETRIES = 2;

export async function fetchWithRetry(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: RequestInit & { timeout?: number; next?: any } = {}
) {
  const { next, ...fetchOptions } = options;
  
  const cacheOptions = {
    ...fetchOptions,
    next: {
      ...next,
      revalidate: next?.revalidate || 3600,
      tags: next?.tags || ['pokemon'],
    },
    cache: 'force-cache' as RequestCache,
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        options.timeout || TIMEOUT_DURATION
      );

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        next: cacheOptions.next,
        cache: cacheOptions.cache,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error: unknown) {
      lastError = error as Error;
      
      if (!(error instanceof Error && 
          (error.name === "AbortError" || error.name === "TypeError"))) {
        throw error;
      }

      if (attempt < MAX_RETRIES - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError || new Error("Failed after multiple retries");
}
