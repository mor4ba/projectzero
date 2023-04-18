import Place from "../../../../db/models/Place";
import dbConnect from "../../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    // case "GET":
    //   const places = await Place.find();
    //   if (!places) {
    //     return response.status(404).json({ status: "Not found" });
    //   }
    //   return response.status(200).json(places);

    //   break;
    case "POST":
      try {
        const placeData = request.body;
        const place = new Place(placeData);
        await place.save();

        response.status(201).json({ status: "place created" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: error.message });
      }
      break;
  }
}
