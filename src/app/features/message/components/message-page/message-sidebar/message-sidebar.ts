import { Component } from '@angular/core';
import { MessageSidebarHeader } from './components/message-sidebar-header/message-sidebar-header';
import { MessageSidebarSearch } from './components/message-sidebar-search/message-sidebar-search';
import { MessageSidebarFilters } from './components/message-sidebar-filters/message-sidebar-filters';
import { MessageSidebarChat } from './components/message-sidebar-chat/message-sidebar-chat';

@Component({
  selector: 'app-message-sidebar',
  imports: [MessageSidebarHeader, MessageSidebarSearch, MessageSidebarFilters, MessageSidebarChat],
  templateUrl: './message-sidebar.html',
  styleUrl: './message-sidebar.css',
})
export class MessageSidebar {}
