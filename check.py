import cv2
import sys
import torch

model = torch.hub.load('ultralytics/yolov5', 'custom', path='Model_Age.pt')

def yolo(img_path):
  img=cv2.imread(img_path)
  results = model(img)
  label = str(str(results.pandas().xyxy))
  print(label)
  return label

if __name__ == "__main__":
  print(yolo(sys.argv[1]))
