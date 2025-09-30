import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',  
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  
  handleConnection(client: Socket) {
    console.log('Client ulandi:', client.id);
  }

  
  handleDisconnect(client: Socket) {
    console.log('Client uzildi:', client.id);
  }

  
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { sender: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Yangi xabar: ${data.sender}: ${data.text}`);

   
    this.server.emit('message', {
      sender: data.sender,
      text: data.text,
    });
  }
}
