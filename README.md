# Digital Sound Art Project
Customized Classical Music and Visual Art

## Abstract
Established a model that reinterprets classical music through recorded or sampled sounds, presenting customized audio performances with the flexibility to choose specific musical pieces and performance sounds. Integrated digital art to synchronize visual artworks with the music's rhythm, providing a unique and customizable visual art experience alongside the musical performance.

## Web version

https://editor.p5js.org/yingying0906/full/N4sj5pAUA

## Usage

1. Upload images to the folder "image"
2. Upload audio files to the folder "music"
3. Rename the audio file to the name of the image
4. Enter `python3 produce_csv.py` to produce the csv files
5. open index.html with live server
6. Press the left/right arrow key to change to the previous/next songs and images
7. Move your mouse slowly to generate waves in the background.

## Implementation

## produce_csv.py

- Utilize an edge detector to fetch the lines of the images and transfer the coordinates to [image].csv
- link the image to the audio file by image name automatically
