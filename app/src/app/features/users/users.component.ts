import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Sidebar } from 'app/shared/components/sidebar.component';

@Component({
  selector: 'app-users',
  imports: [Sidebar],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class Users {

}
