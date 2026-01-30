export const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border animate-pulse">
      <div className="aspect-square bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent animate-shimmer" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded-lg w-3/4" />
        <div className="h-4 bg-muted rounded-lg w-full" />
        <div className="flex items-center justify-between">
          <div className="h-5 bg-muted rounded-lg w-20" />
          <div className="h-8 bg-muted rounded-lg w-16" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonBranchCard = () => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border animate-pulse">
      <div className="h-70 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent animate-shimmer" />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-6 bg-muted rounded-lg w-3/4" />
        <div className="h-4 bg-muted rounded-lg w-full" />
        <div className="h-4 bg-muted rounded-lg w-2/3" />
        <div className="h-4 bg-muted rounded-lg w-1/2" />
        <div className="h-10 bg-muted rounded-xl w-full mt-4" />
      </div>
    </div>
  );
};
