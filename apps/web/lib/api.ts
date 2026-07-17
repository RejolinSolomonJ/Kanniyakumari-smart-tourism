const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

/**
 * Core API client for communicating with the backend
 */
async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const { method = "GET", body, headers = {}, token } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Add auth token if available
  if (token) {
    (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  } else if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${storedToken}`;
    }
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        data: data as T,
        error: data.error || data.message || "An error occurred",
        status: response.status,
      };
    }

    return { data, status: response.status };
  } catch (error) {
    return {
      data: {} as T,
      error: error instanceof Error ? error.message : "Network error",
      status: 0,
    };
  }
}

// ─── AUTH ────────────────────────────────────
export const authApi = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    apiClient("/auth/register", { method: "POST", body: data }),

  login: (data: { email: string; password: string }) =>
    apiClient("/auth/login", { method: "POST", body: data }),

  sendOtp: (data: { phone: string }) =>
    apiClient("/auth/otp/send", { method: "POST", body: data }),

  verifyOtp: (data: { phone: string; otp: string }) =>
    apiClient("/auth/otp/verify", { method: "POST", body: data }),

  logout: () => apiClient("/auth/logout", { method: "POST" }),

  getMe: () => apiClient("/auth/me"),
};

// ─── DESTINATIONS ───────────────────────────
export const destinationsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return apiClient(`/destinations${query}`);
  },

  getFeatured: () => apiClient("/destinations/featured"),

  getByCategory: (category: string) =>
    apiClient(`/destinations/category/${category}`),

  getBySlug: (slug: string) => apiClient(`/destinations/${slug}`),
};

// ─── BOOKINGS ───────────────────────────────
export const bookingsApi = {
  createTicket: (data: unknown) =>
    apiClient("/bookings/ticket/create", { method: "POST", body: data }),

  getTicket: (id: string) => apiClient(`/bookings/ticket/${id}`),

  getUserBookings: () => apiClient("/bookings/user"),
};

// ─── PAYMENTS ───────────────────────────────
export const paymentsApi = {
  createOrder: (data: { amount: number; bookingId: string }) =>
    apiClient("/payments/create-order", { method: "POST", body: data }),

  verify: (data: { orderId: string; paymentId: string; signature: string }) =>
    apiClient("/payments/verify", { method: "POST", body: data }),
};

// ─── HOTELS ─────────────────────────────────
export const hotelsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return apiClient(`/hotels${query}`);
  },

  getById: (id: string) => apiClient(`/hotels/${id}`),

  getByType: (type: string) => apiClient(`/hotels/type/${type}`),
};

// ─── EVENTS ─────────────────────────────────
export const eventsApi = {
  getAll: () => apiClient("/events"),
  getUpcoming: () => apiClient("/events/upcoming"),
  getById: (id: string) => apiClient(`/events/${id}`),
};

// ─── BLOGS ──────────────────────────────────
export const blogsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return apiClient(`/blogs${query}`);
  },

  getBySlug: (slug: string) => apiClient(`/blogs/${slug}`),

  getByCategory: (category: string) =>
    apiClient(`/blogs/category/${category}`),
};

// ─── GALLERY ────────────────────────────────
export const galleryApi = {
  getPhotos: () => apiClient("/gallery/photos"),
  getVideos: () => apiClient("/gallery/videos"),
};

// ─── GUIDES ─────────────────────────────────
export const guidesApi = {
  getAll: () => apiClient("/guides"),
  getById: (id: string) => apiClient(`/guides/${id}`),
  book: (data: unknown) =>
    apiClient("/guides/book", { method: "POST", body: data }),
};

// ─── AI ─────────────────────────────────────
export const aiApi = {
  chat: (data: { message: string; language: string; history: unknown[] }) =>
    apiClient("/ai/chat", { method: "POST", body: data }),

  generateItinerary: (data: unknown) =>
    apiClient("/ai/itinerary", { method: "POST", body: data }),

  translate: (data: { text: string; from: string; to: string }) =>
    apiClient("/ai/translate", { method: "POST", body: data }),
};

// ─── EMERGENCY ──────────────────────────────
export const emergencyApi = {
  getContacts: () => apiClient("/emergency/contacts"),
  getNearby: (lat: number, lng: number) =>
    apiClient(`/emergency/nearby?lat=${lat}&lng=${lng}`),
};

// ─── DOWNLOADS ──────────────────────────────
export const downloadsApi = {
  getAll: () => apiClient("/downloads"),
  incrementCount: (id: string) =>
    apiClient(`/downloads/${id}/count`, { method: "POST" }),
};

// ─── ANNOUNCEMENTS ──────────────────────────
export const announcementsApi = {
  getAll: () => apiClient("/announcements"),
};

// ─── REPORTS ────────────────────────────────
export const reportsApi = {
  createInfra: (data: unknown) =>
    apiClient("/reports/infra", { method: "POST", body: data }),
};

// ─── ADMIN ──────────────────────────────────
export const adminApi = {
  getDashboard: () => apiClient("/admin/dashboard"),
  getAnalytics: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return apiClient(`/admin/analytics${query}`);
  },
  getBookings: () => apiClient("/admin/bookings"),
  getUsers: () => apiClient("/admin/users"),
  createDestination: (data: unknown) =>
    apiClient("/admin/destinations", { method: "POST", body: data }),
  updateDestination: (id: string, data: unknown) =>
    apiClient(`/admin/destinations/${id}`, { method: "PUT", body: data }),
  createBlog: (data: unknown) =>
    apiClient("/admin/blogs", { method: "POST", body: data }),
  updateBlog: (id: string, data: unknown) =>
    apiClient(`/admin/blogs/${id}`, { method: "PUT", body: data }),
  createEvent: (data: unknown) =>
    apiClient("/admin/events", { method: "POST", body: data }),
  getReports: () => apiClient("/admin/reports"),
  updateReportStatus: (id: string, status: string) =>
    apiClient(`/admin/reports/${id}/status`, { method: "PUT", body: { status } }),
};

export default apiClient;
