import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSidebarHeader } from './message-sidebar-header';

describe('MessageSidebarHeader', () => {
  let component: MessageSidebarHeader;
  let fixture: ComponentFixture<MessageSidebarHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSidebarHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSidebarHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
