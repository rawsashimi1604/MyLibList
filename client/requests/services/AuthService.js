import httpService from "../httpService";

function logout(body) {
  return httpService.delete("/auth/logout", {
    data: body,
  });
}

function login(body) {
  return httpService.post("/auth/login", body);
}

export default {
  logout,
  login,
};
