const tf = require("@tensorflow/tfjs-node");

async function loadModel(params) {
    return tf.loadGraphModel("https://storage.googleapis.com/cancer-detection-model/model-in-prod/model.json");
}

module.exports = loadModel;