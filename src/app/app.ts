import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { AuthStore } from './store';
import { Loader } from './shared/components/component/loader/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, Loader],
  templateUrl: './app.html',
})
export class App {
  authStore = inject(AuthStore);
}
