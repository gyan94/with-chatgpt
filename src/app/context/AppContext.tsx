"use client";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";

type AppProviderProps = {
  children: ReactNode;
};

type AppContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userId: string | null;
  selectedRoom: string | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string | null>>;
};

const defaultContextData: AppContextType = {
  user: null,
  setUser: () => {},
  userId: null,
  selectedRoom: null,
  setSelectedRoom: () => {},
};

// ユーザー情報をグロバールで使用する
const AppContext = createContext(defaultContextData);

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  /** _firebase のログイン管理_ @param newUser ログインしたユーザー **/
  useEffect(() => {
    // unsubscribe = 購読を解除する意味の変数
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
      setUserId(newUser ? newUser.uid : null);
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <AppContext.Provider
      value={{ user, userId, setUser, selectedRoom, setSelectedRoom }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
