from flask import Flask, request, jsonify
import hashlib
from random import randint
import os


from core import ImageProcessor

debug = True

def Log(msg):
    if debug:
        print(f'\n-- [ {msg} ]--\n')


ALLOWED_EXTENSIONS = ['jpg', 'png', 'jpeg']

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    if 'q' not in request.files:
        return jsonify({'success': False, 'message': 'FileUploadError: NO_FILE_PART'})
    q = request.files['q']
    if q.filename == '':
        return jsonify({'success': False, 'message': 'FileUploadError: NO_FILE_IS_SELECTED'})
    ext = q.filename.split('.')[-1].lower()
    if ALLOWED_EXTENSIONS.count(ext) == 0:
        return jsonify({'success': False, 'message': 'FileUploadError: EXTENSION_NOT_ALLOWED'})
    tmp = ''
    for i in range(64):
        tmp += chr(randint(0, 9) + ord('0'))

    filename = (hashlib.md5(tmp.encode()).hexdigest()+'.'+ext)
    Log('filename='+filename)
    q.save(os.path.join('./public', filename))
    res = ImageProcessor.process(filename)
    print(res)
    return jsonify(res)


app.run(host='0.0.0.0', port=80)