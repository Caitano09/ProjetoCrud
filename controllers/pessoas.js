const pessoas = require('../models/pessoas')

const index = async(connection, req, res) => {
    params = {
        pageSize: req.query.pageSize || 50,
        currentPage: req.query.page || 0
    }
    const pessoasRetornadas = await pessoas.findAll(connection, params)
    res.render('pessoas/index',{results: pessoasRetornadas})
    
}

const deleteOne = async(connection, req, res) =>{
    await pessoas.deleteOne(connection, req.params.id)
    res.redirect('/pessoas')
}

const createForm = (req, res) =>{
    res.render('pessoas/create')
}

const createProcess = async(connection, req, res)=>{
    await pessoas.create(connection, req.body)
    res.redirect('/pessoas')
}  

const updateForm = async(connection, req, res) =>{
    const pessoa = await pessoas.findById(connection, req.params.id)
    res.render('pessoas/update', {pessoa})
}

const updateProcess = async(connection, req, res)=>{
    await pessoas.update(connection, req.params.id, req.body)
    res.redirect('/pessoas')
} 

module.exports = {
    index,
    deleteOne,
    createForm,
    createProcess,
    updateForm,
    updateProcess
}