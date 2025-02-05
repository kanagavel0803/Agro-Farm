import { useEffect, useState } from "react";
import { Navbar, Footer, FeaturedCategories } from "../components/allComponents";
import "../styles/pages/home.css";
import { GetFeaturedCategories } from "../services/getFeaturedCategories";
import { Link } from "react-router-dom";

export const Home = () => {
    const [categories, setCategories] = useState([]); // State to hold categories
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await GetFeaturedCategories(); // Fetch categories
                setCategories(data); // Set categories in state
            } catch (err) {
                setError(err); // Set error if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchCategories(); // Call the fetch function
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error fetching categories: {error.message}</div>; // Show error state
    }

    return (
        <>
            <Navbar />
            <div className="Home">
                {/* Header Image */}
                <header className="hero-header">
                    <div className="header-content flex-column-center">
                        <h1 className="banner-title lt-sp-2 mg-top-md text-center">
                            One Stop Solution for your farming needs
                        </h1>
                        <h2 className="banner-subtitle lt-sp-1 text-center">
                            Buy Fertilizers, Insecticides, Seeds & other Agriculture Products
                        </h2>
                        <Link
                            to="/products"
                            className="btn btn-solid btn-shop-now mg-lg btn-grad"
                        >
                            Shop Now
                        </Link>
                    </div>
                </header>
                <h2 className="text-center mg-top-md">Featured Categories</h2>
                <div className="title-underline"></div>
                <div className="categories">
                    {categories.map((item) => (
                        <FeaturedCategories
                            key={item._id}
                            imgSrc={item.imgSrc}
                            categoryTitle={item.categoryName}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};