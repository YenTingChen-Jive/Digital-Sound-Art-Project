import numpy as np
import cv2
import csv
import sys

# open image
filename = str(sys.argv[1])
img = cv2.imread("image/"+filename)

# gray
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# blur
blur_img = cv2.GaussianBlur(gray_img, (11, 11), 0)

# Edge detection
edges = cv2.Canny(blur_img, int(sys.argv[2]), int(sys.argv[3])) #40~90

# thicken the edges
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
edges = cv2.dilate(edges, kernel, iterations=1)

# change
edges = 255 - edges

# write img
cv2.imwrite("image/out_"+filename, edges)

# open csv
file = open('../input.csv', 'w')

# transfer to csv
img_array = np.array(edges)

writer = csv.writer(file)
for i in range(len(img_array)):
    data = img_array[i]
    writer.writerow(data)

file.close()