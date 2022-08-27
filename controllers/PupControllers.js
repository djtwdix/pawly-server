import Pups from "../models/PupModel.js";
import mongoose from "mongoose";
import express from "express";

const app = express();

export const createPup = (req, res) => {
  const pupsInfo = req.body;
  Pups.create(pupsInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};

export const editPup = (req, res) => {
  const pupsInfo = req.body;
  const pupID = req.params.pupId;
  Pups.findOneAndUpdate({ _id: pupID }, pupsInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

export const addABone = (req, res) => {
  const pupID = req.params.pupId;
  Pups.findOneAndUpdate({ _id: pupID }, { $inc: { bones: 1 } }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

export const getPupsByOwner = (req, res) => {
  const owner_id = req.session.user_id;
  Pups.find({ owner_id: owner_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

export const getPupById = (req, res) => {
  const pupID = mongoose.Types.ObjectId(req.params.pupId);
  Pups.aggregate(
    [
      {
        $match: {
          _id: pupID,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner_id",
          foreignField: "_id",
          as: "owner",
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
};

export const getAllPups = (req, res) => {
  const user_id = req.session.user_id;
  Pups.aggregate(
    [
      {
        $match: {
          owner_id: { $ne: user_id },
        },
      },
      {
        $sort: {
          bones: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner_id",
          foreignField: "_id",
          as: "owner",
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
        console.log('data: ', data)
      }
    }
  );

};

export const destroyPupById = (req, res) => {
  const pupID = req.params.pupId;
  Pups.deleteOne({ _id: pupID }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
