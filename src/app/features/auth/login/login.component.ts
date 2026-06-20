import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <!-- Background Decorative Elements -->
      <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute top-[40%] left-[60%] w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[80px] opacity-50"></div>

      <!-- Login Card -->
      <div class="relative z-10 w-full max-w-[420px] p-8 mx-4 backdrop-blur-2xl bg-slate-900/60 rounded-3xl shadow-2xl border border-white/10">
        
        <!-- Logo & Header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30 mb-6 transform hover:scale-105 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">Risk Radar</h2>
          <p class="text-slate-400 mt-3 font-medium">Sign in to your control tower</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Error Message -->
          <div *ngIf="errorMessage" class="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-fade-in">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{{ errorMessage }}</p>
          </div>

          <!-- Inputs -->
          <div class="space-y-5">
            <div class="space-y-2">
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
                  class="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner"
                  placeholder="Enter your username"
                >
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between ml-1">
                <label for="password" class="text-sm font-medium text-slate-300">Password</label>
                <a href="#" class="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
              </div>
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
                  class="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner"
                  placeholder="••••••••"
                >
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isLoading"
            class="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-8"
          >
            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span *ngIf="!isLoading" class="relative">Sign In</span>
            <span *ngIf="isLoading" class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          </button>

          <!-- Footer -->
          <p class="text-center text-sm text-slate-400 mt-8">
            Don't have an account? 
            <a routerLink="/register" class="font-semibold text-white hover:text-indigo-400 transition-colors">Sign up</a>
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
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Invalid username or password.';
        }
      });
    }
  }
}
