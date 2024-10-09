import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { Contact } from 'src/app/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  contacts: Contact[] = [];
  
  @Input() selectedContact: Contact | null = null;  // To handle contact selection for highlighting
  @Output() contactSelected = new EventEmitter<Contact>();

  deleteMode: boolean = false;  // Controls delete mode
  selectedContactsForDelete: Set<number> = new Set();  // Store IDs of selected contacts for deletion

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  // Emit the selected contact for highlighting (not related to deletion)
  selectContact(contact: Contact) {
    this.selectedContact = contact;
    this.contactSelected.emit(contact);
  }

  // Enter delete mode
  enterDeleteMode() {
    this.deleteMode = true;
  }

  // Exit delete mode and clear selected contacts
  exitDeleteMode() {
    this.deleteMode = false;
    this.selectedContactsForDelete.clear();
  }

  // Toggle contact selection in delete mode
  toggleDeleteSelection(contactId: number) {
    if (this.selectedContactsForDelete.has(contactId)) {
      this.selectedContactsForDelete.delete(contactId);
    } else {
      this.selectedContactsForDelete.add(contactId);
    }
  }

  // Check if a contact is selected for deletion
  isSelectedForDelete(contactId: number): boolean {
    return this.selectedContactsForDelete.has(contactId);
  }

  // Check if a contact is selected for display/highlighting
  isSelectedForDisplay(contact: Contact): boolean {
    return this.selectedContact ? contact.id === this.selectedContact.id : false;
  }

  // Delete selected contacts
  deleteContacts() {
    this.contacts = this.contacts.filter(contact => !this.selectedContactsForDelete.has(contact.id));
    this.exitDeleteMode();  // Exit delete mode after deletion
  }
}
