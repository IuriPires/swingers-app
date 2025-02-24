import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import { useMatch } from "@/hooks/useMatch";
import { useCallback, useEffect, useMemo } from "react";
import { tokenManager } from "@/services/api";

import { Image } from "react-native";
import Button from "@/components/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function MatchesScreen() {
  const { getNextMatch, likeUser, dislikeUser, potentialMatch } = useMatch();

  useEffect(() => {
    getNextMatch();
  }, []);

  useEffect(() => {
    console.log(potentialMatch, "MY DATA");
  }, [potentialMatch]);

  const username = useMemo(() => {
    if (potentialMatch?.username) {
      return (
        potentialMatch?.username.charAt(0).toUpperCase() +
        potentialMatch?.username.slice(1)
      );
    }
    return "N/A";
  }, [potentialMatch]);

  const handleLike = useCallback(() => {
    likeUser(potentialMatch!.id);
  }, [potentialMatch]);

  const handleDislike = useCallback(() => {
    dislikeUser(potentialMatch!.id);
  }, [potentialMatch]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.profileWrapper}>
        <Image
          style={styles.profile}
          source={require("@/assets/images/profile.png")}
        />
        <View style={styles.information}>
          <ThemedText type="bold">{username}</ThemedText>
          <ThemedText>{potentialMatch?.age}</ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.about}>
        <ThemedText type="defaultSemiBold">Sobre mim</ThemedText>
        <ThemedText type="default" style={styles.bio}>
          {potentialMatch?.bio}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.cta}>
        <ThemedView style={styles.ctaWrapper}>
          <Button type="button" icon onPress={handleDislike}>
            <IconSymbol name="xmark" size={40} color="#201f1f" />
          </Button>
        </ThemedView>

        <ThemedView style={styles.ctaWrapper}>
          <Button type="button" icon onPress={handleLike}>
            <IconSymbol name="heart" size={40} color="#f90000" />
          </Button>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  profileWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "50%",
    borderRadius: 8,
  },
  profile: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  information: {
    width: "100%",
    backgroundColor: "#000",
    opacity: 0.7,
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingLeft: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  about: {
    width: "100%",
    paddingTop: 12,
    paddingLeft: 12,
  },
  bio: {
    width: "100%",
    paddingTop: 12,
    paddingRight: 12,
    flexWrap: "wrap",
  },
  ctaWrapper: {
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 12,
    boxShadow:
      "rgba(256, 256, 256, 0.3) 0px 4px 6px -1px, rgba(256, 256, 256, 0.06) 0px 2px 4px -1px",
  },
  cta: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    bottom: 30,
    position: "absolute",
  },
});
