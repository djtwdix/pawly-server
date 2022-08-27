import Users from "../models/UserModel.js";
import express from "express";
const app = express();

const checkIfUserExists = (userId) => {
  return Users.findById(userId, (err, data) => {
    if (err) {
      return null;
    } else {
      return data;
    }
  });
};

export const getUserById = (req, res) => {
  const user_id = req.params.userId;
  Users.findOne({ _id: user_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

export const createUser = async (req, res) => {
  const userInfo = req.body;
  req.session.user_id = userInfo._id;
  req.session.save(); 
  const userExists = await checkIfUserExists(req.body._id);
  if (!userExists) {
    Users.create(userInfo, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } else {
    Users.findOneAndUpdate({ _id: req.body._id }, userInfo, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
};

export const updateUser = (req, res) => {
  const userInfo = req.body;
  Users.updateOne(userInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

export const addLike = (req, res) => {
  const userId = req.params.userId;
  const likeId = req.body.likeId;
  Users.updateOne(
    { _id: userId },
    { $addToSet: { likes: likeId } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
};

  export const addBio = (req, res) => {
    const userId = req.params.userId;
    const bio = req.body.bio;
    Users.updateOne(
      { _id: userId },
      { bio: bio } ,
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      }
    );
  };

  export const signOut = (req, res) => {
    req.session.user_id = null;
  }

