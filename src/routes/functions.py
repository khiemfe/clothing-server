import cv2
import torch
import sys

model = torch.hub.load('ultralytics/yolov5', 'custom', path='Model_BMI.pt')

def yolo(img_path):
  img=cv2.imread(img_path)
  results = model(img)
  label = str(str(results.pandas().xyxy).split(" ")[-1]).split("]")[0]
  return label

if __name__ == "__main__":
  print(yolo(sys.argv[1]))