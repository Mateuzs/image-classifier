import bodyparser from "body-parser";
import image from "get-image-data";
import { tensor3d } from "@tensorflow/tfjs";
import tfcore from "@tensorflow/tfjs-node";
import { load } from "@tensorflow-models/mobilenet";

const classifyImage = (url: string) => {
  return new Promise((resolve, reject) => {
    image(url, async (error: Error, img: ImageData) => {
      if (error) {
        reject(error);
      } else {
        const channelCount = 3;
        const pixelCount = img.height * img.width;
        const values = new Int32Array(pixelCount * channelCount);

        const pixels = img.data;

        for (let i = 0; i < pixelCount; i++) {
          for (let k = 0; k < channelCount; k++) {
            values[i * channelCount + k] = pixels[i * 4 + k];
          }
        }

        const input = tensor3d(
          values,
          [img.height as number, img.width as number, channelCount],
          "int32"
        );

        const model = await load();

        const temp = await model.classify(input);

        resolve(temp);
      }
    });
  });
};

export default classifyImage;
