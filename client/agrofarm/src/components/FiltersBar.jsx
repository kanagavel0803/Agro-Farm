import { useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useProduct } from "../context/product-context";
import { GetFeaturedCategories } from "../services/getFeaturedCategories";

const FiltersBar = () => {
  const { filterState, dispatchFilters } = useProduct();

  const ratingsInput = [
    { title: "4-star", label: "4 Stars & above", star: 4, id: "4S" },
    { title: "3-star", label: "3 Stars & above", star: 3, id: "3S" },
    { title: "2-star", label: "2 Stars & above", star: 2, id: "2S" },
    { title: "1-star", label: "1 Stars & above", star: 1, id: "1S" },
  ];

  const handleClearFilters = useCallback(() => {
    dispatchFilters({ type: "CLEAR-FILTERS" });
    toast.success("Filters Cleared!");
  }, [dispatchFilters]);

  return (
    <aside className="filters-sidebar flex-column pd-sm">
      {/* Filter Title & Clear Button */}
      <div className="filter-title align-center mg-top-xsm">
        <p className="para-md fw-bold">Filters</p>
        <button className="para-sm filter-clear-btn" onClick={handleClearFilters}>
          CLEAR
        </button>
      </div>

      {/* Price Filter */}
      <div className="filter-title mg-top-sm">
        <p className="para-md fw-bold">Price in ₹</p>
      </div>
      <div className="filter-price flex">
        <span>200</span>
        <span>1000</span>
        <span>2000</span>
      </div>
      <input
        type="range"
        step="200"
        min="200"
        max="2000"
        value={filterState.maxPriceRange}
        className="price-slider mg-left-xsm"
        onChange={(e) => dispatchFilters({ type: "PRICE-RANGE-FILTER", payload: e.target.value })}
      />

      {/* Categories Filter */}
      <FilterSection title="Categories">
        {GetFeaturedCategories().map((item) => (
          <FilterCheckbox
            key={item._id}
            id={item._id}
            name={item.categoryName}
            checked={filterState.categoryNames.includes(item.categoryName)}
            onChange={() => dispatchFilters({ type: "CATEGORIES", payload: item.categoryName })}
          />
        ))}
      </FilterSection>

      {/* Ratings Filter */}
      <FilterSection title="Ratings">
        {ratingsInput.map((item) => (
          <FilterRadio
            key={item.id}
            id={item.title}
            name="star-ratings"
            label={item.label}
            checked={filterState.ratings === item.star}
            onChange={() => dispatchFilters({ type: "RATINGS", payload: item.star })}
          />
        ))}
      </FilterSection>

      {/* Sort By Filter */}
      <FilterSection title="Sort By">
        <FilterRadio
          id="low-high"
          name="sort-radio"
          label="Low to High"
          checked={filterState.sortBy === "PRICE-LOW-TO-HIGH"}
          onChange={() => dispatchFilters({ type: "SORT", payload: "PRICE-LOW-TO-HIGH" })}
        />
        <FilterRadio
          id="high-low"
          name="sort-radio"
          label="High to Low"
          checked={filterState.sortBy === "PRICE-HIGH-TO-LOW"}
          onChange={() => dispatchFilters({ type: "SORT", payload: "PRICE-HIGH-TO-LOW" })}
        />
      </FilterSection>

      {/* Hide Out of Stock Filter */}
      <FilterSection title="Product Availability">
        <FilterCheckbox
          id="out-of-stock-toggle"
          name="toggle-outstock"
          label="Hide Out of Stock"
          checked={filterState.removeOutOfStock}
          onChange={() => dispatchFilters({ type: "REMOVE-OUT-OF-STOCK" })}
        />
      </FilterSection>
    </aside>
  );
};

// **Reusable Filter Section Component**
const FilterSection = ({ title, children }) => (
  <div className="filter-title mg-top-sm mg-bottom-xsm">
    <p className="para-md fw-bold">{title}</p>
    <div className="filter-options">{children}</div>
  </div>
);

// **Reusable Checkbox Component**
const FilterCheckbox = ({ id, name, label, checked, onChange }) => (
  <div className="items">
    <label className="mg-y-xsm fw-bold align-center" htmlFor={id}>
      <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
      {label || name}
    </label>
  </div>
);

// **Reusable Radio Button Component**
const FilterRadio = ({ id, name, label, checked, onChange }) => (
  <div className="items">
    <label className="mg-y-xsm fw-bold align-center" htmlFor={id}>
      <input type="radio" id={id} name={name} checked={checked} onChange={onChange} />
      {label}
    </label>
  </div>
);

// **PropTypes for Validation**
FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FilterCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

FilterRadio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FiltersBar;
