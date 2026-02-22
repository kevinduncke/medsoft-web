import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { UsersService } from 'app/core/services/users.service';
import { Sidebar } from 'app/shared/components/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [Sidebar, MatTableModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class Users {
  displayedColumns: string[] = ['email', 'role', 'permissions'];
  dataSource: any[] = [];
  loading = true;
  error = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
        console.log('Loaded users: ', users);
        this.loading = false;
        this.error = '';
      },
      error: (err: any) => {
        console.error('Error loading users: ', err);
        this.error = err?.error?.message || 'Failed to load users. Please try again.';
        this.loading = false;
      },
    });
  }

  sortPermissions(permissions: string[]): string[] {
    return permissions.sort((a, b) => a.localeCompare(b));
  }
}
