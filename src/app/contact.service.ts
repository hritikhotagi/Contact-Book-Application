import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [
    { id: 1, name: 'Amit', phoneNumber: '9876543210', address: '123 MG Road, Delhi', isFavorite: true },
    { id: 2, name: 'Anjali', phoneNumber: '4321098765', address: '15 Gariahat Road, Kolkata', isFavorite: true },
    { id: 3, name: 'Arjun', phoneNumber: '4321098765', address: '78 Connaught Place, Delhi', isFavorite: true },
    { id: 4, name: 'Karan', phoneNumber: '1098765432', address: '21 Banjara Hills, Hyderabad', isFavorite: false },
    { id: 5, name: 'Manish', phoneNumber: '6543021987', address: '89 Model Town, Delhi', isFavorite: true },
    { id: 6, name: 'Mouni', phoneNumber: '9876054321', address: '34 Lavelle Road, Bengaluru', isFavorite: true },
    { id: 7, name: 'Shraddha', phoneNumber: '5432019876', address: '45 Alkapuri, Vadodara', isFavorite: false },
    { id: 8, name: 'Pooja', phoneNumber: '6543210987', address: '89 Brigade Road, Bengaluru', isFavorite: true },
    { id: 9, name: 'Rahul', phoneNumber: '5432109876', address: '101 Anna Nagar, Chennai', isFavorite: false },
    { id: 10, name: 'Riya', phoneNumber: '8765432109', address: '45 Park Street, Kolkata', isFavorite: false },
    { id: 11, name: 'Rohan', phoneNumber: '3210987654', address: '76 Jubilee Hills, Hyderabad', isFavorite: false },
    { id: 12, name: 'Sanya', phoneNumber: '7654032198', address: '67 DLF Phase 3, Gurgaon', isFavorite: false },
    { id: 13, name: 'Sneha', phoneNumber: '2109876543', address: '98 Andheri West, Mumbai', isFavorite: true },
    { id: 14, name: 'Sunil', phoneNumber: '7654321098', address: '67 Residency Road, Mumbai', isFavorite: false },
    { id: 15, name: 'Vikram', phoneNumber: '8765043219', address: '56 CP Ramaswamy Road, Chennai', isFavorite: false }
  ];

  private contactsSubject = new BehaviorSubject<Contact[]>(this.contacts);

  contacts$ = this.contactsSubject.asObservable();

  getContacts() {
    return this.contactsSubject.value;
  }

  addContact(contact: Contact) {
    contact.id = Date.now();
    this.contacts.push(contact);
    this.contactsSubject.next([...this.contacts]);
  }

  updateContact(updatedContact: Contact) {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
      this.contactsSubject.next([...this.contacts]); 
    }
  }

  deleteContacts(contactIds: number[]) {
    this.contacts = this.contacts.filter(contact => !contactIds.includes(contact.id));
    this.contactsSubject.next([...this.contacts]);
  }
}