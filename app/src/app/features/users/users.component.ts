import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { UsersService } from 'app/core/services/users.service';
import { Sidebar } from 'app/shared/components/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

/**
 * Users Management Component
 *
 * Displays a table of all users in the system with their roles and permissions.
 * Handles loading states, error states, and empty states gracefully.
 */
@Component({
  selector: 'app-users',
  imports: [Sidebar, MatTableModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class Users {
  /** Column definitions for the Angular Material table */
  displayedColumns: string[] = ['email', 'role', 'permissions'];

  /** Data source array for the table - holds the user records */
  dataSource: any[] = [];

  /** Loading state flag - shows spinner while fetching data */
  loading = true;

  /** Error message string - displays when API request fails */
  error = '';

  /**
   * Constructor
   * @param usersService - Service for fetching user data from the backend
   * @param cdr - Change detector for manually triggering UI updates after async operations
   */
  constructor(
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
  ) {}

  /**
   * Lifecycle hook - runs when component initializes
   * Fetches the users list from the backend API
   */
  ngOnInit(): void {
    // Set loading state to true before making the request
    this.loading = true;

    this.usersService
      .getUsers()
      .pipe(
        // finalize() ensures loading is cleared even if the request throws an error
        // This prevents the UI from getting stuck in a loading state
        finalize(() => {
          this.loading = false;
          // Manually trigger change detection to update the view immediately
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        // Success handler - executes when API returns data successfully
        next: (response) => {
          // Normalize the response to handle different API response formats
          const users = this.normalizeUsersResponse(response);
          this.dataSource = users;
          this.error = '';

          // Force UI update after data is loaded
          this.cdr.detectChanges();
        },
        // Error handler - executes when API request fails
        error: (err: any) => {
          this.error = err?.error?.message || 'Failed to load users. Please try again.';
          this.dataSource = [];

          // Force UI update to show error message
          this.cdr.detectChanges();
        },
      });
  }

  /**
   * Normalizes different backend response formats to a consistent array structure
   *
   * Handles three response formats:
   * 1. Direct array: [user1, user2, ...]
   * 2. Wrapped object: { users: [user1, user2, ...] }
   * 3. Invalid format: returns empty array with warning
   *
   * @param response - The raw HTTP response from the backend
   * @returns Array of user objects, or empty array if format is invalid
   */
  private normalizeUsersResponse(response: unknown): any[] {
    // Case 1: Response is already an array
    if (Array.isArray(response)) {
      return response;
    }

    // Case 2: Response is an object with a 'users' property containing an array
    if (
      response &&
      typeof response === 'object' &&
      'users' in response &&
      Array.isArray((response as { users?: unknown }).users)
    ) {
      return (response as { users: any[] }).users;
    }

    // Case 3: Unexpected format - log warning and return empty array
    console.warn('Unexpected users response shape:', response);
    return [];
  }

  /**
   * Sorts an array of permission strings alphabetically
   *
   * Creates a copy of the array to avoid mutating the original data.
   * Handles null/undefined permissions gracefully.
   *
   * @param permissions - Array of permission strings (e.g., ['MANAGE_USERS', 'VIEW_PATIENTS'])
   * @returns Sorted copy of the permissions array
   */
  sortPermissions(permissions: string[] | null | undefined): string[] {
    return [...(permissions ?? [])].sort((a, b) => a.localeCompare(b));
  }

  editUser(user: any) {
    console.log('Edit User: ', user);
    // Navigation to edit user page /admin/users/:id/edit
  }

  changeRole(user: any) {
    console.log('Change Role for User: ', user);
    // Open a modal to select a new role for the user and update it
  }

  deleteUser(user: any) {
    if (
      !confirm(`Are you sure you want to delete user ${user.email}? This action cannot be undone.`)
    ) {
      return;
    }

    this.usersService.deleteUser(user.id).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter((user) => user.id !== user.id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to delete user: ', err);
        alert('Failed to delete user. Please try again.');
      },
    });
  }
}
