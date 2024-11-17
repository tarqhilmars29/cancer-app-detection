const tf = require("@tensorflow/tfjs-node");
const InputError =  require("../exceptions/InputError");

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
    
        const prediction = model.predict(tensor);
        const score = await prediction.data();
    
        const classes = ["Cancer", "Non-cancer"];
        let label;
    
        let suggestion;
    
        if(score[0] > 0.5 && score[0] <= 1) {
            label = classes[0];
            suggestion = "Segera periksa ke dokter!";
        } else {
            label = classes[1];
            suggestion = "Penyakit kanker tidak terdeteksi.";
        } 
    
        return { label, suggestion };        
    } catch (error) {
        throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
    }
}

module.exports = predictClassification;