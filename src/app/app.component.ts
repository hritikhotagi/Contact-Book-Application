import { Component } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  showDialog = false;
  isEditMode = false;
  contactToEdit: Contact = { id: 0, name: '', phoneNumber: '', address: '', isFavorite: false };

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();

    if (this.contacts.length > 0) {
      this.selectedContact = this.contacts[0];
    }
  }

  // Open the dialog for adding a new contact
  openAddContactDialog(): void {
    this.isEditMode = false;
    this.contactToEdit = { id: 0, name: '', phoneNumber: '', address: '', isFavorite: false };
    this.showDialog = true;
  }

  deleteContact(contact: Contact): void {
    this.contactService.deleteContacts([contact.id]);
    this.selectedContact = null;
    this.refreshContacts(); 
  }

  // Open the dialog for editing an existing contact
  openEditContactDialog(contact: Contact): void {
    this.isEditMode = true;
    this.contactToEdit = { ...contact };
    this.showDialog = true;
  }

  onFavoriteToggled(updatedContact: Contact) {
    this.contactService.updateContact(updatedContact);
    this.refreshContacts();
  }

  refreshContacts(): void {
    this.contacts = this.contactService.getContacts();
    if (this.selectedContact) {
      this.selectedContact = this.contacts.find(c => c.id === this.selectedContact!.id) || null;
    }
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  handleSubmit(contactForm: any): void {
    if (!contactForm.valid) {
      return;
    }

    if (this.isEditMode) {
      const updatedContact = {
        ...this.contactToEdit,
        name: contactForm.value.name,
        phoneNumber: this.contactToEdit.phoneNumber,
        address: contactForm.value.address
      };
      this.contactService.updateContact(updatedContact);
    } else {
      const newContact: Contact = {
        id: Date.now(),
        name: contactForm.value.name,
        phoneNumber: contactForm.value.phoneNumber,
        address: contactForm.value.address,
        isFavorite: false
      };
      this.contactService.addContact(newContact);
    }

    this.refreshContacts();
    this.closeDialog();
  }

  onContactSelected(contact: Contact | null) {
    this.selectedContact = contact;
  }
}
