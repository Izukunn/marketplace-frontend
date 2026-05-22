import api from '../api/client'

export const getMe = () => api.get('/auth/me')
