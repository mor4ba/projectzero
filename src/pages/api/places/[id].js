import Place from "../../../../db/models/Place";
import dbConnect from "../../../../db/connect";
import { comment } from "postcss";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (!id) {
    return;
  }

  switch (request.method) {
    case "GET":
      console.log("get request is on!");
      const places = await Place.findById(id);
      if (!places) {
        return response.status(404).json({ status: "Not found" });
      }
      return response.status(200).json(places);

      break;
    case "POST":
      try {
        const commentData = request.body;

        async function updateComments(commentData) {
          const { id } = request.query;
          const currentPlace = await Place.findById(id);
          const newComment = commentData.comment;
          const updatedComments = await Place.findByIdAndUpdate(id, {
            comment: [...currentPlace.comment, newComment],
          });
          updatedComments.save();
        }

        updateComments(commentData);

        response.status(201).json({ status: "place created" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
      break;
    case "PATCH":
      try {
        const ratingData = request.body;

        console.log(ratingData.r_dresscode);

        async function updateRatings(ratingData) {
          const { id } = request.query;
          const currentPlace = await Place.findById(id);
          console.log("currentPlace:", currentPlace);
          const updatedRatings = await Place.findByIdAndUpdate(id, {
            r_dresscode: [...currentPlace.r_dresscode, ratingData.r_dresscode],
            r_amountOfPeople: [
              ...currentPlace.r_amountOfPeople,
              ratingData.r_amountOfPeople,
            ],
            r_volume: [...currentPlace.r_volume, ratingData.r_volume],
            r_isSmoking: [...currentPlace.r_isSmoking, ratingData.r_isSmoking],
            r_temperature: [
              ...currentPlace.r_temperature,
              ratingData.r_temperature,
            ],
            r_lights: [...currentPlace.r_lights, ratingData.r_lights],
            r_cringe: [...currentPlace.r_cringe, ratingData.r_cringe],
            r_age: [...currentPlace.r_age, ratingData.r_age],
            r_staff: [...currentPlace.r_staff, ratingData.r_staff],
            r_prices: [...currentPlace.r_dresscode, ratingData.r_dresscode],
          });

          updatedRatings.save();
        }

        updateRatings(ratingData);

        response.status(201).json({ status: "place created" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
      break;
  }
}
