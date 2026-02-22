import { Component } from '@angular/core';
import { TokenStorageService } from 'app/core/services/token-storage.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { Sidebar } from 'app/shared/components/sidebar.component';

export interface LoggedUser {
  email: string;
  role: string;
  permissions: string[];
}

export interface SystemActivity {
  date: string;
  time: string;
  email: string;
  role: string;
  activity: string;
}

export interface QuickInformation {
  activeUsers: number;
  totalUsers: number;
  totalPatients: number;
  todayAppointments: number;
  canceledAppointments: number;
}

const ACTIVITY_DATA: SystemActivity[] = [
  {
    date: '2024-06-01',
    time: '10:43',
    email: 'admin@medsoft.local',
    role: 'Admin',
    activity: 'Logged in',
  },
  {
    date: '2025-02-17',
    time: '13:44',
    email: 'doctor@medsoft.local',
    role: 'Doctor',
    activity: 'Updated patient record',
  },
  {
    date: '2025-02-13',
    time: '04:44',
    email: 'reception@medsoft.local',
    role: 'Receptionist',
    activity: 'New appointment scheduled',
  },
];

const QUICK_INFO: QuickInformation[] = [
  {
    activeUsers: 5,
    totalUsers: 44,
    totalPatients: 120,
    todayAppointments: 9,
    canceledAppointments: 2,
  },
];

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, MatTableModule, Sidebar],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class Dashboard {
  user: LoggedUser | null = null;

  constructor(private storage: TokenStorageService) {}

  displayedColumns: string[] = ['date', 'time', 'email', 'role', 'activity'];
  dataSource = ACTIVITY_DATA;

  quickInfo = QUICK_INFO;

  ngOnInit() {
    this.user = this.storage.getUser();
    console.log('Logged User Permissions: ', this.user?.permissions || []);
  }

  hasPermission(permission: string): boolean {
    return this.user?.permissions.includes(permission) || false;
  }
}
