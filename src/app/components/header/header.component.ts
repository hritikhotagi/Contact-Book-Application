import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() addContact = new EventEmitter<void>();

  openAddContactDialog(): void {
    this.addContact.emit();
  }

}
