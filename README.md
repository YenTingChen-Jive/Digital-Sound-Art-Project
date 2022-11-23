# Web version

https://editor.p5js.org/yingying0906/full/N4sj5pAUA

# Usage

1. Upload images to the folder "image"
2. Upload audio files to the folder "music"
3. Rename the audio file to the name of the image
4. Enter `python3 produce_csv.py` to produce the csv files
5. open index.html with live server
6. Press the left/right arrow key to change to the previous/next songs and images

# Implementation

## produce_csv.py

-   Utilize an edge detector to fetch the lines of the images and transfer the coordinates to [image].csv
-   link the image to the audio file by image name automatically
