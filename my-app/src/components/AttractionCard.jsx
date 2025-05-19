import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function AttractionCard({ item, isSaved, onSave }) {
  const imageUrl = item.images?.[0]?.url || '/placeholder.png';

  return (
    <div>
      <img src={imageUrl} alt={item.name} className="image" />
      <h3 className="title">{item.name}</h3>
      {item.info && <p className="description">{item.info}</p>}

      <button onClick={() => onSave(item.id)}>
        <FontAwesomeIcon icon={isSaved ? solidHeart : regularHeart} />
      </button>
    </div>
  );
}
