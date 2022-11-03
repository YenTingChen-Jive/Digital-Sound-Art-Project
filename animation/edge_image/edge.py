import numpy as np
import cv2
import csv
import sys

# Edge detection
filename = str(sys.argv[1])
img = cv2.imread("image/"+filename)
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur_img = cv2.GaussianBlur(gray_img, (11, 11), 0)
edges = cv2.Canny(blur_img, int(sys.argv[2]), int(sys.argv[3])) #40~90


cv2.imwrite("image/out_"+filename, edges)

# Edge coordinates
indices = np.where(edges != [0])

# open csv
file = open('../input.csv', 'w')
writer = csv.writer(file)
for i in range(len(indices[0])):
    data = [indices[0][i], indices[1][i]]
    writer.writerow(data)

file.close()