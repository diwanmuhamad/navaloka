import { useState } from "react";

function ArtworkImage({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Skeleton Placeholder */}
      {loading && (
        <div className="absolute inset-0 bg-slate-200/70 animate-pulse" />
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loading ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
}

export default ArtworkImage;
