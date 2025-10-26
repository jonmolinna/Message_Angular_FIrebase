import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../store';
import { MessageSidebar } from '../../components/message-page/message-sidebar/message-sidebar';

@Component({
  selector: 'app-message-page',
  imports: [MessageSidebar],
  templateUrl: './message-page.html',
  styleUrl: './message-page.css'
})
export class MessagePage {
  authStore = inject(AuthStore);

}
