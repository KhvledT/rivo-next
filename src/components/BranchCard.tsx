'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users } from 'lucide-react';
import { Branch, getAvailablePlacesCount, getTotalPlacesCount } from '@/data/branches';
import { Button } from '@/components/ui/button';

interface BranchCardProps {
  branch: Branch;
  index?: number;
}

export const BranchCard = ({ branch, index = 0 }: BranchCardProps) => {
  const availablePlaces = getAvailablePlacesCount(branch);
  const totalPlaces = getTotalPlacesCount(branch);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/branches/${branch.slug}`}>
        <div className="group bg-card rounded-2xl overflow-hidden border border-border card-hover min-h-full">
          <div className="relative overflow-hidden">
            <img
              src={branch.image}
              alt={branch.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  availablePlaces > 0
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {availablePlaces > 0 ? `${availablePlaces} available` : 'Full'}
              </span>
            </div>
          </div>
          <div className="p-5 min-h-full">
            <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {branch.name}
            </h3>
            <div className="mt-3 space-y-2 min-h-full">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">{branch.address}, {branch.city}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">{branch.openingHours}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm">{availablePlaces} of {totalPlaces} seats available</span>
              </div>
            </div>
            <Button className="w-full mt-4 btn-primary">
              View Branch
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
