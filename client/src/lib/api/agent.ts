import axios, { type AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../app/router/Router";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ─── Response interceptor ────────────────────────────────────────────────────
// Lesson 96-98: Handle API error responses centrally.
// The response interceptor normalises success (adds artificial delay in dev)
// and maps HTTP error codes to user-friendly behaviour.

agent.interceptors.response.use(
  // ✅ Success – add a small artificial delay so loading states are visible
  async (response: AxiosResponse) => {
    if (import.meta.env.DEV) await sleep(500);
    return response;
  },

  // ❌ Error – map status codes to appropriate actions / toasts
  async (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        // Validation errors come back as an object with an "errors" key
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(...data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data || "Bad request");
        break;

      case 401:
        toast.error("Unauthorised");
        break;

      case 403:
        toast.error("Forbidden");
        break;

      case 404:
        // Navigate to a not-found page instead of crashing
        router.navigate("/not-found");
        break;

      case 500:
        // Store server error details in router state so the ServerError page can display them
        router.navigate("/server-error", { state: { error: data } });
        break;

      default:
        toast.error("Something went wrong");
        break;
    }

    return Promise.reject(error);
  }
);

export default agent;
