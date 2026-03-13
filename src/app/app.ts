import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Reveal} from './Directives/reveal'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Reveal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {

  protected readonly title = signal('InternPath');

  

  }
