import { ref, computed } from 'vue'
import { authAPI } from '../utils/auth'

export function useAuth() {
  const user = ref(null)
  const loading = ref(true)

  const init = () => {
    const session = authAPI.getSession()
    if (session) {
      user.value = session.user
    }
    loading.value = false
  }

  const login = async (email, password) => {
    try {
      const result = await authAPI.login(email, password)
      user.value = result.user
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const result = await authAPI.signup(name, email, password)
      user.value = result.user
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    authAPI.logout()
    user.value = null
  }

  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    loading,
    init,
    login,
    signup,
    logout,
    isAuthenticated
  }
}