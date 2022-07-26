import cv2
import mediapipe as mp
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose
import numpy as np
import sys
from math import *

class Point():
	def __init__(self, x, y):
		self.x = x
		self.y = y
	
	def __repr__(self):
		return f'({self.x}, {self.y})'

	@staticmethod
	def distance(A, B):
		return sqrt(pow(A.x-B.x, 2)+pow(A.y-B.y, 2))

def check_0(A, B, C):
	a = Point.distance(B, C)
	b = Point.distance(A, C)
	c = Point.distance(A, B)
	cos_t = ((a*a+b*b-c*c)/(2*a*b))
	return (cos_t < cos(170 * pi/180))


def is_standing(results, image_width, image_height):
	RIGHT_SHOULDER_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER].y * image_height)
	RIGHT_HIP_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].y * image_height)
	RIGHT_KNEE_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE].y * image_height)
	RIGHT_ANKLE_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE].y * image_height)
	chk0 = check_0(RIGHT_SHOULDER_POS, RIGHT_KNEE_POS, RIGHT_HIP_POS)
	chk1 = check_0(RIGHT_HIP_POS, RIGHT_ANKLE_POS, RIGHT_KNEE_POS)
	if chk0 and chk1:
		return True
	LEFT_SHOULDER_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER].y * image_height)
	LEFT_HIP_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP].y * image_height)
	LEFT_KNEE_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE].y * image_height)
	LEFT_ANKLE_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE].y * image_height)
	chk2 = check_0(LEFT_SHOULDER_POS, LEFT_KNEE_POS, LEFT_HIP_POS)
	chk3 = check_0(LEFT_HIP_POS, LEFT_ANKLE_POS, LEFT_KNEE_POS)
	if chk2 and chk3:
		return True
	return False

def process(filename):
	try:
		pose = mp_pose.Pose(
		static_image_mode=True,
	    model_complexity=2,
	    enable_segmentation=True,
	    min_detection_confidence=0.5)

		image = cv2.imread('./public/'+filename)
		image_height, image_width, _ = image.shape

		results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

		if not results.pose_landmarks:
			return {'success': False, 'message': 'Invalid image.'}

		if not is_standing(results, image_width, image_height):
			return {'success': False, 'message': 'The person in the image is not standing.'}

		K = 1.84 / 1051

		RIGHT_EYE_OUTER_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_EYE_OUTER].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_EYE_OUTER].y * image_height)
		RIGHT_HEEL_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HEEL].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HEEL].y * image_height)
		NOSE_POS = Point(results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].x * image_width,results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].y * image_height)
		distance1 = Point.distance(RIGHT_EYE_OUTER_POS, RIGHT_HEEL_POS)
		distance2 = Point.distance(RIGHT_EYE_OUTER_POS, NOSE_POS)*2
		distance = distance1 + distance2
		height = distance * K
		return {'success': True, 'message': 'Height: %.02f m'%height}
	except Exception as e:
		print(e)
		return {'success': False, 'message': 'Something went wrong.'}