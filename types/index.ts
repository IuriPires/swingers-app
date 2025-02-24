export interface Match {
  id: string;
  name: string;
  profilePicture?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}
