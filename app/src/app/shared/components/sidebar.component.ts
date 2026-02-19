import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TokenStorageService } from 'app/core/services/token-storage.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class Sidebar {
  user: any;
  permissions: any;

  constructor(
    private storage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
    this.permissions = this.user?.permissions || [];
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  logout() {
    this.storage.signout();
    this.router.navigate(['/login']);
  }
}
