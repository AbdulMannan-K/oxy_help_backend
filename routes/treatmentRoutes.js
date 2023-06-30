import express from "express";
import treatment from "../models/treatment.js";

const treatmentRoutes = express.Router();

treatmentRoutes.get("/", (req, res) => {

        treatment.find({}).then((treatments) => {
            res.status(200).json(treatments);
        }
        ).catch((err) => {
            res.status(400).json(err);

        }
        );

}
);

treatmentRoutes.delete("/:id", (req, res) => {

            treatment.findByIdAndDelete(req.params.id).then((treatment) => {
                res.status(200).json(treatment);
            }
            ).catch((err) => {
                res.status(400).json(err);

            }
            );

});
treatmentRoutes.post("/", (req, res) => {
    const treatment = new Treatment({
        total: req.body.total,
        completed: req.body.completed,
        events: req.body.events,
        currentRegistered: req.body.currentRegistered,
    });
    treatment.save().then((data) => {
        res.status(200).json(data);
    }
    ).catch((err) => {
        res.status(400).json(err);

    }
    );
}
);

treatmentRoutes.put("/:id", (req, res) => {
    treatment.findByIdAndUpdate(req.params.id, {
        total: req.body.total,
        completed: req.body.completed,
        events: req.body.events,
        currentRegistered: req.body.currentRegistered,
    }).then((data) => {
        res.status(200).json(data);
    }
    ).catch((err) => {
        res.status(400).json(err);

    }
    );
}
);
treatmentRoutes.get("/:id", (req, res) => {
    treatment.findById(req.params.id).then((treatment) => {
        res.status(200).json(treatment);
    }
    ).catch((err) => {
        res.status(400).json(err);

    }
    );
}
);

export default treatmentRoutes;