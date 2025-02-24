import { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Text,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { api } from "@/services/api";
import socket from "@/services/socket";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Match, Message } from "@/types";

export default function MessagesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const colorScheme = useColorScheme();

  useEffect(() => {
    fetchMatches();
    // Replace with actual user ID from your auth system
    const currentUserId = "091efc45-e4e2-44cd-8c45-3f50869c205c"; // iuripires test ID
    setupSocketListeners(currentUserId);
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await api.get<Match[]>("/matches");
      setMatches(response);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const setupSocketListeners = (userId: string) => {
    socket.connect(userId);
    socket.onMessage((message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
  };

  const handleMatchSelect = async (match: Match) => {
    setSelectedMatch(match);
    try {
      const response = await api.get<Message[]>(`/messages/${match.id}`);
      setMessages(response);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedMatch) return;

    socket.sendMessage(selectedMatch.id, newMessage);
    setNewMessage(""); // Clear the input after sending
  };

  const renderMatch = ({ item }: { item: Match }) => (
    <TouchableOpacity
      style={styles.matchItem}
      onPress={() => handleMatchSelect(item)}
    >
      <Image
        source={
          item.profilePicture
            ? { uri: item.profilePicture }
            : require("@/assets/images/profile.png")
        }
        style={styles.avatar}
      />
      <ThemedText style={styles.matchName}>{item.name}</ThemedText>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: Message }) => {
    // Replace with actual user ID from your auth system
    const currentUserId = "091efc45-e4e2-44cd-8c45-3f50869c205c"; // iuripires test ID
    const isOwnMessage = item.senderId === currentUserId;
    return (
      <View
        style={[
          styles.messageContainer,
          isOwnMessage ? styles.ownMessage : styles.otherMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isOwnMessage ? styles.ownMessageText : styles.otherMessageText,
          ]}
        >
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {!selectedMatch ? (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          style={styles.matchList}
        />
      ) : (
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <TouchableOpacity
              onPress={() => setSelectedMatch(null)}
              style={styles.backButton}
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
            <ThemedText style={styles.chatHeaderText}>
              {selectedMatch.name}
            </ThemedText>
          </View>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messageList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor={Colors[colorScheme ?? "light"].text}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <MaterialIcons
                name="send"
                size={24}
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  matchList: {
    flex: 1,
  },
  matchItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  matchName: {
    fontSize: 16,
    fontWeight: "500",
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    marginRight: 10,
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: "600",
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  ownMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
  },
  ownMessageText: {
    color: "#fff", // White text for own messages
  },
  otherMessageText: {
    color: "#000", // Black text for other messages
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
  },
});
