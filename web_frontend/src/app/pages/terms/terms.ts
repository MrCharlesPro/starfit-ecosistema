import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './terms.html',
  styleUrl: './terms.css'
})
export class TermsComponent {
  lastUpdated = '28 de junio de 2026';
}