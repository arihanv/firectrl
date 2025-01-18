'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'San Francisco',
      action: 'San Francisco',
      state: 'CA',
    },
    {
      title: 'Los Angeles',
      action: 'Los Angeles',
      state: 'CA',
    },
    {
      title: 'Santa Rosa',
      action: 'Santa Rosa',
      state: 'CA',
    },
    {
      title: 'San Diego',
      action: 'San Diego',
      state: 'CA',
    },
    {
      title: 'Sacramento',
      action: 'Sacramento',
      state: 'CA',
    },
    {
      title: 'Santa Barbara',
      action: 'Santa Barbara',
      state: 'CA',
    },
  ];

  return (
    <div className="grid sm:grid-cols-1 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-2.5 py-2 text-sm flex-1 gap-1 flex w-full h-auto justify-between items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">{suggestedAction.state}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
