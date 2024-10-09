import { Component, Output, EventEmitter } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { Contact } from 'src/app/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  contacts: Contact[] = [];
  @Output() selected = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  selectContact(contact: Contact) {
    this.selected.emit(contact); // Emit the selected contact to the parent component
  }
}
