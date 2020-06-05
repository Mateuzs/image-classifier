import express, { Request, Response } from "express";
import { IncomingForm } from "formidable";
import cors from "cors";
import path from "path";
import classifyImage from "./classifyImage";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 9001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));

// this endpoint handles request send with file in body
app.post("/image", (req: Request, res: Response) => {
  const form = new IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send("Something went wrong during upload");
    } else {
      classifyImage(files.upload.path).then((imageClassification) => {
        res.status(200).send({ classification: imageClassification });
      });
    }
  });
});

app.post("/image-from-url", (req: Request, res: Response) => {
  classifyImage(req.body.url)
    .then((imageClassification) => {
      res.status(200).send({ classification: imageClassification });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send("Something went wrong during fetching source from URL");
    });
});

app.get("/", (req, res) =>
  res.sendFile("./client/build/index.html", { root: __dirname })
);

app.listen(port, () => console.log(`listening on port: ${port}`));
