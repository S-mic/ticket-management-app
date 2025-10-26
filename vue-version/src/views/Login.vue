<template>
  <div class="login-page">
    <div class="card login-card">
      <h1>Login</h1>
      
      <form @submit="handleSubmit">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            type="email"
            v-model="formData.email"
            class="form-input"
            placeholder="Enter your email"
          />
          <div v-if="errors.email" class="form-error">{{ errors.email }}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            type="password"
            v-model="formData.password"
            class="form-input"
            placeholder="Enter your password"
          />
          <div v-if="errors.password" class="form-error">{{ errors.password }}</div>
        </div>

        <div v-if="errors.general" class="form-error general-error">
          {{ errors.general }}
        </div>

        <button 
          type="submit" 
          class="btn btn-primary login-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Logging in...' : 'Login' }}
        </button>

        <div class="auth-link">
          <p>
            Don't have an account? 
            <router-link to="/auth/signup">Sign up</router-link>
          </p>
        </div>
      </form>

      <div class="demo-credentials">
        <p><strong>Demo Credentials:</strong></p>
        <p>Email: demo@example.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'
import { validateEmail, validatePassword } from '../utils/validation'

const router = useRouter()
const { login } = useAuth()
const { addToast } = useToast()

const formData = reactive({
  email: '',
  password: ''
})

const errors = ref({})
const isSubmitting = ref(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  
  const emailError = validateEmail(formData.email)
  const passwordError = validatePassword(formData.password)
  
  if (emailError || passwordError) {
    errors.value = {
      email: emailError,
      password: passwordError
    }
    return
  }
  
  isSubmitting.value = true
  
  const result = await login(formData.email, formData.password)
  
  if (result.success) {
    addToast('Login successful!', 'success')
    router.push('/dashboard')
  } else {
    addToast(result.error, 'error')
    errors.value.general = result.error
  }
  
  isSubmitting.value = false
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 2rem 0;
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.login-btn {
  width: 100%;
  margin-bottom: 1rem;
}

.auth-link {
  text-align: center;
}

.auth-link p {
  color: #6b7280;
}

.auth-link a {
  color: #3b82f6;
  text-decoration: none;
}

.demo-credentials {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  font-size: 14px;
}

.general-error {
  text-align: center;
  margin-bottom: 1rem;
}
</style>