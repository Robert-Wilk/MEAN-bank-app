import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userContent: any;
  accountContent: any;
  accountCount: number = 2;
  accountHad: string = "Checking";

  errorMessage = '';

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.getUserInfo().subscribe({
      next: data => {
        this.userContent = data[0];
        this.accountContent = data[1];
        
        // Format code
        if (this.accountContent.length === 0) {
          this.accountCount = 0;
        } else if (this.accountContent.length === 1) {
          this.accountCount = 1;
          this.accountContent = this.accountContent[0]
          this.accountHad = this.accountContent.accountType
        } else if (this.accountContent[0].accountType === "Savings") {
          // Swap so that order of accounts is always checking -> savings
          var temp = this.accountContent[0];
          this.accountContent[0] = this.accountContent[1];
          this.accountContent[1] = temp;
        }
      },
      error: err => {
        this.userContent = JSON.parse(err.error).message;
      }
    });
  }

  createCheckingAccount(): void {
    this.user.createCheckingAccount().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
      complete: () => {
        alert('Checking Account Created!');
        this.reloadPage();
      }
    });
  }
  createSavingsAccount(): void {
    this.user.createSavingsAccount().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
      complete: () => {
        alert('Savings Account Created!');
        this.reloadPage();
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}