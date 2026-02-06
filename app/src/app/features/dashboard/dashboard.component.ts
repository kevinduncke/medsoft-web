import { Component } from '@angular/core';
import { TokenStorageService } from 'app/core/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class Dashboard {
  user: any;

  constructor(private storage: TokenStorageService) {}

  ngOnInit() {
    this.user = this.storage.getUser();
  }
}
