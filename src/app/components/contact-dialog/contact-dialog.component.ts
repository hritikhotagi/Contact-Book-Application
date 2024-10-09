import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/contact.model';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {
  contactForm: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data;
    this.contactForm = this.fb.group({
      name: [data ? data.name : ''],
      phoneNumber: [{ value: data ? data.phoneNumber : '', disabled: this.isEditMode }],
      address: [data ? data.address : ''],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.contactForm.getRawValue());
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
