import Place from "../../../../db/models/Place";
import dbConnect from "../../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const places = await Place.find();
      if (!places) {
        console.log("nothing here");
        return response.status(404).json({ status: "Not found" });
      }
      return response.status(200).json(places);

      break;
    case "POST":
      try {
        const placeData = request.body;
        const place = new Place(placeData);
        await place
          .save()
          .then(function (place) {
            const newId = place._id;
            console.log(place);
            updateInitialComment(newId);
          })
          .catch(function (err) {
            console.log(err);
          });

        async function updateInitialComment(id) {
          var dateObj = new Date();
          var month = dateObj.toLocaleString("en-us", { month: "short" });
          var day = dateObj.getUTCDate();
          var year = dateObj.getUTCFullYear();

          let newdate = `${month.toUpperCase()} ${day}, ${year}`;
          const newPlace = await Place.findByIdAndUpdate(id, {
            comment: [{ body: placeData.body, date: newdate }],
            inModeration: true,
          });

          newPlace.save();
        }

        response.status(201).json({ status: "place created" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
      break;
  }
}
