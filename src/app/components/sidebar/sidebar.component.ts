import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { ContactService } from 'src/app/contact.service';
import { Contact } from 'src/app/contact.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(public dialog: MatDialog, private contactService: ContactService) {}

  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '300px',
      data: null // No data for adding new contact
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add contact logic if result exists
        const newContact: Contact = {
          id: Date.now(),
          name: result.name,
          phoneNumber: result.phoneNumber,
          address: result.address,
          isFavorite: false
        };
        this.contactService.addContact(newContact);
      }
    });
  }
}
