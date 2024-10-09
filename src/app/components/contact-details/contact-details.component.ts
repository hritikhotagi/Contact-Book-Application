import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/contact.model';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { ContactService } from 'src/app/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  @Input() selectedContact: Contact | null = null; // Input to receive the selected contact

  constructor(public dialog: MatDialog, private contactService: ContactService) {}

  editContact(contact: Contact) {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '300px',
      data: contact // Pass the existing contact data for editing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedContact = {
          ...contact,
          name: result.name,
          address: result.address
        };
        this.contactService.updateContact(updatedContact);
      }
    });
  }
}
