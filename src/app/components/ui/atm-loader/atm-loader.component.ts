import { Component, Input } from '@angular/core';

@Component({
  selector: 'atm-loader',
  templateUrl: './atm-loader.component.html',
  styleUrl: './atm-loader.component.scss',
})
export class AtmLoaderComponent {
  @Input()
  message: string | null = null;
}
