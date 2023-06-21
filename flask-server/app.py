import tensorflow as tf
import tensorflow_hub as hub
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os
import numpy as np
from keras.models import load_model 
import subprocess
import shutil
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import time


tf.keras.utils.get_custom_objects()['KerasLayer'] = hub.KerasLayer

app=Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

model = tf.keras.models.load_model('models/Keras_hub_large.h5')
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'static/files'

@app.route('/api/analysic_file',  methods = ['POST'])
def analysic_file():
	try:
		return { "isCompleted": True, "conclusion": "benign" }
		# print("Da vao analysic_file")
		# file = request.files['file']
		# # emit("response", "Step 1")
		# if 'file' not in request.files:
		# 	return { "isCompleted": False, "conclusion": "File not found" }
		# # emit("response", "Step 2")
		# if file.filename == '':
		# 	return { "isCompleted": False, "conclusion": "Filename error" }
		# # emit("response", "Step 3")
		# if file: 
		# 	fileName = file.filename.split('.')[0]
		# 	featureFile = fileName + "-analysis.json"
		# 	file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))
		# 	# emit("response", "Step 4")
		# 	result = subprocess.run(['bash', os.path.join(app.root_path, 'AndroPyTool-Autorun', 'AndroPy_autorun_v2.sh'), os.path.join(app.root_path,'static', 'files'), os.path.join(app.root_path,'reports') ])
		# 	# emit("response", "Step 5")
		# 	feature_file_path = os.path.join(app.root_path, 'reports', 'Features_files', featureFile)
		# 	# emit("response", "Step 6")
		# 	with open(feature_file_path, "r") as file:
		# 		# emit("response", "Step 7")
		# 		feature_file = file.read()
		# 		x_train_BW = []
		# 		x_train_BW.append(feature_file)
		# 		prediction = model.predict(x_train_BW)  
		# 		threshold = 2.549594
		# 		binary_predictions = np.where(prediction[:, 0] > threshold, 1, 0)
		# 		# emit("response", "Step 8")

		# 		# Remove output folder for the next extraction
		# 		shutil.rmtree(os.path.join(app.root_path, 'reports', 'DroidBox_outputs'))
		# 		shutil.rmtree(os.path.join(app.root_path, 'reports', 'Dynamic'))
		# 		shutil.rmtree(os.path.join(app.root_path, 'reports', 'Features_files'))
		# 		shutil.rmtree(os.path.join(app.root_path, 'reports', 'FlowDroid_outputs'))
		# 		shutil.rmtree(os.path.join(app.root_path, 'reports', 'FlowDroid_processed'))
		# 		shutil.rmtree(os.path.join(app.root_path, 'reports', 'samples'))
		# 		shutil.rmtree(os.path.join(app.root_path, 'reports', 'VT_analysis'))
		# 		shutil.rmtree(os.path.join(app.root_path, 'reports', 'invalid_apks'))
		# 		# emit("response", "Step 9")

		# 		# Return JSON result
		# 		if binary_predictions == 1:
		# 			response = {
		# 				"isCompleted": True,
		# 				"conclusion": "malware"
		# 			}
		# 		else: 
		# 			response = {
		# 				"isCompleted": True,
		# 				"conclusion": "benign"
		# 			}
		# 		# emit("response", response)
		# 		return response
	except FileNotFoundError:
		return 'Error in process upload file'

@socketio.on('message')
def handle_message(data):
	print('received message: ' + data)
	emit("response", "Đã nhận được tin nhắn")
	for i in range(0, 1000):
		emit("response", i)
		time.sleep(1)
    
@socketio.on('connect')
def test_connect():
    socketio.emit('after connect',  {'data':'Lets dance'})

if __name__ == '__main__':
    # app.run(debug=True)
	socketio.run(app)
