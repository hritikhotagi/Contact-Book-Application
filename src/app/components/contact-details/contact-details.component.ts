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
  @Output() updateFavorite = new EventEmitter<Contact>();

  showDeleteDialog = false;

  triggerEditContact(contact: Contact) {
    this.editContact.emit(contact);
  }

  openDeleteDialog() {
    this.showDeleteDialog = true;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
  }

  confirmDelete() {
    if (this.selectedContact) {
      this.deleteContact.emit(this.selectedContact);
      this.closeDeleteDialog();
    }
  }

  toggleFavorite() {
    if (this.selectedContact) {
      this.selectedContact.isFavorite = !this.selectedContact.isFavorite;
      this.updateFavorite.emit(this.selectedContact);
    }
  }
}
