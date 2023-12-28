from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_chat = "chat"

        await self.channel_layer.group_add(self.room_chat, self.channel_name)

        await self.accept()
    
    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_chat, self.channel_name)
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await self.channel_layer.group_send(self.room_chat,{"type":"chat.message","message":message})

    async def chat_message(self, event):
        message = event["message"]

        await self.send(text_data=json.dumps({"message":message}))