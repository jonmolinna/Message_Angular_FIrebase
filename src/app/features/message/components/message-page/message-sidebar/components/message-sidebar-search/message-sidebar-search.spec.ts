import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSidebarSearch } from './message-sidebar-search';

describe('MessageSidebarSearch', () => {
  let component: MessageSidebarSearch;
  let fixture: ComponentFixture<MessageSidebarSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSidebarSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSidebarSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
