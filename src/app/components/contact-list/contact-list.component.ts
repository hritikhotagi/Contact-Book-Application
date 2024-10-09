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
  
  @Input() selectedContact: Contact | null = null;
  @Output() contactSelected = new EventEmitter<Contact | null>();

  deleteMode: boolean = false;
  selectedContactsForDelete: Set<number> = new Set();

  searchTerm: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.contacts$.subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    this.contactSelected.emit(contact);
  }

  enterDeleteMode() {
    this.deleteMode = true;
  }

  exitDeleteMode() {
    this.deleteMode = false;
    this.selectedContactsForDelete.clear();
  }

  toggleDeleteSelection(contactId: number) {
    if (this.selectedContactsForDelete.has(contactId)) {
      this.selectedContactsForDelete.delete(contactId);
    } else {
      this.selectedContactsForDelete.add(contactId);
    }
  }

  isSelectedForDelete(contactId: number): boolean {
    return this.selectedContactsForDelete.has(contactId);
  }

  isSelectedForDisplay(contact: Contact): boolean {
    return this.selectedContact?.id === contact.id;
  }

  deleteContacts() {
    const contactIdsToDelete = Array.from(this.selectedContactsForDelete);
    
    if (this.selectedContact && contactIdsToDelete.includes(this.selectedContact.id)) {
      this.contactSelected.emit(null);
      this.selectedContact = null;
    }

    this.contactService.deleteContacts(contactIdsToDelete);
    
    this.exitDeleteMode();
  }

  filteredContacts() {
    let filteredContacts = this.contacts;

    if (this.searchTerm) {
      filteredContacts = this.contacts.filter(contact => 
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.phoneNumber.includes(this.searchTerm)
      );
    }

    return filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
  }
}
