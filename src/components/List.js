import Card from "./Card";
export default function List({ data }) {
  return (
    <section className="grid grid-cols-2 gap-6 w-full mt-10">
      {data.map((place) => {
        return <Card place={place} key={place._id} />;
      })}
    </section>
  );
}
