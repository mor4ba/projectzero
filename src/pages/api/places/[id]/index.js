import Place from "../../../../../db/models/Place";
import dbConnect from "../../../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (!id) {
    return;
  }

  switch (request.method) {
    case "GET":
      try {
        const places = await Place.findById(id);
        if (!places) {
          return response.status(404).json({ status: "Not found" });
        }
        return response.status(200).json(places);
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }

      break;
    case "POST":
      try {
        const commentData = request.body;

        async function updateComments(commentData) {
          var dateObj = new Date();
          var month = dateObj.toLocaleString("en-us", { month: "short" });
          var day = dateObj.getUTCDate();
          var year = dateObj.getUTCFullYear();

          let newdate = `${month.toUpperCase()} ${day}, ${year}`;

          const { id } = request.query;
          const currentPlace = await Place.findById(id);
          const newComment = commentData.comment;
          const updatedComments = await Place.findByIdAndUpdate(id, {
            comment: [
              ...currentPlace.comment,
              { body: newComment, date: newdate, likedBy: [] },
            ],
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
        async function updateRatings(ratingData) {
          const { id } = request.query;
          const currentPlace = await Place.findById(id);
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
    case "PUT":
      try {
        const data = request.body;
        const place = await Place.findById(data.placeID);
        let comment = place.comment.find(
          (comment) => comment._id == data.commentID
        );

        comment.likedBy.includes(data.userID)
          ? (comment.likedBy = comment.likedBy.filter(
              (element) => element != data.userID
            ))
          : (comment.likedBy = [...comment.likedBy, data.userID]);

        const updatedPlace = await Place.findOneAndUpdate(
          { _id: data.placeID, "comment._id": data.commentID },
          {
            $set: { "comment.$.likedBy": comment.likedBy },
          }
        );

        await updatedPlace.save();
        response.status(201).json({ status: "resolved" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
      break;
  }
}
