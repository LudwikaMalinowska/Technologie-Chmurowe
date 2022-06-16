const express = require('express');
const mongoose = require('mongoose');
const router = express.Router({mergeParams: true});
const redisClient = require("../config/redisClient");

const Movie = require("../models/Movie");
const Person = require("../models/Person");
const Actor = require("../models/Actor");

const messages = {
    TITLE_DUPLICATE: 'TITLE_DUPLICATE',
    DIRECTOR_NOT_EXISTS: 'DIRECTOR_NOT_EXISTS', 
    ELEMENT_NOT_EXIST: 'ELEMENT_NOT_EXIST'
};

router.get('/', async (req, res) => {
    const query = Movie.find({});
    query.exec(async function (err, movies) {
      if (err) return res.send(err);
      else {
        const message = "GET Movies";
        await redisClient.rpush("movieapp:logs", message);
        return res.send(movies);
      }
    })
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const query = Movie.findOne({"id": id})
    query.exec(async function (err, movie) {
      if (err) console.log(err);
      if (movie !== null){
        const message = "GET Movie: id=" + id;
        await redisClient.rpush("movieapp:logs", message);
        return res.send(movie);
      }
      else {
        res.status(500).send(messages.ELEMENT_NOT_EXIST);
      }
    })
});

router.post('/', async (req, res) => {
    const movieToAdd = req.body;
    const newId = parseInt(Math.random() * 100000);

    const newMovie = new Movie({
        id: newId,
        title: movieToAdd.title,
        genre: movieToAdd.genre,
        release_date: movieToAdd.release_date,
        description: movieToAdd.description,
        image_url: movieToAdd.image_url,
        director_id: movieToAdd.director_id
    });

    const u = await Movie.findOne({"title": req.body.title})
      .catch(err => console.log(err));
    if (u === null) {
      newMovie.save()
      .then(async result => {
        const message = "POST new Movie id=" + newId;
        await redisClient.rpush("movieapp:logs", message);
        return res.send(result);
      })
      .catch(err => console.log(err));
    } else {
      res.status(500).send(messages.TITLE_DUPLICATE);
    }
  });

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const query = Movie.deleteOne({"id": id});
    query.exec(async function (err, movie) {
      if (err) console.log(err);
      if (movie !== null){
        const message = "DELETE Movie id=" + id;
        await redisClient.rpush("movieapp:logs", message);
        return res.send(movie);
      } else {
        res.status(400).json({error: "Movie not found"})
      }
    })
})



router.put("/:id", async (req, res) => {
  const movieToAdd = req.body;
  const id = req.params.id;

  if (movieToAdd.director){
    const director = Person.findOne({"id": movieToAdd.director.id})

    if (director === null){
      return res.status(500).send(messages.DIRECTOR_NOT_EXISTS);
    }
  } else {
    movieToAdd.director_id = null;
  }
  
  const query = Movie.findOneAndUpdate({"id": id}, {$set: movieToAdd});

  query.exec(async function (err, movie) {
    if (err) console.log(err);
    if (movie !== null) {
      const message = "PUT Movie id=" + id;
      await redisClient.rpush("movieapp:logs", message);
      return res.send(movie);
    }
    else {
      res.status(400).json({error: "Movie not found"})
    }
  })
})


router.patch('/:id/director', async (req, res) => {
  const directorToSet = req.body;
  const id = req.params.id;
  
  if(directorToSet) {
      const director = Person.find({"id": directorToSet.id})

      if(director === null) {
          return res.status(500).send(messages.DIRECTOR_NOT_EXISTS);
      }
  } 

  const dirId = directorToSet ? directorToSet.id : null;

  const query = Movie.findOneAndUpdate({"id": id}, {$set: {"director_id": dirId}});

  query.exec(async function (err, movie) {
    if (err) console.log(err);
    if (movie !== null) {
      const message = "PATCH set director Movie id=" + id;
      await redisClient.rpush("movieapp:logs", message);
      return res.sendStatus(200);
    }
    else {
      res.sendStatus(400)
    }
  })
});

router.get('/:id/actors', async (req, res) => {
  const id = req.params.id;
  const actors = Actor.findOne({"movie_id": id})

  const message = "GET Movie Actors movie_id=" + id;
  await redisClient.rpush("movieapp:logs", message);
  return res.send(actors);
});

router.post('/:id/actors', async (req, res) => {
  const person = req.body;
  const id = req.params.id;

  const existingPerson = Person.findOne({"id": person.id})

  if(existingPerson === null) {
      return res.status(500).send(messages.ELEMENT_NOT_EXIST);
  }

  const newId = parseInt(Math.random() * 100000);
  const newActor = new Actor({
    "id": newId,
    "movie_id": id,
    "person_id": person.id
});

  const u = await Actor.findOne({"id": newActor.id})
      .catch(err => console.log(err));
    if (u === null) {
      newActor.save()
      .then(async result => {
        const message = `POST Movie Actors movie_id=${id} person_id=${person.id}`;
        await redisClient.rpush("movieapp:logs", message);
        return res.send(result);
      })
      .catch(err => {
        res.status(400).json(err);
      })
    }

  
});

router.delete('/:id/actors/:idPerson', async (req, res) => {
  const { id, idPerson } = req.params;

  const query = Actor.deleteOne({"person_id": idPerson, "movie_id": id});
  query.exec(async function (err, actor) {
    if (err) console.log(err);
    if (actor !== null){
      const message = `DELETE Movie Actor movie_id=${id} person_id=${idPerson}`;
      await redisClient.rpush("movieapp:logs", message);
      return res.sendStatus(200);
    } else {
      res.status(400);
    }
  })

});



module.exports = router;
