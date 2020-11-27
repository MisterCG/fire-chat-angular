import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase  from 'firebase/app';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollections: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public userData: any = {};

  constructor(private firestore: AngularFirestore,
              private auth: AngularFireAuth          
    ) { 
      this.auth.authState.subscribe((user)=> {
        console.log(user);
        if(!user){
          return this.userData.uid = user;
        } else {
          this.userData.displayName = user.displayName;
          this.userData.uid = user.uid;
          console.log('userdata', this.userData)
        }
        
      });
  }

  cargarMensajes() {
    this.itemsCollections = this.firestore.collection<Mensaje>('chats', ref => ref.orderBy('date', 'desc').limit(5));
    return this.itemsCollections.valueChanges()
                              .pipe( map( (mensajes: Mensaje[])=>{
                                this.chats = [];
                                for (let mensaje of mensajes) {
                                  this.chats.unshift( mensaje );
                                }
                                return this.chats
                              }));
  }

  agregarMensaje( text: string ) {
    let mensaje: Mensaje = {
      nombre: this.userData.displayName,
      mensaje: text,
      date: new Date().getTime(),
      uid: this.userData.uid
    }

    return this.itemsCollections.add(mensaje);


  }

  login() {
    this.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() )
  }

  logout() {
    this.auth.signOut();
  }

}
