import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [
    { id: 1, name: 'Amit', phoneNumber: '9876543210', address: '123 MG Road, Delhi', isFavorite: true },
    { id: 2, name: 'Riya', phoneNumber: '8765432109', address: '45 Park Street, Kolkata', isFavorite: false },
    { id: 3, name: 'Sunil', phoneNumber: '7654321098', address: '67 Residency Road, Mumbai', isFavorite: false },
    { id: 4, name: 'Pooja', phoneNumber: '6543210987', address: '89 Brigade Road, Bengaluru', isFavorite: true },
    { id: 5, name: 'Rahul', phoneNumber: '5432109876', address: '101 Anna Nagar, Chennai', isFavorite: false },
    { id: 6, name: 'Anjali', phoneNumber: '4321098765', address: '15 Gariahat Road, Kolkata', isFavorite: true },
    { id: 7, name: 'Rohan', phoneNumber: '3210987654', address: '76 Jubilee Hills, Hyderabad', isFavorite: false },
    { id: 8, name: 'Sneha', phoneNumber: '2109876543', address: '98 Andheri West, Mumbai', isFavorite: true },
    { id: 9, name: 'Karan', phoneNumber: '1098765432', address: '21 Banjara Hills, Hyderabad', isFavorite: false },
    { id: 10, name: 'Meera', phoneNumber: '9876054321', address: '34 Lavelle Road, Bengaluru', isFavorite: true },
    { id: 11, name: 'Vikram', phoneNumber: '8765043219', address: '56 CP Ramaswamy Road, Chennai', isFavorite: false },
    { id: 12, name: 'Sanya', phoneNumber: '7654032198', address: '67 DLF Phase 3, Gurgaon', isFavorite: false },
    { id: 13, name: 'Manish', phoneNumber: '6543021987', address: '89 Model Town, Delhi', isFavorite: true },
    { id: 14, name: 'Nisha', phoneNumber: '5432019876', address: '45 Alkapuri, Vadodara', isFavorite: false },
    { id: 15, name: 'Arjun', phoneNumber: '4321098765', address: '78 Connaught Place, Delhi', isFavorite: true }
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
