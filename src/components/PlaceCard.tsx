'use client'

import { motion } from 'framer-motion';
import { Users, Check, X } from 'lucide-react';
import { Place } from '@/data/branches';

interface PlaceCardProps {
  place: Place;
  index?: number;
}

export const PlaceCard = ({ place, index = 0 }: PlaceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`relative bg-card rounded-xl overflow-hidden border ${
        place.isAvailable ? 'border-success/30' : 'border-border opacity-60'
      }`}
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${
            place.isAvailable ? 'bg-success' : 'bg-muted'
          }`}
        >
          {place.isAvailable ? (
            <Check className="w-4 h-4 text-success-foreground" />
          ) : (
            <X className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-sm text-foreground">{place.name}</h4>
        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
          <Users className="w-3 h-3" />
          <span className="text-xs">{place.capacity} seats</span>
        </div>
        <span
          className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
            place.isAvailable
              ? 'bg-success/10 text-success'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {place.isAvailable ? 'Available' : 'Not Available'}
        </span>
      </div>
    </motion.div>
  );
};
