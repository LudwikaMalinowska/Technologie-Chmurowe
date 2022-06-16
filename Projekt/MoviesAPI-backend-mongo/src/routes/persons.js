const express = require("express");
const mongoose = require('mongoose');
const router = express.Router({mergeParams: true});

const Person = require("../models/Person");

const messages = {
    TITLE_DUPLICATE: 'TITLE_DUPLICATE',
    ELEMENT_NOT_EXIST: 'ELEMENT_NOT_EXIST'
};

router.get('/', async (req, res) => {
    const query = Person.find({});
    query.exec(function (err, persons) {
      if (err) console.log(err);
      return res.send(persons);
    })
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const query = Person.findOne({"id": id})
    query.exec(function (err, person) {
      if (err) console.log(err);
      if (person !== null)
        return res.send(person);
      else {
        res.status(500).send(messages.ELEMENT_NOT_EXIST);
      }
    })
});


router.post('/', async (req, res) => {
  const newId = parseInt(Math.random() * 100000);
  
    const newPerson = new Person({
        "id": newId,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "birth_date": req.body.birth_date,
        "nationality": req.body.nationality
    });

    newPerson.save()
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      res.status(500).json(err);
    })
    
});



router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    const query = Person.deleteOne({"id": id});
    query.exec(function (err, person) {
      if (err) console.log(err);
      if (person !== null){
        return res.send(person);
      } else {
        res.status(400).json({error: "User not found"})
      }
    })
});


router.put("/:id", async (req, res) => {
    const id = req.params.id;

    const updatedPerson = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "birth_date": req.body.birth_date,
        "nationality": req.body.nationality
    }
    const query = Person.findOneAndUpdate({"id": id}, {
      $set: updatedPerson
    });
    query.exec(function (err, person) {
      if (err) console.log(err);
      if (person !== null) {
        return res.send({
          ...updatedPerson,
          "id": id
        });
      }
      else {
        res.status(400).json({error: "Person not found"})
      }
    })
});

module.exports = router;
