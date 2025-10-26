import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { DROPDOWN_OPTION } from './model/dropdown.model';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);

  // INPUT
  @Input() options: DROPDOWN_OPTION[] = [];
  @Input() icon: SafeHtml = '';
  @Input() position: 'left' | 'right' | 'center' = 'left';
  @Input() closeOnClickOutside: boolean = true;
  @Input() closeOnSelect: boolean = true;
  @Input() classes: string = '';

  // EVENTS
  @Output() optionSelected = new EventEmitter<DROPDOWN_OPTION>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  // STATE
  isOpen: WritableSignal<boolean> = signal(false);
  isVisible: WritableSignal<boolean> = signal(false);
  private animationTimeout?: number;
  private handleDocumentClick = this.onDocumentClick.bind(this);

  // COMPUTED
  menuClasses = computed<string>(() => {
    const baseClasses = 'w-56 focus:outline-none';
    const positionClasses =
      this.position === 'left'
        ? 'left-0'
        : this.position === 'right'
        ? 'right-0'
        : 'left-1/2 -translate-x-1/2';

    return `${baseClasses} ${positionClasses}`;
  });

  triggerId = `dropdown-trigger-${Math.random().toString(36).slice(2, 11)}`;

  // METODOS PUBLICOS
  open(): void {
    this.isOpen.set(true);

    setTimeout(() => {
      this.isVisible.set(true);
    }, 10);

    this.opened.emit();
  }

  close(): void {
    this.isVisible.set(false);

    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    this.animationTimeout = setTimeout(() => {
      this.isOpen.set(false);
      this.closed.emit();
    }, 200) as any;
  }

  toggle() {
    this.isOpen() ? this.close() : this.open();
  }

  selectOption(option: DROPDOWN_OPTION): void {
    if (option.disabled) return;
    this.optionSelected.emit(option);

    if (this.closeOnSelect) {
      this.close();
    }
  }

  // Event Handlers
  private onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  onArrowDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    if (!this.isOpen()) {
      this.open();
    }

    // TODO: Focus next option
  }

  onArrowUp(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    if (!this.isOpen()) {
      this.open();
    }

    // TODO: Focus previous option
  }

  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.toggle();
  }

  // Ciclo de Vida
  ngOnInit(): void {
    if (this.closeOnClickOutside) {
      document.addEventListener('click', this.handleDocumentClick);
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleDocumentClick);

    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }
}
