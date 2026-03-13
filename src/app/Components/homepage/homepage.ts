import { Component } from '@angular/core';
import { Reveal } from '../../Directives/reveal';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [Reveal, ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {}