import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [
    { id: 1, name: 'Adi', phoneNumber: '9203285932', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: true },
    { id: 2, name: 'Bahi', phoneNumber: '1234567890', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: false },  
    { id: 3, name: 'Ashok', phoneNumber: '1234567890', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: false },
    { id: 4, name: 'Adi', phoneNumber: '9203285932', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: true },
    { id: 5, name: 'Bahi', phoneNumber: '1234567890', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: false },  
    { id: 6, name: 'Ashok', phoneNumber: '1234567890', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: false },
    { id: 7, name: 'Adi', phoneNumber: '9203285932', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: true },
    { id: 8, name: 'Bahi', phoneNumber: '1234567890', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: false },  
    { id: 9, name: 'Ashok', phoneNumber: '1234567890', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: false },
    { id: 10, name: 'Adi', phoneNumber: '9203285932', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: true },
    { id: 11, name: 'Bahi', phoneNumber: '1234567890', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: false },  
    { id: 12, name: 'Ashok', phoneNumber: '1234567890', address: 'Xyz Street in abc cross, Bengaluru', isFavorite: false }
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
