<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useToast } from '../composables/useToast';
import { validateEmail, validatePassword, validateName } from '../utils/validation';

const formData = reactive({ name: '', email: '', password: '', confirmPassword: '' });
const errors = ref({});
const isSubmitting = ref(false);

const { signup } = useAuth();
const { addToast } = useToast();
const router = useRouter();

const clearError = (field) => {
  if (errors.value[field]) {
    errors.value = { ...errors.value, [field]: '' };
  }
};

const handleSubmit = async () => {
  const nameError = validateName(formData.name);
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);
  let confirmPasswordError = '';

  if (formData.password !== formData.confirmPassword) {
    confirmPasswordError = 'Passwords do not match';
  }

  if (nameError || emailError || passwordError || confirmPasswordError) {
    errors.value = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    };
    return;
  }

  isSubmitting.value = true;

  const result = await signup(formData.name, formData.email, formData.password);

  if (result.success) {
    addToast('Account created successfully!', 'success');
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
      <h1 style="text-align: center; margin-bottom: 2rem;">Sign Up</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input
            type="text"
            v-model="formData.name"
            @input="clearError('name')"
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

        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input
            type="password"
            v-model="formData.confirmPassword"
            @input="clearError('confirmPassword')"
            class="form-input"
            placeholder="Confirm your password"
          />
          <div v-if="errors.confirmPassword" class="form-error">{{ errors.confirmPassword }}</div>
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
          {{ isSubmitting ? 'Creating Account...' : 'Sign Up' }}
        </button>

        <div style="text-align: center;">
          <p style="color: #6b7280;">
            Already have an account?
            <router-link to="/auth/login" style="color: #3b82f6; text-decoration: none;">
              Login
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
