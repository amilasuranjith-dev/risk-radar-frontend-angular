import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-white">Overview</h2>
        <div class="flex gap-2">
          <button class="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-700 transition-colors flex items-center gap-2">
            <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Metrics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Active Vehicles -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-700/50">
            <h3 class="text-slate-400 font-medium">Active Vehicles</h3>
            <div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          <div class="pt-4">
            <p class="text-3xl font-bold text-white">{{ stats.activeVehicles }}</p>
            <p class="text-sm text-green-400 mt-1 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Total Fleet: {{ stats.totalVehicles }}</span>
            </p>
          </div>
        </div>

        <!-- Active Shipments -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-700/50">
            <h3 class="text-slate-400 font-medium">Active Shipments</h3>
            <div class="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div class="pt-4">
            <p class="text-3xl font-bold text-white">{{ stats.activeShipments }}</p>
            <p class="text-sm text-slate-400 mt-1">In transit</p>
          </div>
        </div>

        <!-- Active Alerts -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-700/50">
            <h3 class="text-slate-400 font-medium">Active Alerts</h3>
            <div class="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div class="pt-4">
            <p class="text-3xl font-bold text-white">{{ stats.activeAlerts }}</p>
            <p class="text-sm text-red-400 mt-1 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              <span>Requires attention</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Layout for Lists -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <!-- Recent Alerts Placeholder -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
            <h3 class="font-semibold text-white">Recent Alerts</h3>
            <a href="#" class="text-sm text-indigo-400 hover:text-indigo-300">View all</a>
          </div>
          <div class="p-6">
            <div class="text-center py-8">
              <div class="w-12 h-12 rounded-full bg-slate-700 mx-auto flex items-center justify-center text-slate-500 mb-3">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-slate-400">No active alerts at the moment.</p>
            </div>
          </div>
        </div>

        <!-- Recent Shipments Placeholder -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
            <h3 class="font-semibold text-white">Recent Shipments</h3>
            <a href="#" class="text-sm text-indigo-400 hover:text-indigo-300">View all</a>
          </div>
          <div class="p-6">
            <div class="text-center py-8">
              <div class="w-12 h-12 rounded-full bg-slate-700 mx-auto flex items-center justify-center text-slate-500 mb-3">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p class="text-slate-400">No recent shipments to display.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);

  stats = {
    activeVehicles: 0,
    totalVehicles: 0,
    activeShipments: 0,
    activeAlerts: 0
  };

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    // We will integrate with real endpoints once they are available in the backend.
    // For now, these are mock statistics.
    this.stats = {
      activeVehicles: 12,
      totalVehicles: 45,
      activeShipments: 28,
      activeAlerts: 3
    };
  }
}
