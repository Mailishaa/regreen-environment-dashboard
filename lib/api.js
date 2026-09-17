
const BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://regreen-environment.onrender.com";

export async function api(path, options = {}) {
  if (!path) {
    throw new Error("API endpoint is missing.");
  }

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    throw new Error("Authentication required.");
  }

  if (response.status === 403) {
    throw new Error("Admin access required.");
  }

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.message ||
      `API request failed (${response.status})`
    );
  }

  return data;
}

export function get(path) {
  return api(path);
}

export function post(path, body) {
  return api(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function patch(path, query = {}) {
  const params = new URLSearchParams(query);

  const queryString = params.toString();

  return api(
    queryString
      ? `${path}?${queryString}`
      : path,
    {
      method: "PATCH",
    }
  );
}

