"use client";

import { SubscriptionType } from "@/lib/types";
import { createContext, ReactNode, useContext } from "react";

const subscriptionLevelContext = createContext<SubscriptionType>("FREE");

interface SubscriptionLevelProviderProps {
  children: ReactNode;
  userSubscriptionLevel: SubscriptionType;
}

export function SubscriptionLevelProvider({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProviderProps) {
  return (
    <subscriptionLevelContext.Provider value={userSubscriptionLevel}>
      {children}
    </subscriptionLevelContext.Provider>
  );
}

export function useSubscriptionLevel() {
  const context = useContext(subscriptionLevelContext);
  if (context === undefined) {
    throw new Error(
      "useSubscriptionLevel must be used within a SubscriptionLevelProvider",
    );
  }
  return context;
}
