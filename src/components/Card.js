export default function Card(props) {
  return (
    <div className="w-full rounded-lg shadow-md lg:max-w-sm">
      <img
        className="object-cover w-full h-72"
        src={props.dog.img}
        alt="image"
      />
      <div className="p-4">
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {props.dog.name}
        </h4>
        <p className=" leading-normal">
          {props.dog.breed} | {props.dog.age}{" "}
          {props.dog.age === 1 ? "year old" : "years old"}
        </p>
        <p className="mb-2 leading-normal">Zip Code: {props.dog.zip_code}</p>
        <button
          onClick={(e) => {
            props.handleSelect(props.dog);
          }}
          className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow"
        >
          Select for Matching
        </button>
      </div>
    </div>
  );
}
