import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatSidenavModule, MatList, MatListItem],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app');
}
