import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() addContact = new EventEmitter<void>();

  openAddContactDialog(): void {
    this.addContact.emit();  // Emit event to open the add contact dialog
  }
}
