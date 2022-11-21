import numpy as np
import cv2
import csv
import sys
import os

# open setting csv to record the images
setting_file = open('setting.csv', 'w')
setting_writer = csv.writer(setting_file)

# iterate all images
for filename in os.listdir("./image"):
    with open(os.path.join("./image", filename), 'r') as f:
        # read img
        print("opening " + filename)
        img = cv2.imread("./image/" + filename)

        # add to setting.csv
        data = [filename[:-4]]
        setting_writer.writerow(data)

        # turn gray
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # turn blur
        blur_img = cv2.GaussianBlur(gray_img, (11, 11), 0)

        # Edge detection
        edges = cv2.Canny(blur_img, 20, 30)

        # thicken the edges
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
        edges = cv2.dilate(edges, kernel, iterations=1)

        # write img
        #cv2.imwrite("image/_" + filename, edges)

        # transfer coordinates to csv
        indices = np.where(edges != [0])

        # shuffle the order of coordinate
        lst = list(range(len(indices[0])))
        np.random.shuffle(lst)

        # csv name
        new_file_name = filename[:-4]
        print("writing " + new_file_name + ".csv")

        # open input csv
        file = open('csv/'+ new_file_name+'.csv', 'w')
        writer = csv.writer(file)

        # img setting into csv
        h, w = edges.shape
        width_height = [int(w),int(h)]
        data = width_height
        writer.writerow(data)

        # img coordinate into csv
        for i in lst:
            data = [indices[0][i], indices[1][i]]
            writer.writerow(data)
        file.close()

setting_file.close()

# iterate all song
file = open('music_list.csv', 'w')
writer = csv.writer(file)

for filename in os.listdir("./music"):
    # open music csv
    print(filename)
    data = [filename]
    writer.writerow(data)
file.close()