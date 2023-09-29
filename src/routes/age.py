# import numpy as np
# import tensorflow as tf
import cv2
# from tensorflow.keras.models import load_model
import torch
# print(cv2.__version__)
import sys

#model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
#for custom Model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='Model_Age.pt')
# classes=[]
# f=open('classes.txt','r')
# for line in f:
# 	classes.append(line.strip())

#for custom Model
#model = torch.hub.load('ultralytics/yolov5', 'custom', path='yolov5s.pt')
# img_path = sys.argv[1]
# img = 'src/routes/img.jpeg'
def yolo(img_path):
  img=cv2.imread(img_path)
  # img=cv2.resize(img, (416,416))
  results = model(img)
  # print('iiiiiiiiiiiiiiiii', str(results))
  # print('uuuuuuuuuuuuuuuu',str(str(results.pandas().xyxy).split(" ")[-1]).split("]")[0])
  label = str(str(results.pandas().xyxy).split(" ")[-1]).split("]")[0]

  # print(results.pandas().xyxy[0])
  # print(label)
  return label

if __name__ == "__main__":
  print(yolo(sys.argv[1]))

