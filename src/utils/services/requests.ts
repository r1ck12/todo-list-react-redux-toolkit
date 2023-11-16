const BASE_ENDPOINT = "http://localhost:3001/"

export const baseRequest = async (api: string, method: string, params?: any) => {
  const res = await fetch(BASE_ENDPOINT + api, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  return res.json()
}