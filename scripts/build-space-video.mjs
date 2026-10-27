// Reproducible image-based room preview. No footage from other clinics is used.
import { readFile, mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { join } from "node:path";

const encoder =
  process.env.FFMPEG_PATH ||
  join(process.env.LOCALAPPDATA, "ms-playwright/ffmpeg-1013/ffmpeg-win64.exe");
const source = await readFile(
  new URL(
    "../public/assets/images/facility/consultation-lounge.jpg",
    import.meta.url,
  ),
);
const output = new URL(
  "../public/assets/video/consultation-space.webm",
  import.meta.url,
);
await mkdir(new URL("../public/assets/video/", import.meta.url), {
  recursive: true,
});
const { fileURLToPath } = await import("node:url");
const processVideo = spawn(
  encoder,
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-f",
    "image2pipe",
    "-c:v",
    "mjpeg",
    "-r",
    "24",
    "-i",
    "pipe:0",
    "-vf",
    "scale=1400:-2,crop=1280:720:60+40*sin(t/3):30",
    "-t",
    "9",
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "650k",
    "-pix_fmt",
    "yuv420p",
    "-an",
    "-y",
    fileURLToPath(output),
  ],
  { stdio: ["pipe", "ignore", "inherit"], windowsHide: true },
);
const completion = once(processVideo, "close");
for (let frame = 0; frame < 216; frame++) {
  if (!processVideo.stdin.write(source))
    await once(processVideo.stdin, "drain");
}
processVideo.stdin.end();
const [code] = await completion;
if (code !== 0) throw new Error(`Video export failed (${code})`);
console.log(
  "Created public/assets/video/consultation-space.webm (9 seconds, silent VP9).",
);
