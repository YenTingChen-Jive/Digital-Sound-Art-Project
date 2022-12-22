import numpy as np
import cv2
import csv
import sys
import os

# open setting csv to record the images
setting_file = open('setting.csv', 'w')
setting_writer = csv.writer(setting_file)
setting_file2 = open('setting2.csv', 'w')
setting_writer2 = csv.writer(setting_file2)

# iterate all images
for filename in os.listdir("./image"):
    if(filename[-4:] != ".jpg" and filename[-4:] != ".png"):
        continue
    with open(os.path.join("./image", filename), 'r') as f:
        # read img
        print("opening " + filename)
        img = cv2.imread("./image/" + filename)

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

        # adding image and songs to setting.csv
        count = 0
        data = [filename[:-4]]
        for song_name in os.listdir("./music"):
            if(song_name[0:len(filename[:-4])] == filename[:-4] ):
                data.append(song_name)
                count += 1
        data.insert(1,count)
        setting_writer.writerow(data)

# adding image to each songs in setting2.csv
for song_name in os.listdir("./music"):
    data = [song_name]
    x = song_name.split("_")
    data.append(x[0])
    setting_writer2.writerow(data)
        
setting_file.close()
setting_file2.close()
