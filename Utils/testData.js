function generateEmail() {
    return `abhinav_${Date.now()}@gmail.com`;
}

module.exports = { generateEmail };