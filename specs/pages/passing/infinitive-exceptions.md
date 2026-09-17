# imagemagick

> Create, edit, compose, or convert bitmap images.
> More information: <https://imagemagick.org>.

- Antialias an image:

`convert {{input.png}} -antialias {{output.png}}`

- Bias the intensity of a pixel:

`convert {{input.png}} -bias {{5%}} {{output.png}}`

- Focus an image:

`convert {{input.png}} -sharpen {{0x1}} {{output.png}}`
