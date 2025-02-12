import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useProduct } from "../context/product-context";

const FeaturedCategories = ({ imgSrc, categoryTitle }) => {
  const { dispatchFilters } = useProduct();

  const handleCategoryClick = () => {
    dispatchFilters({ type: "HOME-CATEGORIES-LINK", payload: categoryTitle });
  };

  return (
    <div className="category-items">
      <Link to="/products" onClick={handleCategoryClick} className="block text-center">
        <p className="category-item-text para-lg font-bold">{categoryTitle}</p>
        <img className="img-responsive mx-auto" src={imgSrc} alt={categoryTitle} />
      </Link>
    </div>
  );
};

FeaturedCategories.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  categoryTitle: PropTypes.string.isRequired,
};

export default FeaturedCategories;
