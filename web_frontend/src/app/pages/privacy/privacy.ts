import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css'
})
export class PrivacyComponent {
  lastUpdated = '28 de junio de 2026';
}