import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  @Input() selectedContact: Contact | null = null;
  @Output() editContact = new EventEmitter<Contact>();
  @Output() deleteContact = new EventEmitter<Contact>();

  showDeleteDialog = false; // Controls visibility of the custom delete dialog

  // Trigger the edit action
  triggerEditContact(contact: Contact) {
    this.editContact.emit(contact);
  }

  // Open the custom delete confirmation dialog
  openDeleteDialog() {
    this.showDeleteDialog = true;
  }

  // Close the custom delete confirmation dialog
  closeDeleteDialog() {
    this.showDeleteDialog = false;
  }

  // Confirm delete action
  confirmDelete() {
    if (this.selectedContact) {
      this.deleteContact.emit(this.selectedContact);
      this.closeDeleteDialog();
    }
  }

  // Toggle favorite status
  toggleFavorite() {
    if (this.selectedContact) {
      this.selectedContact.isFavorite = !this.selectedContact.isFavorite;
    }
  }
}
