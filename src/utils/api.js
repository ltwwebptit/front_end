export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * 
 * @param {string} endpoint 
 * @param {RequestInit} options 
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, defaultOptions);

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      let errorMessage = "Có lỗi xảy ra khi kết nối máy chủ.";
      if (typeof data === "object") {
        if (data.message) errorMessage = data.message;
        else errorMessage = JSON.stringify(data);
      } else if (typeof data === "string" && data.trim() !== "") {
        errorMessage = data;
      } else if (response.statusText) {
        errorMessage = response.statusText;
      }
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`API Fetch Error (${endpoint}):`, error);
    throw error;
  }
}
