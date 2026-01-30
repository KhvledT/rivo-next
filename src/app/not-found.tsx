"use client"

import Link  from 'next/link';
import { motion } from "framer-motion";
import { Home, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Coffee className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Looks like this page went out for coffee and hasn't come back yet.
        </p>
        <Link href="/">
          <Button className="btn-primary">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
