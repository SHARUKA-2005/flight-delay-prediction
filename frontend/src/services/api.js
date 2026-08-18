const API_BASE_URL = 'http://localhost:8000/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const errorBody = await response.json()
      if (errorBody && errorBody.detail) {
        message = errorBody.detail
      }
    } catch (parseError) {}
    throw new Error(message)
  }

  return response.json()
}

export function getHealth() {
  return request('/health')
}

export function getPrediction(payload) {
  return request('/prediction', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export function getComparison() {
  return request('/comparison')
}

export function getModels() {
  return request('/models')
}

export default {
  getHealth,
  getPrediction,
  getComparison,
  getModels
}