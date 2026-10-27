import { imageSizes } from "../../data/imageSizes.mjs";

export default function ContentImage({
  src,
  alt = "",
  className = "",
  style,
  ...props
}) {
  const size = imageSizes[src];
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={`content-image ${className}`.trim()}
      width={size?.width}
      height={size?.height}
      style={{
        aspectRatio: size ? `${size.width} / ${size.height}` : undefined,
        ...style,
      }}
    />
  );
}
