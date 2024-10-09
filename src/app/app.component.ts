import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null; // Store the selected contact
  showDialog = false;  // Controls the visibility of the custom dialog
  isEditMode = false;  // To differentiate between Add and Edit mode
  contactToEdit: Contact = { id: 0, name: '', phoneNumber: '', address: '', isFavorite: false };  // Initialize with default values

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // Subscribe to the contacts observable to get the updated list
    this.contactService.contacts$.subscribe((contacts) => {
      this.contacts = contacts;
    });

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
    this.contactService.deleteContacts([contact.id]);  // Delete the contact using the service
    this.selectedContact = null;  // Clear the selection after deletion
  }

  // Open the dialog for editing an existing contact
  openEditContactDialog(contact: Contact): void {
    this.isEditMode = true;
    this.contactToEdit = { ...contact }; // Copy the contact to be edited
    this.showDialog = true;  // Show the dialog for editing
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
        phoneNumber: contactForm.value.phoneNumber,
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

    this.closeDialog();
  }

  // Method to set selected contact when emitted from ContactListComponent
  onContactSelected(contact: Contact) {
    this.selectedContact = contact;
  }
}
