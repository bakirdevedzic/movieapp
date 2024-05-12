export {};

export function getTrailerKeyFromResponse(videos: any) {
  if (!videos || videos.length === 0) {
    return "";
  }

  const trailer = videos.find((video: any) =>
    video.name.toLowerCase().includes("trailer")
  );

  return trailer ? trailer.key : "";
}
