import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import './hello-world.js';
import './radio-group.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  readonly initialColor = 'red';

  @ViewChild('helloWorldElement') helloWorldElement!: ElementRef;

  ngAfterViewInit(): void {
    this.updateColor(this.initialColor);
  }

  handleChange(event: Event) {
    const color = (event as CustomEvent).detail.value;
    this.updateColor(color);
  }

  updateColor(color: string) {
    //TODO: Why is this called before this.helloWorldElement is set?
    if (!this.helloWorldElement) return;
    this.helloWorldElement.nativeElement.style.color = color;
  }
}
