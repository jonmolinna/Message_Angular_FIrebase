import { Component, inject } from '@angular/core';
import { Dropdown } from '../../../../../../../shared/components/ui/dropdown/dropdown';
import { DROPDOWN_OPTION } from '../../../../../../../shared/components/ui/dropdown/model/dropdown.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthStore } from '../../../../../../../store';
import { CapitalizeLetterPipe } from '../../../../../../../shared/pipes';

@Component({
  selector: 'app-message-sidebar-header',
  imports: [Dropdown, CapitalizeLetterPipe],
  templateUrl: './message-sidebar-header.html',
  styleUrl: './message-sidebar-header.css',
})
export class MessageSidebarHeader {
  private sanitizer = inject(DomSanitizer);

  private authStore = inject(AuthStore);

  // VARIABLES STORE
  avatar = this.authStore.userPhoto
  name = this.authStore.userDisplayName;

  // METODOS
  selectOption(option: DROPDOWN_OPTION): void {
    console.log("session -----------> ", option)
    if (option.value === 'cerrar-sesion') {
      this.authStore.signOut();
      console.log("CERRANDO SESSION")
    }
  }

  // OPCIONES PARA EL MENU
  options: DROPDOWN_OPTION[] = [
    {
      label: 'Nuevo grupo',
      value: 'nuevo-grupo',
      icon: this.sanitizer
        .bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
`),
    },
    {
      label: 'Cerrar sesión',
      value: 'cerrar-sesion',
      icon: this.sanitizer
        .bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
</svg>
`),
    },
  ];
}
