const { Firestore } = require("@google-cloud/firestore");

async function getHistoriesData() {
    try {
        const db = new Firestore();
        const snapshot = await db.collection('predictions').get();
        const histories = [];
        snapshot.forEach(doc => {
            const result = {
                id: doc.id,
                history: doc.data()
            }
            histories.push(result);
        });
        return histories;

    } catch (error) {
        console.error('Error getting documents', error);
        throw error;
    }
}

module.exports = getHistoriesData;