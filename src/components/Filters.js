import { Form, Button } from 'react-bootstrap';
import { CartState } from '../context/Context';

const Filters = () => {

  const {
    state: { products },
    productDispatch,
    productState: { sort },
  } = CartState();

  return (
    <div className="filters">
      <span className="title">Sort by Filters</span>
      <span>
        <Form.Check
          inline
          label="Low to High"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="High to Low"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <Button style={{ width: 140, height: 32, fontSize: 13 }}
        variant="light"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
            payload: products,
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;