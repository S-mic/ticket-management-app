<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useToast } from '../composables/useToast';
import { validateEmail, validatePassword } from '../utils/validation';

const formData = reactive({ email: '', password: '' });
const errors = ref({});
const isSubmitting = ref(false);

const { login } = useAuth();
const { addToast } = useToast();
const router = useRouter();

const clearError = (field) => {
  if (errors.value[field]) {
    errors.value = { ...errors.value, [field]: '' };
  }
};

const handleSubmit = async () => {
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);

  if (emailError || passwordError) {
    errors.value = { email: emailError, password: passwordError };
    return;
  }

  isSubmitting.value = true;

  const result = await login(formData.email, formData.password);

  if (result.success) {
    addToast('Login successful!', 'success');
    router.push('/dashboard');
  } else {
    addToast(result.error, 'error');
    errors.value = { general: result.error };
  }

  isSubmitting.value = false;
};
</script>

<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f8fafc; padding: 2rem 0;">
    <div class="card" style="width: 100%; max-width: 400px;">
      <h1 style="text-align: center; margin-bottom: 2rem;">Login</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            type="email"
            v-model="formData.email"
            @input="clearError('email')"
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
            @input="clearError('password')"
            class="form-input"
            placeholder="Enter your password"
          />
          <div v-if="errors.password" class="form-error">{{ errors.password }}</div>
        </div>

        <div v-if="errors.general" class="form-error" style="text-align: center; margin-bottom: 1rem;">
          {{ errors.general }}
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          style="width: 100%; margin-bottom: 1rem;"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Logging in...' : 'Login' }}
        </button>

        <div style="text-align: center;">
          <p style="color: #6b7280;">
            Don't have an account?
            <router-link to="/auth/signup" style="color: #3b82f6; text-decoration: none;">
              Sign up
            </router-link>
          </p>
        </div>
      </form>

      <div style="margin-top: 2rem; padding: 1rem; background-color: #f3f4f6; border-radius: 0.5rem; font-size: 14px;">
        <p style="margin: 0; font-weight: 500;">Demo Credentials:</p>
        <p style="margin: 0.25rem 0 0 0;">Email: demo@example.com</p>
        <p style="margin: 0;">Password: password123</p>
      </div>
    </div>
  </div>
</template>
