export default function Card(props) {
  return (
    <div className="w-full rounded-lg shadow-md lg:max-w-sm">
      <img className="object-cover w-full h-72" src={props.image} alt="image" />
      <div className="p-4">
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {props.name}
        </h4>
        <p className=" leading-normal">
          {props.breed} | {props.age}{" "}
          {props.age === 1 ? "year old" : "years old"}
        </p>
        <p className="mb-2 leading-normal">Zip Code: {props.zip}</p>
        <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
          Read more
        </button>
        <input type="checkbox" name="checkbox" className="ml-6 mr-2" />
        <label for="checkbox">Select Dog for Match</label>
      </div>
    </div>
  );
}
