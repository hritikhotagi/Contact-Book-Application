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
  selectedContact: Contact | null = null; // Store the selected contact
  selectedContactIds: number[] = [];
  showDialog = false;  // Controls the visibility of the custom dialog
  isEditMode = false;  // To differentiate between Add and Edit mode
  contactToEdit: Contact | null = null;  // To store the contact that needs to be edited

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();

    // Set the first contact as default selected (if contacts exist)
    if (this.contacts.length > 0) {
      this.selectedContact = this.contacts[0];  // Select the first contact
    }
  }

  // Open the dialog for adding a new contact
  openAddContactDialog(): void {
    this.isEditMode = false;
    this.contactToEdit = null;
    this.showDialog = true;  // Show the dialog for adding a contact
  }

  // Open the dialog for editing an existing contact
  openEditContactDialog(contact: Contact): void {
    this.isEditMode = true;
    this.contactToEdit = contact;
    this.showDialog = true;  // Show the dialog for editing
  }

  // Method to close the dialog
  closeDialog(): void {
    this.showDialog = false;
  }

  // Handle form submission for both add and edit
  handleSubmit(contactData: any): void {
    if (this.isEditMode && this.contactToEdit) {
      // Update existing contact
      const updatedContact = {
        ...this.contactToEdit,
        name: contactData.name,
        address: contactData.address
      };
      this.contactService.updateContact(updatedContact);
    } else {
      // Add new contact
      const newContact: Contact = {
        id: Date.now(),
        name: contactData.name,
        phoneNumber: contactData.phoneNumber,
        address: contactData.address,
        isFavorite: false
      };
      this.contactService.addContact(newContact);
    }

    // Refresh contact list and close the dialog
    this.contacts = this.contactService.getContacts();
    this.closeDialog();
  }

  // Method to set selected contact when emitted from ContactListComponent
  onContactSelected(contact: Contact) {
    this.selectedContact = contact;
  }
}
