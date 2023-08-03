export const requestTimestamp = () => fetch('/api/timestamp').then((response) => response.json())
