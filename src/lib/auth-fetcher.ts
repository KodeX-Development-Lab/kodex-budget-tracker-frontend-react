const api = import.meta.env.VITE_API

export const postLogin = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch(`${api}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.ok) {
    return res.json()
  }
  throw new Error('Incorrect username or password')
}

export const fetchVerify = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${api}/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.ok) {
    return res.json()
  }
  
  return false
}
