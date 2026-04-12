import { Component } from '@angular/core';
import { Reveal } from '../../Directives/reveal';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [Reveal, RouterModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {}