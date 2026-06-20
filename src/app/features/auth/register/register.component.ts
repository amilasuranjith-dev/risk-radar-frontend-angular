import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 py-12">
      <!-- Background Decorative Elements -->
      <div class="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse" style="animation-delay: 2s;"></div>

      <!-- Register Card -->
      <div class="relative z-10 w-full max-w-[460px] p-8 mx-4 backdrop-blur-2xl bg-slate-900/60 rounded-3xl shadow-2xl border border-white/10 my-auto">
        
        <!-- Logo & Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30 mb-5">
            <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">Create Account</h2>
          <p class="text-slate-400 mt-2 font-medium">Join Risk Radar to command your fleet</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
          <!-- Error Message -->
          <div *ngIf="errorMessage" class="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-fade-in">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{{ errorMessage }}</p>
          </div>
          
          <!-- Success Message -->
          <div *ngIf="successMessage" class="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm animate-fade-in">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{{ successMessage }} <a routerLink="/login" class="underline font-medium hover:text-emerald-300 ml-1">Sign in now</a></p>
          </div>

          <div class="space-y-4">
            <!-- Username Input -->
            <div class="space-y-1.5">
              <label for="username" class="text-sm font-medium text-slate-300 ml-1">Username</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  id="username" 
                  formControlName="username"
                  class="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner"
                  placeholder="Choose a username"
                >
              </div>
            </div>

            <!-- Password Input -->
            <div class="space-y-1.5">
              <label for="password" class="text-sm font-medium text-slate-300 ml-1">Password</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  id="password" 
                  formControlName="password"
                  class="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner"
                  placeholder="••••••••"
                >
              </div>
            </div>

            <!-- Role Selection -->
            <div class="space-y-1.5">
              <label for="role" class="text-sm font-medium text-slate-300 ml-1">System Role</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <select 
                  id="role" 
                  formControlName="role"
                  class="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-11 pr-10 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner appearance-none"
                >
                  <option value="MANAGER" class="bg-slate-900 text-white">Manager (View Operations)</option>
                  <option value="ADMIN" class="bg-slate-900 text-white">Admin (Full Control)</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            [disabled]="registerForm.invalid || isLoading || !!successMessage"
            class="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-8"
          >
            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" *ngIf="!successMessage"></div>
            <span *ngIf="!isLoading" class="relative">Create Account</span>
            <span *ngIf="isLoading" class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          </button>

          <!-- Footer -->
          <p class="text-center text-sm text-slate-400 mt-6">
            Already have an account? 
            <a routerLink="/login" class="font-semibold text-white hover:text-indigo-400 transition-colors">Sign in</a>
          </p>
        </form>
      </div>
    </div>

    <style>
      @keyframes shimmer {
        100% { transform: translateX(100%); }
      }
      .animate-shimmer {
        animation: shimmer 1.5s infinite;
      }
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 0.3s ease-out forwards;
      }
    </style>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['MANAGER', Validators.required]
  });

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Account created successfully!';
          this.registerForm.reset({ role: 'MANAGER' });
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Registration failed. Username may be taken.';
        }
      });
    }
  }
}
