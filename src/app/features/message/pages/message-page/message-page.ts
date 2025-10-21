import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../store';

@Component({
  selector: 'app-message-page',
  imports: [],
  templateUrl: './message-page.html',
  styleUrl: './message-page.css'
})
export class MessagePage {
  authStore = inject(AuthStore);

}
