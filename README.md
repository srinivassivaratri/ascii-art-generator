# ASCII Art Generator

## What is this?

This is a web-based tool that turns your images into text art, also known as ASCII art. It's like magic that transforms pictures into a bunch of letters and symbols!

## Why would I want this?

1. It's fun! You can turn any photo into a unique text-based version.
2. It's a great way to understand how computers "see" images.
3. You can create cool-looking art for text-based environments or just for fun.

## How does it work?

### The Basics (First Principles)

1. **Images are just numbers**: Every image is made up of tiny dots called pixels. Each pixel has a color, which is represented by numbers.

2. **Brightness to characters**: We map the brightness of each pixel to a character. Darker areas use more "solid" characters like '@' or '#', while lighter areas use more "sparse" characters like '.' or ','.

3. **Color is optional**: We can either keep the color information or just use the brightness to create black and white ASCII art.

### The Process

1. **Loading the image**: When you select an image, the computer reads it and breaks it down into its pixel data.

2. **Scaling**: We make the image smaller to fit more "characters" on your screen. This is why we have a "Scale" slider.

3. **Converting to ASCII**: For each pixel, we:
   - Calculate its brightness
   - Choose a character based on that brightness
   - (Optionally) Keep its color information

4. **Display**: We put all these characters together to form the ASCII art version of your image.

### Extra Features

- **GIF support**: We can handle animated GIFs by converting each frame to ASCII and playing them in sequence.
- **Color mode**: Toggle between colorful ASCII art and classic black and white.
- **Invert**: Flip the brightness, making dark areas light and vice versa.
- **Brightness and Contrast**: Adjust these to fine-tune your ASCII art.
- **Custom characters**: You can choose which characters to use in your ASCII art.
- **Export**: Save your ASCII art as an image file to share with others.

## Why did we build it this way?

1. **Web-based**: So anyone can use it without installing anything.
2. **Real-time updates**: Changes are instant, making it fun to play with.
3. **Customizable**: Different images look better with different settings, so we made lots of things adjustable.
4. **Educational**: It helps visualize how computers process images.

## How to use it

1. Open the `index.html` file in a web browser.
2. Click "Choose File" and select an image or GIF.
3. Play with the sliders and checkboxes to customize your ASCII art.
4. Click "Export as Image" to save your creation.

## Technical bits (for the curious)

- We use HTML and CSS for the layout and styling.
- JavaScript does all the heavy lifting:
  - Reading the image data
  - Converting pixels to ASCII
  - Handling user interactions
- We use some external libraries to help with GIF processing and image export.

Enjoy turning your images into ASCII art!
