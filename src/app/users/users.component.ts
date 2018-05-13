import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, NgForm } from '@angular/forms';
// Import the DataService
import { DataService } from '../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  //Define form to add user details
  private myForm: FormGroup;

  // Define form to edit user details
  private myEditForm:  FormGroup;

  // Define a users property to hold our user data
  private users: Array<any>;

  // Define a user property to hold our username of particular user
  user:string;


  // Create an instance of the DataService through dependency injection
  constructor(private modalService: NgbModal,private fb: FormBuilder,private _dataService: DataService) { }

  ngOnInit() {
      this.myForm = this.fb.group({
        'username': ['', Validators.required],
        'address': ['', Validators.required],
        'email': ['', Validators.required],
        'contact': ['', Validators.required]
      });

      this.myEditForm = this.fb.group({
        'username': [{value:'', disabled:true}, Validators.required],
        'address': ['', Validators.required],
        'email': ['', Validators.required],
        'contact': ['', Validators.required]
      });
      
      this.users = [];

      // Get user list function
      this.getUsers();
  }
  
  //open add user modal popup
  openAddUserModal(addUserModal){
		 this.modalService.open(addUserModal);
  }

  // open edit user modal popup
  openEditUserModal(editUserModal,userDetails){
      this.myEditForm.controls['username'].setValue(userDetails.username);
      this.myEditForm.controls['contact'].setValue(userDetails.contact);
      this.myEditForm.controls['email'].setValue(userDetails.email);
      this.myEditForm.controls['address'].setValue(userDetails.address);
      this.user = userDetails.username;
      this.modalService.open(editUserModal);
  }


  // Access the Data Service's getUsers() method we defined
  getUsers(){
    this._dataService.getUsers()
        .subscribe(
         result => {
         if(result){
             this.users = result;
          }
        },
        error => {
            console.log(error);
            alert("Error while fetching user");
        });
  }

  // Access the Data Service's saveUser() method we defined
  addUser(form,d){
    this._dataService.saveUser(this.myForm.value)
        .subscribe(
         result => {
         if(result.success == true){
               this.getUsers();
               this.myForm.reset();
               d('Cross click');
          }
        },
        error => {
            console.log(error);
            alert("Username should be unique");
        });
  }
  

  // Access the Data Service's editUser() method we defined
  editUser(form,d){
	 var data = {
	     username: this.user,
	     address: this.myEditForm.value.address,
	     contact: this.myEditForm.value.contact,
	     email: this.myEditForm.value.email,
	 }
    this._dataService.editUser(data)
        .subscribe(
         result => {
         if(result.success == true){
               this.getUsers();
               this.myEditForm.reset();
               d('Cross click');
          }
        },
        error => {
            console.log(error);
            alert("Error while updating user");
        });
  }


  // Access the Data Service's deleteUser() method we defined
  deleteUser(user){
      this._dataService.deleteUser(user.username)
        .subscribe(
         result => {
         if(result.success == true){
               this.getUsers();
          }
        },
        error => {
            alert("Error while deleting user");
        });
  }


}
