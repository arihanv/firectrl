'use client';
import { useState } from 'react';

import { Chat } from '@/components/chat';
import { WelcomeFlow, UserType } from '@/components/welcome-flow';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { generateUUID } from '@/lib/utils';

export default function Page() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [userInfo, setUserInfo] = useState<{ userType: UserType; region: string } | null>(null);

  const handleWelcomeComplete = (data: { userType: UserType; region: string }) => {
    setUserInfo(data);
    setWelcomeComplete(true);
  };

  if (!welcomeComplete) {
    return <WelcomeFlow onComplete={handleWelcomeComplete} />;
  }

  const id = generateUUID();

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))]">
      <div className="flex-1 overflow-hidden">
        {/* Map component will go here */}
        <div className="h-full bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Map for {userInfo?.region} will be displayed here</p>
        </div>
      </div>
      <div className="w-[400px] border-l">
        <Chat
          id={id}
          initialMessages={[]}
          selectedModelId="gemini-1.5-pro-latest"
          selectedVisibilityType="public"
          isReadonly={false}
        />
        <DataStreamHandler id={id} />
      </div>
    </div>
  );
}
