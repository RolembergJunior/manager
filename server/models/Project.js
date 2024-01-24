const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    description: {
        type: String,
    },
    staus: {
        type: String,
        enum: ['Não iniciado', 'Em progresso', 'Completado']
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

module.exports = mongoose.model('Project', ProjectSchema);