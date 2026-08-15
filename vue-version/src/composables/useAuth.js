import { ref, computed } from 'vue';
import { authAPI } from '../utils/auth';

// Module-level state so every component sees the same auth state — Vue's
// equivalent of React's context provider, without needing a separate
// AuthProvider wrapper component or a Pinia dependency for a store this small.
const user = ref(null);
const loading = ref(true);

const session = authAPI.getSession();
if (session) {
  user.value = session.user;
}
loading.value = false;

export function useAuth() {
  const login = async (email, password) => {
    try {
      const result = await authAPI.login(email, password);
      user.value = result.user;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const result = await authAPI.signup(name, email, password);
      user.value = result.user;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authAPI.logout();
    user.value = null;
  };

  return {
    user,
    loading,
    isAuthenticated: computed(() => !!user.value),
    login,
    signup,
    logout
  };
}
