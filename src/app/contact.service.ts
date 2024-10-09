import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [
    { id: 1, name: 'Adi', phoneNumber: '9203285932', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: true },
    // Hardcoded contacts
  ];

  getContacts() {
    return this.contacts;
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
  }

  updateContact(updatedContact: Contact) {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
  }

  deleteContacts(contactIds: number[]) {
    this.contacts = this.contacts.filter(contact => !contactIds.includes(contact.id));
  }
}
