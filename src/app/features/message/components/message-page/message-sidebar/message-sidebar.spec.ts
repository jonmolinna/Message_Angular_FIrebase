import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSidebar } from './message-sidebar';

describe('MessageSidebar', () => {
  let component: MessageSidebar;
  let fixture: ComponentFixture<MessageSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
