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
  showDialog = false;  // Controls the visibility of the custom dialog
  isEditMode = false;  // To differentiate between Add and Edit mode
  contactToEdit: Contact = { id: 0, name: '', phoneNumber: '', address: '', isFavorite: false };  // Initialize with default values

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
    this.contactToEdit = { id: 0, name: '', phoneNumber: '', address: '', isFavorite: false }; // Reset contact for adding
    this.showDialog = true;  // Show the dialog for adding a contact
  }

  deleteContact(contact: Contact): void {
    // Perform the delete action here, such as removing the contact from the array
    this.contactService.deleteContacts([contact.id]);
    this.selectedContact = null;  // Clear the selection after deletion
    this.refreshContacts();  // Refresh contact list
  }

  // Open the dialog for editing an existing contact
  openEditContactDialog(contact: Contact): void {
    this.isEditMode = true;
    this.contactToEdit = { ...contact }; // Copy the contact to be edited
    this.showDialog = true;  // Show the dialog for editing
  }

  // Handle favorite toggle
  onFavoriteToggled(updatedContact: Contact) {
    this.contactService.updateContact(updatedContact);  // Update the contact in the service
    this.refreshContacts();  // Refresh contact list
  }

  // Refresh contacts and set the updated contact as selected
  refreshContacts(): void {
    this.contacts = this.contactService.getContacts();
    if (this.selectedContact) {
      this.selectedContact = this.contacts.find(c => c.id === this.selectedContact!.id) || null;
    }
  }

  // Method to close the dialog
  closeDialog(): void {
    this.showDialog = false;
  }

  // Handle form submission for both add and edit
  handleSubmit(contactForm: any): void {
    if (!contactForm.valid) {
      return;
    }

    if (this.isEditMode) {
      // Update existing contact
      const updatedContact = {
        ...this.contactToEdit,
        name: contactForm.value.name,
        phoneNumber: this.contactToEdit.phoneNumber,  // Keep the original phone number since it's disabled
        address: contactForm.value.address
      };
      this.contactService.updateContact(updatedContact);
    } else {
      // Add new contact
      const newContact: Contact = {
        id: Date.now(),
        name: contactForm.value.name,
        phoneNumber: contactForm.value.phoneNumber,
        address: contactForm.value.address,
        isFavorite: false
      };
      this.contactService.addContact(newContact);
    }

    this.refreshContacts();  // Refresh contact list after add/edit
    this.closeDialog();
  }

  // Method to set selected contact when emitted from ContactListComponent
  onContactSelected(contact: Contact) {
    this.selectedContact = contact;
  }
}
