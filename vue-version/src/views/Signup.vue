<template>
  <div class="signup-page">
    <div class="card signup-card">
      <h1>Sign Up</h1>
      
      <form @submit="handleSubmit">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input
            type="text"
            v-model="formData.name"
            class="form-input"
            placeholder="Enter your full name"
          />
          <div v-if="errors.name" class="form-error">{{ errors.name }}</div>
        </div>

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

        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input
            type="password"
            v-model="formData.confirmPassword"
            class="form-input"
            placeholder="Confirm your password"
          />
          <div v-if="errors.confirmPassword" class="form-error">{{ errors.confirmPassword }}</div>
        </div>

        <div v-if="errors.general" class="form-error general-error">
          {{ errors.general }}
        </div>

        <button 
          type="submit" 
          class="btn btn-primary signup-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Creating Account...' : 'Sign Up' }}
        </button>

        <div class="auth-link">
          <p>
            Already have an account? 
            <router-link to="/auth/login">Login</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'
import { validateEmail, validatePassword, validateName } from '../utils/validation'

const router = useRouter()
const { signup } = useAuth()
const { addToast } = useToast()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})
const isSubmitting = ref(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  
  const nameError = validateName(formData.name)
  const emailError = validateEmail(formData.email)
  const passwordError = validatePassword(formData.password)
  let confirmPasswordError = ''

  if (formData.password !== formData.confirmPassword) {
    confirmPasswordError = 'Passwords do not match'
  }
  
  if (nameError || emailError || passwordError || confirmPasswordError) {
    errors.value = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    }
    return
  }
  
  isSubmitting.value = true
  
  const result = await signup(formData.name, formData.email, formData.password)
  
  if (result.success) {
    addToast('Account created successfully!', 'success')
    router.push('/dashboard')
  } else {
    addToast(result.error, 'error')
    errors.value.general = result.error
  }
  
  isSubmitting.value = false
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 2rem 0;
}

.signup-card {
  width: 100%;
  max-width: 400px;
}

.signup-btn {
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

.general-error {
  text-align: center;
  margin-bottom: 1rem;
}
</style>