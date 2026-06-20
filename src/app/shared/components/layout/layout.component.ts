import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="flex h-screen bg-slate-900 text-slate-50 overflow-hidden">
      <!-- Sidebar -->
      <app-sidebar class="hidden md:block flex-shrink-0"></app-sidebar>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <app-header></app-header>

        <!-- Scrollable Content -->
        <main class="flex-1 overflow-y-auto p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class LayoutComponent {}
