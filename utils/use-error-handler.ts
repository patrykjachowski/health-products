export const useErrorHandler = () => {
  const handleError = (error: unknown, context: string) => {
    // In development, log to console for debugging
    if (import.meta.dev) {
      console.error(`[${context}]`, error)
    }

    // In production, you might want to send to error tracking service
    // e.g., Sentry, LogRocket, etc.

    // For now, we'll just return a user-friendly error message
    return 'Wystąpił błąd. Spróbuj ponownie.'
  }

  return {
    handleError,
  }
}
