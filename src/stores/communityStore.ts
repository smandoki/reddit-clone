import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { create } from "zustand";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebaseConfig";
import { useAuthModalStore } from "./authModalStore";
import { useParams } from "react-router-dom";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

export interface CommunityState {
  mySnippets: CommunitySnippet[];
  setMySnippets: (snippets: CommunitySnippet[]) => void;
  currentCommunity?: Community;
  setCurrentCommunity: (community: Community) => void;
}

export const useCommunityStore = create<CommunityState>()((set) => ({
  mySnippets: [],
  setMySnippets: (snippets: CommunitySnippet[]) =>
    set(() => ({
      mySnippets: snippets.map((snippet) => ({ ...snippet })),
    })),
  currentCommunity: undefined,
  setCurrentCommunity: (community: Community) =>
    set({ currentCommunity: community }),
}));

//custom hook for handling community data
export function useCommunityData() {
  const { mySnippets, setMySnippets, currentCommunity, setCurrentCommunity } =
    useCommunityStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const { setAuthModalState } = useAuthModalStore();
  const params = useParams();

  function onJoinOrLeaveCommunity(communityData: Community, isJoined: boolean) {
    //user must be signed in before they can join
    if (!user) {
      setAuthModalState(true, "login");
      return;
    }

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }

    joinCommunity(communityData);
  }

  async function getMySnippets() {
    setLoading(true);

    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setMySnippets(snippets as CommunitySnippet[]);
    } catch (error: any) {
      console.log("getMySnippets", error.message);
      setError(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (user) {
      getMySnippets();
    } else {
      setMySnippets([]);
    }
  }, [user]);

  async function joinCommunity(communityData: Community) {
    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      //create new community snippet
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        isModerator: user?.uid === communityData.creatorId,
        imageURL: communityData.imageURL || "",
      };

      //create snippet on user doc
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );

      //update numberOfMembers in community
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      //update client state
      setMySnippets([...mySnippets, newSnippet]);
    } catch (error: any) {
      console.log("joinCommunity", error.message);
      setError(error.message);
    }

    setLoading(false);
  }

  async function leaveCommunity(communityId: string) {
    //delete community snippet
    try {
      setLoading(true);
      const batch = writeBatch(firestore);

      //delete community snippet from user doc
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );

      //decrement numberOfMember in community
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      //update client state
      setMySnippets(
        mySnippets.filter((snippet) => snippet.communityId !== communityId)
      );
    } catch (error: any) {
      console.log("leaveCommunity", error.message);
      setError(error.message);
    }

    setLoading(false);
  }

  async function getCommunityData(communityId: string) {
    try {
      const communityDocRef = doc(firestore, "communities", communityId);
      const communityDoc = await getDoc(communityDocRef);

      setCurrentCommunity({
        id: communityDoc.id,
        ...communityDoc.data(),
      } as Community);
    } catch (error: any) {
      console.log("getCommunityData error", error.message);
    }
  }

  useEffect(() => {
    const { communityId } = params;

    if (communityId && !currentCommunity) {
      getCommunityData(communityId);
    }
  }, [params.communityId, currentCommunity]);

  return {
    mySnippets,
    setMySnippets,
    onJoinOrLeaveCommunity,
    getMySnippets,
    loading,
    error,
    currentCommunity,
    setCurrentCommunity,
  };
}
