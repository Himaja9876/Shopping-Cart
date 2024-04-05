import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, style }) => {
  const filledStars = rating >= 4.5 ? 5 : 4;

  return (
    <div style={{ display: 'inline-block' }}>
      {[...Array(filledStars)].map((_, i) => (
        <span key={i} style={style}>
          <AiFillStar fontSize="15px" />
        </span>
      ))}
      {[...Array(5 - filledStars)].map((_, i) => (
        <span key={i + filledStars} style={style}>
          <AiOutlineStar fontSize="15px" />
        </span>
      ))}
    </div>
  );
};

export default Rating;
