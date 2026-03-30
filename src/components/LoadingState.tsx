const LoadingState = () => (
  <div className="space-y-4 animate-pulse">
    <div className="bg-card border border-border rounded-lg p-5 space-y-3">
      <div className="h-4 w-32 bg-muted rounded" />
      <div className="h-6 w-48 bg-muted rounded" />
      <div className="h-3 w-full bg-muted rounded" />
      <div className="flex gap-2">
        <div className="h-5 w-20 bg-muted rounded" />
        <div className="h-5 w-20 bg-muted rounded" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-card border border-border rounded-lg p-5 space-y-3">
        <div className="h-4 w-28 bg-muted rounded" />
        <div className="h-12 w-24 bg-muted rounded" />
        <div className="h-2 w-full bg-muted rounded-full" />
      </div>
      <div className="bg-card border border-border rounded-lg p-5 space-y-3">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-3/4 bg-muted rounded" />
      </div>
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
        <div className="h-4 w-4 bg-muted rounded" />
        <div className="h-4 w-12 bg-muted rounded" />
        <div className="h-5 w-14 bg-muted rounded" />
        <div className="h-4 flex-1 bg-muted rounded" />
      </div>
    ))}
    <p className="text-center text-sm text-muted-foreground animate-pulse-glow">
      Analyzing code and generating test cases...
    </p>
  </div>
);

export default LoadingState;
