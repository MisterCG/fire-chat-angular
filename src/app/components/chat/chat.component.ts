import { Component, OnInit, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  element: HTMLElement;

  constructor( public chat: ChatService ) { 
    this.chat.cargarMensajes().subscribe(()=>{
      setTimeout(()=>{
        this.element.scrollTop = this.element.scrollHeight;
      },200);
      
    });
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    console.log(this.mensaje);
    if( this.mensaje.length === 0 ) {
      return;
    }

    this.chat.agregarMensaje( this.mensaje )
      .then((res)=>{
        console.log(res)
        this.mensaje = '';
      })
      .catch(console.error);


  }

}
