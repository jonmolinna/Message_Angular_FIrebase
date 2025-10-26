import { Component, signal, WritableSignal } from '@angular/core';
import { FadeIn } from '../../../../../../../shared/directive';

@Component({
  selector: 'app-message-sidebar-search',
  imports: [FadeIn],
  templateUrl: './message-sidebar-search.html',
  styleUrl: './message-sidebar-search.css'
})
export class MessageSidebarSearch {
  inputSearch: WritableSignal<string> = signal('');
}
