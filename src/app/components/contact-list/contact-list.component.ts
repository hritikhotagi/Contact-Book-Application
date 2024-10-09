import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { Contact } from 'src/app/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  
  @Input() selectedContact: Contact | null = null;  // To handle contact selection for highlighting
  @Output() contactSelected = new EventEmitter<Contact | null>();  // Emit null when contacts are deleted

  deleteMode: boolean = false;  // Controls delete mode
  selectedContactsForDelete: Set<number> = new Set();  // Store IDs of selected contacts for deletion

  // Variable to store search term
  searchTerm: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // Subscribe to the contacts$ observable to update the contact list whenever it changes
    this.contactService.contacts$.subscribe(contacts => {
      this.contacts = contacts;
    });
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
    return this.selectedContact?.id === contact.id;
  }

  // Delete selected contacts
  deleteContacts() {
    const contactIdsToDelete = Array.from(this.selectedContactsForDelete);
    
    // If the selected contact is being deleted, clear the selected contact
    if (this.selectedContact && contactIdsToDelete.includes(this.selectedContact.id)) {
      this.contactSelected.emit(null);  // Emit null to clear the contact details
      this.selectedContact = null;
    }

    // Use the service method to delete contacts
    this.contactService.deleteContacts(contactIdsToDelete);
    
    this.exitDeleteMode();  // Exit delete mode after deletion
  }

  // Method to filter contacts based on search term and sort alphabetically
  filteredContacts() {
    // Filter contacts based on search term
    let filteredContacts = this.contacts;

    if (this.searchTerm) {
      filteredContacts = this.contacts.filter(contact => 
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.phoneNumber.includes(this.searchTerm)
      );
    }

    // Sort the filtered contacts alphabetically by name
    return filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
  }
}
