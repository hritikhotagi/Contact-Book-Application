import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from './contact.service';
import { Contact } from './contact.model';
import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contacts: Contact[] = [];
  selectedContactIds: number[] = [];

  constructor(public dialog: MatDialog, private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  openContactDialog(contact?: Contact): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '300px',
      data: contact || null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (contact) {
          this.contactService.updateContact({ ...contact, ...result });
        } else {
          this.contactService.addContact({ id: Date.now(), ...result, isFavorite: false });
        }
        this.contacts = this.contactService.getContacts();
      }
    });
  }

  deleteSelectedContacts(): void {
    this.contactService.deleteContacts(this.selectedContactIds);
    this.contacts = this.contactService.getContacts();
    this.selectedContactIds = [];
  }
}