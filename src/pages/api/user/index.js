import User from "../../../../db/models/User";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      break;
    case "PATCH":
      try {
        const data = request.body;
        var updatedPlaces = [];

        if (!data.bool) {
          updatedPlaces = data.session.savedPlaces
            ? [...data.session.savedPlaces, data.place]
            : [data.place];
        } else {
          updatedPlaces = data.session.savedPlaces.filter(
            (place) => place != data.place
          );
        }

        let currentUser = await User.findByIdAndUpdate(data.session.id, {
          savedPlaces: updatedPlaces,
        });

        currentUser.save();
        response.status(201).json({ status: "User updated" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
      break;
    case "PUT":
      try {
        const data = request.body;

        let userHasBeenHere = data.session.beenTo
          ? [...data.session.beenTo, data.place]
          : [data.place];

        let currentUser = await User.findByIdAndUpdate(data.session.id, {
          beenTo: userHasBeenHere,
        });

        let updateIncrement = await Place.findByIdAndUpdate(data.place, {
          $inc: { count: 1 },
        });

        console.log(updateIncrement);

        currentUser.save();
        updateIncrement.save();
        response.status(201).json({ status: "User updated" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
      break;
  }
}
