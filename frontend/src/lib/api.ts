const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export async function investigateMessage(message: string) {
  const response = await fetch(`${API_BASE}/investigate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  return data;
}

export async function fetchStats() {
  const response = await fetch(`${API_BASE}/stats`);
  const data = await response.json();
  return data;
}