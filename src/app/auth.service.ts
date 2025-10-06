import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public signUpUser(firstname: string, lastname: string, email: string, password: string){
    const user = {firstname, lastname, email, password}
    localStorage.setItem( 'userSignUpInfo' ,JSON.stringify(user))
  }

  public loginUser(email: string, password: string): boolean{
    const userFetch = localStorage.getItem('userSignUpInfo')
    if(!userFetch){
      alert('Not a user!')
      return false
    }
    const fetchObject = JSON.parse(userFetch)
    if(fetchObject.email === email && fetchObject.password === password){
      localStorage.setItem('loggedInUser', JSON.stringify(fetchObject))
      alert('Logged In!')
      return true
    }
    alert('Incorrect Credentials')
    return false
  }

  public logOut(): void{
    localStorage.removeItem('loggedInUser')
    alert('Logged Out!')
  }

  public getUser() : any{
    const user = localStorage.getItem('loggedInUser')
    return user ? JSON.parse(user) : null
  }

  public isUserLoggedIn() : boolean{
    return !!this.getUser()
  }
}
