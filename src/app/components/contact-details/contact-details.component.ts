import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  @Input() selectedContact: Contact | null = null;
  @Output() editContact = new EventEmitter<Contact>();  // EventEmitter to notify the parent component

  triggerEditContact(contact: Contact) {
    this.editContact.emit(contact); // Emit event to parent component
  }
}
