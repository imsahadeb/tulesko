const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')
const mongoose = require('mongoose');

router.get('/', async(req,res) => {
    try{
           const aliens = await Alien.find()
           res.send(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.get('/:id', async(req,res) => {
    try{
           const alien = await Alien.findById(req.params.id)
           res.json(alien)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try{

        const a1 =  await alien.save();
        res.json(a1)
    }catch(err){
        res.send('Error');
        console.log(err);
    }
});
const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });
  
 
const DataModel = mongoose.model('Data', dataSchema);

router.post('/data', async (req, res) => {
    try {
      const requestData = req.body; // Array of objects in the request body
  
      // Insert the data into the database
      const insertedData = await DataModel.insertMany(requestData);
  
      res.json({ message: 'Data inserted successfully', data: insertedData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error inserting data' });
    }
  });

router.patch('/:id',async(req,res)=> {
    try{
        const alien = await Alien.findById(req.params.id) 
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})


router.delete('/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const alien = await Alien.findByIdAndDelete(id);
        if(!alien){
            return res.status(404).json({message: `cannot find any alien with ID ${id}`})
        }
        res.status(200).json(alien);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router