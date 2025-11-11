import { Component } from '@angular/core';
import {
  MessageSidebarChat,
  MessageSidebarFilters,
  MessageSidebarHeader,
  MessageSidebarSearch,
} from './components';

@Component({
  selector: 'app-message-sidebar',
  imports: [MessageSidebarHeader, MessageSidebarSearch, MessageSidebarFilters, MessageSidebarChat],
  templateUrl: './message-sidebar.html',
  styleUrl: './message-sidebar.css',
})
export class MessageSidebar {}
