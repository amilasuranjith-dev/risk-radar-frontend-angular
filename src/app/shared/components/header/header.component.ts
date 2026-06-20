import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6">
      <div class="flex items-center">
        <!-- Optional Breadcrumbs or Title -->
        <h2 class="text-lg font-medium text-white">Dashboard</h2>
      </div>

      <div class="flex items-center gap-4">
        <!-- Notifications -->
        <button class="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-800"></span>
        </button>

        <!-- User Menu -->
        <div class="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div class="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-sm font-medium text-white">
            U
          </div>
          <div class="hidden md:block text-sm">
            <p class="font-medium text-white leading-tight">Admin User</p>
            <p class="text-slate-400 text-xs">admin&#64;riskradar.com</p>
          </div>
          <button (click)="logout()" class="ml-2 p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors" title="Logout">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
