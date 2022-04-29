import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  userAccount: any;
  accountID: any;
  transactions: any;
  transactionsToShow: any;
  index: number = 0;
  lastIndex: number = 0;
  showViewMore: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private account: AccountService,
    private transaction: TransactionService
  ) { }

  ngOnInit(): void {
    this.accountID = this.route.snapshot.paramMap.get("id");
    this.account.getAccount(this.accountID).subscribe({
      next: data => {
        this.userAccount = data;
        this.dateFormatter();
        this.getTransactions();
      },
      error: err => {
        this.userAccount = JSON.parse(err.error).message;
      }
    });
  }
  dateFormatter(): void {
    var newDate: string[] = this.userAccount.createdAt.split('-');
    newDate[2] = newDate[2].substring(0,2);
    this.userAccount.createdAt = newDate
  }
  getTransactions(): void {
    this.transaction.getTransactions(this.userAccount._id).subscribe({
      next: data => {
        this.transactions = data;
        this.transactions.forEach((element: { date: string; }) => {
          var newDate = element.date.split('-');
          element.date = newDate[1] + " / " + newDate[2].substring(0, 2) + " / " + newDate[0]; 
        })
        
        if (this.transactions.length > 5) {
          this.transactionsToShow = this.transactions.slice(0, 5);
          this.lastIndex = 5;
          this.showViewMore = true;
        } else
          this.transactionsToShow = this.transactions;

        if (this.transactions.length <=5 )
          this.showViewMore = false;

      },
      error: err => {
        this.transactions = JSON.parse(err.error).message;
      }
    });
  }
  loadMore(): void {
    if (this.lastIndex === 0) {
        this.showViewMore = false;
        console.log('hi3');
    } else if (this.lastIndex >= this.transactions.length) {
      this.showViewMore = false;
      console.log('hi2')
    } else if (this.transactions.length - this.lastIndex === 1) {
      this.transactionsToShow.push(this.transactions[this.lastIndex + 1]);
      this.showViewMore = false;
      this.lastIndex += 1;
    } else if (this.transactions.length - this.lastIndex < 5) {
      for (let i = this.lastIndex + 1; i < this.transactions.length; i++)
        this.transactionsToShow.push(this.transactions[i]);

      this.lastIndex = this.transactions.length
      this.showViewMore = false;
      console.log('hi1')
    } else if (this.transactions.length - this.lastIndex >= 5) {
      for (let i = this.lastIndex + 1; i < 5; i++)
        this.transactionsToShow.push(this.transactions[i]);

      this.lastIndex += 5;
      this.showViewMore = true;
      console.log('hi')
    }
    console.log(this.transactionsToShow)
  }
  // Modal functions
  logTransaction(index: number): void {
    this.index = index;
  }
}
