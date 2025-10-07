import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Transaction } from '../transaction';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-tracker',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent implements OnInit{
  public transactions: WritableSignal<Transaction[]> = signal<Transaction[]>([])
  public enterTransactionDetails: boolean = false
  public transactionDetails: FormGroup;
  public user: any
  public userKey: string = ''
  public incomeValue: Signal<number> = computed(()=>this.transactions().reduce((sum,transaction)=>transaction.category==='income' ? sum+transaction.amount : sum, 0) )
  public expenseValue: Signal<number> = computed(()=> this.transactions().reduce((sum, tranaction)=>tranaction.category==='expense'? sum+tranaction.amount : sum,0))
  public balanceValue: Signal<number> = computed(()=> this.incomeValue() -this.expenseValue())
  public colorHandler: Signal<string> = computed(()=>this.balanceValue()>=0 ?'actualIncome' : 'actualExpense')

  public addNewTransaction(){
    const newTransaction = this.transactionDetails.value
    this.transactions.update(transaction=> [...transaction, {...newTransaction, id:Date.now(), date: new Date()}])
    this.toggleTransactionDetails()
    this.transactionDetails.reset()
    localStorage.setItem(this.userKey, JSON.stringify(this.transactions() ))
  } 

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private route: Router){
    this.transactionDetails = this.formBuilder.group({
      name: [''],
      amount: [0],
      category: ['income']
    })
  }
  

  ngOnInit(): void {
    if(!this.auth.isUserLoggedIn()){
      this.route.navigate(['/logIn'])
    }else{
      this.user = this.auth.getUser()
      console.log(`welcome ${this.user.firstName}`)
       this.userKey = `${this.user.email}_transactions`
       const transactionLocalData = localStorage.getItem(this.userKey)
      if(transactionLocalData){
        this.transactions.set(JSON.parse(transactionLocalData))
      }
    }
  }

  public toggleTransactionDetails(): void{
      this.enterTransactionDetails = !this.enterTransactionDetails
  }

  public deleteTransaction(transactionId: number): void{
    this.transactions.update(transaction=>transaction.filter((item)=>item.id !== transactionId))
    localStorage.setItem(this.userKey, JSON.stringify(this.transactions() ))
  }

  public deleteAll(): void{
    this.transactions.set([])
    localStorage.removeItem(this.userKey)
  }

  public logOut() : void{
    this.auth.logOut()
    this.route.navigate(['/logIn'])
  }

  public downloadPDF(): void {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Expense Tracker Report', 14, 20);

  doc.setFontSize(14);
  doc.text(`Balance: ${this.balanceValue()} | Income: ${this.incomeValue()} | Expense: ${this.expenseValue()}`, 14, 30)

  const tableData = this.transactions().map(t => [
    t.name,
    t.category,
    t.amount,
    new Date(t.date).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    })
  ]);

  autoTable(doc, {
    head: [['Name', 'Category', 'Amount', 'Date']],
    body: tableData,
    startY: 40,
  });

  doc.save('transactions.pdf');
}


 
}
