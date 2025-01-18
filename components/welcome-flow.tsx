"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type UserType = 'researcher' | 'general';

interface WelcomeFlowProps {
  onComplete: (data: {
    userType: UserType;
    region: string;
  }) => void;
}

export function WelcomeFlow({ onComplete }: WelcomeFlowProps) {
  const [step, setStep] = useState<'welcome' | 'userType' | 'region'>('welcome');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [region, setRegion] = useState<string>('');

  const renderWelcome = () => (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">Welcome to FireCtrl</h1>
      <p className="text-muted-foreground">
        Your AI-powered assistant for California fire predictions and insights
      </p>
      <Button onClick={() => setStep('userType')}>Get Started</Button>
    </div>
  );

  const renderUserTypeSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">What type of user are you?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer hover:border-primary ${
            userType === 'researcher' ? 'border-primary' : ''
          }`}
          onClick={() => {
            setUserType('researcher');
            setStep('region');
          }}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold">Researcher</h3>
            <p className="text-sm text-muted-foreground">
              Access detailed data and advanced analytics
            </p>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer hover:border-primary ${
            userType === 'general' ? 'border-primary' : ''
          }`}
          onClick={() => {
            setUserType('general');
            setStep('region');
          }}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold">General User</h3>
            <p className="text-sm text-muted-foreground">
              Get simplified insights and predictions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRegionSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">
        Which California region would you like to learn about?
      </h2>
      <input
        type="text"
        placeholder="Enter city or region name..."
        className="w-full p-2 border rounded-md"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
      <Button
        className="w-full"
        disabled={!region}
        onClick={() => {
          if (userType && region) {
            onComplete({ userType, region });
          }
        }}
      >
        Continue
      </Button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {step === 'welcome' && renderWelcome()}
      {step === 'userType' && renderUserTypeSelection()}
      {step === 'region' && renderRegionSelection()}
    </div>
  );
}
