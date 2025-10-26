import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSidebarFilters } from './message-sidebar-filters';

describe('MessageSidebarFilters', () => {
  let component: MessageSidebarFilters;
  let fixture: ComponentFixture<MessageSidebarFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSidebarFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSidebarFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
