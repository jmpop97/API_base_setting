from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify
from bson import json_util
from bson import ObjectId
app = Flask(__name__)


client = MongoClient('mongodb+srv://oneB:<passward>@onea.ojn8ull.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta
    

@app.route('/')
def main():
    return render_template('index.html')

#Create data
@app.route('/member', methods=["POST"])
def create_member():
    m_img_receive = request.form['m_img_give']
    doc ={'m_img': m_img_receive
          }
    db.test.insert_one(doc)
    return jsonify({'msg':'저장완료!'})

#Read member 
@app.route('/members',methods=["GET"])
def read_member():
    allmembers_data = list(db.test.find({}))
    return json_util.dumps({'result':allmembers_data})

#Delete member
@app.route('/member',methods=["DELETE"])
def delete_members():
    id_receive = request.form['m_id_give']
    db.test.delete_one({'_id':ObjectId(id_receive)})
    return jsonify({'msg':'삭제완료!'})

#Update member
@app.route('/member',methods=["PUT"])
def update_member():
    id_receive = request.form['m_id_give']
    m_img_receive = request.form['m_img_give']
    doc ={'m_img': m_img_receive,
          }
    db.test.update_one({'_id':ObjectId(id_receive)},{'$set': doc})
    return jsonify({'msg':'수정완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)