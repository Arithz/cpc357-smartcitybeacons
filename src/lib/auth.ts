export async function checkToken() {
  const tokenEligibility = await fetch("http://localhost:5000/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  }).then((res) => res.json());

  return tokenEligibility.token;
}

export async function handleLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());

  if (response.token) {
    localStorage.setItem("token", response.token);
    return true;
  } else {
    return false;
  }
}

export async function handleLogout() {
  localStorage.removeItem("token");
}
