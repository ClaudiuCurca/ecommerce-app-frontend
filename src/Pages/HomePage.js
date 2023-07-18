import React, { useEffect, useState } from "react";
import { fetchCategoryNames } from "../Api/CategoryAPI";
import { useNavigate } from "react-router-dom";
import TopFiveProdcuts from "./Components/TopFiveProdcuts";
import Promo from "./Components/Promo";

function HomePage() {
  const [categoryNames, setCategoryNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategoryNames = async () => {
      try {
        setIsLoading(true);

        const fetchedCategoryNames = await fetchCategoryNames();
        setCategoryNames(fetchedCategoryNames.data);

        setIsLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };

    getCategoryNames();
  }, []);

  const handleClick = (e) => {
    navigate(`/category/${e.target.value}`);
  };

  if (isLoading) {
    return <div className="home"></div>;
  }

  return (
    <div className="home">
      <section className="home__header">
        <div className="home__categories">
          <h3 className="title">Categories</h3>
          <div className="category-list">
            {categoryNames.map((categoryName, index) => {
              return (
                <button
                  className="category-list__category"
                  key={categoryName.name}
                  value={categoryName.name}
                  onClick={handleClick}
                >
                  {categoryName.name}
                </button>
              );
            })}
          </div>
        </div>
        <Promo />
      </section>
      <section className="home__top-five">
        {categoryNames.map((category) => (
          <TopFiveProdcuts category={category.name} key={category._id} />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
