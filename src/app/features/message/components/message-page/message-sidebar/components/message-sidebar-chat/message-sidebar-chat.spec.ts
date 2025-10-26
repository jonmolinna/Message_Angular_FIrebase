import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSidebarChat } from './message-sidebar-chat';

describe('MessageSidebarChat', () => {
  let component: MessageSidebarChat;
  let fixture: ComponentFixture<MessageSidebarChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSidebarChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSidebarChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
