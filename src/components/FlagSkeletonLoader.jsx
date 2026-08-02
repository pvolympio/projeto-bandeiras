import React from 'react'

export function FlagCardSkeleton() {
  return (
    <div className="glass-panel p-4 rounded-2xl flex flex-col gap-3 animate-pulse border border-gray-200 dark:border-gray-800">
      <div className="w-full h-36 skeleton-shimmer rounded-xl" />
      <div className="flex justify-between items-center mt-1">
        <div className="h-5 w-2/3 skeleton-shimmer rounded" />
        <div className="h-4 w-1/5 skeleton-shimmer rounded" />
      </div>
      <div className="h-4 w-1/2 skeleton-shimmer rounded" />
    </div>
  )
}

export function FlagGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full my-6">
      {Array.from({ length: count }).map((_, i) => (
        <FlagCardSkeleton key={i} />
      ))}
    </div>
  )
}
