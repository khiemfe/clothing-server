import cv2
import torch
import sys

model = torch.hub.load('ultralytics/yolov5', 'custom', path='Model_BMINew.pt')

def yolo(img_path):
  img=cv2.imread(img_path)
  results = model(img)

  labelOm = str(str(results.pandas().xyxy)).find("Om")
  labelBT = str(str(results.pandas().xyxy)).find("Binh thuong")
  labelBeo = str(str(results.pandas().xyxy)).find("Beo")
  if labelOm != -1:
    return "Om"
  elif labelBT !=-1:
    return "thuong"
  elif labelBeo != -1:
    return "Beo"

if __name__ == "__main__":
  print(yolo(sys.argv[1]))
