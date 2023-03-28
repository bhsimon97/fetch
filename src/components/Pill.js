import { FaTimes } from "react-icons/fa";

export default function Pill(props) {
  return (
    <button
      style={{ display: "inline-block" }}
      onClick={(e) => {
        props.handleRemove(props.dog);
      }}
      className="bg-gray-500 text-white py-2 px-4 mx-1 rounded"
    >
      {props.dog.name}{" "}
      <FaTimes style={{ display: "inline", marginBottom: 2 + "px" }} />
    </button>
  );
}
