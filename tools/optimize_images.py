"""Shrink new photos before adding them to the site.

Usage (from the repo folder):
    pip install pillow
    python tools/optimize_images.py path/to/photo.jpg [more files or folders...]

Each image is resized to at most 1800px on its long side and saved as a
.webp next to the original (e.g. photo.jpg -> photo.webp). Use the .webp
path in data/site.js, then delete the original if you like.
Phone photos are often 3-5 MB; the .webp is usually 150-400 KB.
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

MAX_SIDE = 1800
EXTS = {".jpg", ".jpeg", ".png", ".heic", ".tif", ".tiff", ".bmp"}


def convert(src: Path) -> None:
    dst = src.with_suffix(".webp")
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)  # respect phone rotation
        im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
        im.save(dst, "WEBP", quality=82, method=6)
    print(f"{src}  {src.stat().st_size // 1024} KB  ->  {dst.name}  {dst.stat().st_size // 1024} KB")


def main(args):
    if not args:
        print(__doc__)
        return
    for a in args:
        p = Path(a)
        files = [f for f in p.rglob("*") if f.suffix.lower() in EXTS] if p.is_dir() else [p]
        for f in files:
            convert(f)


if __name__ == "__main__":
    main(sys.argv[1:])
