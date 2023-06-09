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
            comment: [{ body: placeData.body, date: newdate, likedBye: [] }],
          });

          newPlace.save();
        }

        response.status(201).json({ status: "place created" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
      break;
    case "PATCH":
      try {
        const updatedEntry = await Place.findByIdAndUpdate(request.body, {
          inModeration: false,
        });

        updatedEntry.save();
        response.status(201).json({ status: "place created" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
      break;

    case "PUT":
      try {
        const data = request.body;

        const currentPlace = await Place.findById(data.id);
        const newImages = currentPlace.images
          ? [
              ...currentPlace.images,
              { url: request.body.image, inModeration: true },
            ]
          : [{ url: request.body.image, inModeration: true }];

        const updatedPlace = await Place.findByIdAndUpdate(request.body.id, {
          images: newImages,
        });

        updatedPlace.save();
        response.status(201).json({ status: "image put to db" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
  }
}
