import { io, Socket } from "socket.io-client";
import { Message } from "@/types";

interface MessageData {
  senderId: string;
  receiverId: string;
  content: string;
}

class SocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;

  connect(userId: string) {
    this.userId = userId;
    if (!this.socket) {
      this.socket = io("http://localhost:3000", {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      });

      this.socket.on("connect", () => {
        console.log("Connected to WebSocket");
        if (this.userId) {
          this.joinRoom(this.userId);
        }
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket");
      });

      this.socket.on("connect_error", (error) => {
        console.error("WebSocket connection error:", error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
    }
  }

  private joinRoom(userId: string) {
    if (this.socket) {
      this.socket.emit("join_room", userId, (response: any) => {
        if (response.status === "success") {
          console.log("Successfully joined room:", userId);
        } else {
          console.error("Failed to join room:", response.message);
        }
      });
    }
  }

  sendMessage(receiverId: string, content: string) {
    if (this.socket && this.userId) {
      const messageData: MessageData = {
        senderId: this.userId,
        receiverId,
        content,
      };

      this.socket.emit("send_message", messageData, (response: any) => {
        if (response.status === "error") {
          console.error("Failed to send message:", response.message);
        }
      });
    }
  }

  onMessage(callback: (message: Message) => void) {
    if (this.socket) {
      this.socket.on("new_message", callback);
    }
  }
}

export default new SocketService();
