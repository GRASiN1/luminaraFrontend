import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAlert } from "../../contexts/AlertContext";
import { useUser } from "../../contexts/UserContext";
import { axiosInstance, END_POINTS } from "../../services/api";
import ReviewLoader from "./reviewLoader";

export default function ProductDetail() {
  const location = useLocation();
  const { product } = location.state;
  const { showAlert } = useAlert();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      let hasError = false;
      try {
        const response = await axiosInstance.get(END_POINTS.GET_REVIEWS, {
          params: { productId: product._id },
        });
        if (response.data.reviews?.length <= 0)
          throw new Error("No reviews found");
        setReviews(response.data.reviews);
      } catch (error) {
        hasError = true;
      } finally {
        if (!hasError) setLoading(false);
      }
    }
    fetchReviews();
  }, [product._id]);

  function handleBuy() {
    const existingProductIndex = cartItems.find(
      (item) => item._id === product._id
    );
    if (existingProductIndex !== -1) {
      removeFromCart(product._id);
    }
    const newItem = { ...product, quantity: 1 };
    localStorage.setItem("product", JSON.stringify(newItem));
    navigate("/checkout");
  }

  function handleAddToCart() {
    addToCart(product);
    showAlert("Product added to cart", "Success");
  }

  async function handleAddReview(e) {
    e.preventDefault();
    const hasReviewed = reviews.some(
      (review) => review.reviewBy._id === user._id
    );
    if (hasReviewed) {
      showAlert("You have already reviewed this product", "Info");
      return;
    }
    try {
      const response = await axiosInstance.post(
        END_POINTS.ADD_REVIEW.replace(":productId", product._id),
        {
          comment: review,
          rating: rating,
          productId: product._id,
        }
      );
      setReview("");
      setRating(0);
      setReviews((prevReviews) => [...prevReviews, response.data.review]);
    } catch (error) {
      showAlert("Failed to submit review", "Error");
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-pink-50 p-10">
      <div className="w-full h-full flex flex-row justify-around items-center">
        <div className="w-1/2 flex justify-center items-center p-2">
          <img
            src={product.productImage}
            alt={product.productName}
            width={450}
            className="rounded-md"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-start items-start">
          <div className="w-full h-full flex flex-col justify-start items-start border-b-1 border-mistyRose pb-3">
            <h3 className="text-4xl font-bold">{product.productName}</h3>
            <p className="text-xl">{product.productDescription}</p>
          </div>
          <div className="w-full h-full flex flex-col justify-start items-start border-b-1 border-mistyRose pb-3 my-2">
            <p className="text-xl">₹ {product.productPrice}</p>
            <div className="w-full flex flex-row justify-start items-center gap-5 my-3">
              <button
                onClick={handleBuy}
                className="bg-black px-3 py-1 text-white rounded-md hover:bg-salmonPink hover:text-black"
              >
                Buy
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-black px-3 py-1 text-white rounded-md hover:bg-salmonPink hover:text-black"
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-start items-start border-b-1 border-mistyRose pb-3">
            <h3 className="text-xl font-semibold">Product Details</h3>
            {Object.entries(product.details).map(([key, value]) => (
              <p key={key} className="text-lg">
                {key} : {value}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="min-w-full h-full flex justify-center items-start flex-col mt-5 border-t-1 pt-5 border-mistyRose">
        {user && (
          <form
            onSubmit={handleAddReview}
            className="w-min flex flex-col justify-start items-start gap-2"
          >
            <div className="flex flex-row items-start justify-center w-full gap-2">
              <textarea
                name="review"
                id="review"
                className="text-center outline-none text-md border-2 text-redwood placeholder:text-redwood bg-white border-mistyRose resize-none rounded-lg p-3 h-10"
                placeholder="Add a review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer text-2xl ${
                      index < Math.round(rating)
                        ? "text-redwood"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(index + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button
              className="bg-black px-3 py-2 w-full md:w-auto rounded-md text-white hover:bg-salmonPink hover:text-black"
              type="submit"
            >
              Add Review
            </button>
          </form>
        )}
        {!loading ? (
          reviews?.map((review) => (
            <div
              key={review._id}
              className="w-full h-full flex flex-col justify-start items-start border-b border-mistyRose pb-3 my-2"
            >
              <div className="flex flex-row gap-3 justify-center items-center">
                <img
                  src={review.reviewBy.image}
                  alt="user profile"
                  className="w-10 h-10 rounded-full"
                />
                <h3 className="text-xl font-semibold">
                  {review.reviewBy.fullName}
                </h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-xl ${
                        index < review.stars
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-lg">{review.reviewBody}</p>
            </div>
          ))
        ) : (
          <>
            <ReviewLoader />
            <ReviewLoader />
          </>
        )}
      </div>
    </div>
  );
}
