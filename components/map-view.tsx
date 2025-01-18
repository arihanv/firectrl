'use client';

import { useState } from 'react';

export function MapView({ city }: { city?: string }) {
  return (
    <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
      <div className="text-center">
        {city ? (
          <>
            <div className="text-2xl font-bold mb-2">{city}</div>
            <div className="w-full h-[300px] bg-gray-300 rounded-lg flex items-center justify-center">
              [Map Placeholder for {city}]
            </div>
          </>
        ) : (
          <div className="text-muted-foreground">
            Enter a city to view the map
          </div>
        )}
      </div>
    </div>
  );
}
