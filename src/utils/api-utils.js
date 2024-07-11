const API_URL = import.meta.env.VITE_API_URL;

export function getUsersListEndpoint() {
  return API_URL + "/users";
}

export function getSingleUserEndpoint(id) {
  return API_URL + "/users/" + id;
}
