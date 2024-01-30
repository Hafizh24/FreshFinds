import { Navbar } from "../navbar"
import { useEffect, useState } from "react"
import { RxDotFilled } from "react-icons/rx"
import { CgLoadbar } from "react-icons/cg"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import arrowLong from '../../assets/home/arrow-long-up.svg'
import { ProductCards } from "./components/productCards"
import { BrowseProducts } from "./components/browseProducts"
import { Footer } from "../footer"
import homeLogin from '../../assets/home/home-login.jpg'
import { Link } from "react-router-dom"
import { DiscountedProducts } from "./components/discountedProducts"
import { useSelector } from "react-redux"
import axios from "../../api/axios"
import { useGeoLocation } from "../../hooks/useGeoLocation"

const imgSlides = [
  {
    url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    url: "https://images.unsplash.com/photo-1506617420156-8e4536971650?q=80&w=2023&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    url: "https://images.unsplash.com/photo-1605447813584-26aeb3f8e6ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    url: "https://images.unsplash.com/photo-1622371684824-dc014541a4f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

export const HomePage = () => {
  const customer = useSelector((state) => state.customer.value);
  const [currentIndex, setCurrentIndex] = useState(0)

  const { coordinates, loaded } = useGeoLocation();
    const [branchData, setBranchData] = useState(null);
  console.log(branchData);

    const fetchNearestBranch = async () => {
      if (loaded) {
          try {
              const response = await axios.post(
                  `branches/get-nearest?latitude=${coordinates.lat}&longitude=${coordinates.lng}`,
              );
              console.log("WWW", response)
              console.log(response.data.result[0]);
              setBranchData(response.data.result[0]);
          } catch (error) {
              console.log(error);
          }
      }
  };

  const fetchMainBranch = async () => {
      try {
          const response = await axios.get('branches/super-store');
          setBranchData(response.data.result);
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
      if (coordinates === null) {
          console.log('Location permission denied. Fetching data from main store.');
          fetchMainBranch();
      } else if (coordinates && loaded) {
          console.log(
              'Location permission granted. Fetching data from nearest store.',
          );
          fetchNearestBranch();
      }
  }, [loaded, coordinates?.lat, coordinates?.lng]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imgSlides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === imgSlides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const [categoryList, setCategoryList] = useState([])

    const getCategory = async () => {
        try {
            const response = await axios.get(`/categories/all?all=true}`)
            setCategoryList(response.data.result.rows)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getCategory();
    }, [])

  return (
    <>
      <Navbar />
      {/* ----- Hero Section ----- */}
      <div className="mx-[16px] md:mx-[32px] lg:mx-[160px] h-[80vh] md:h-[35vh] lg:h-[40vh] xl:h-[50vh] mt-4 mb-3 flex flex-col">
        {/* Hero: Img & Text */}
        <div className="flex flex-col md:flex-row w-full h-full rounded-2xl border border-[#D1D5D8] hover:shadow-md">
          <div className="flex flex-col py-6 px-7 gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col text-[28px] md:text-[30px] font-semibold md:max-w-[380px] lg:max-w-[350px]">
                <h1 className="tracking-tight"> <span className="bg-gradient-to-r from-[#86CBB8] to-[#067627] text-transparent bg-clip-text">Fresh Groceries</span> at Your Doorstep!</h1>
              </div>
              <span className="text-gray-600 max-w-[240px] text-[16px]">
                get the best fresh foods, drinks, household goods, health care, and many more
              </span>
            </div>
            <button
              type="submit"
              className="gap-2.5 flex items-center mt-4 md:mt-3 rounded-full bg-[#28302A] px-4 py-2.5 w-max text-[15px] font-medium text-white transition delay-100 ease-in-out hover:bg-[#151a17] "
            >
              <span>Shop Now</span>
              <img src={arrowLong} alt="" className="pt-[0.1rem]" />
            </button>
          </div>
          <div className="w-full h-full relative group">
            <div
              style={{ backgroundImage: `url(${imgSlides[currentIndex].url})` }}
              className="w-full h-full rounded-bl-2xl rounded-br-2xl md:rounded-bl-none md:rounded-r-2xl bg-center bg-cover duration-500"
            ></div>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="flex justify-center items-center gap-2">
        {/* Left arrow */}
        <div className="rounded-full text-[#BFBFBF] hover:text-gray-800 cursor-pointer">
          <IoIosArrowBack onClick={prevSlide} size={22} />
        </div>
        <div className="flex items-center justify-center">
          {imgSlides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`${currentIndex === slideIndex
                ? 'text-gray-800 text-4xl'
                : 'text-[#BFBFBF] hover:text-gray-800 text-2xl'
                }  cursor-pointer `}
            >
              {currentIndex === slideIndex ? <CgLoadbar /> : <RxDotFilled />}
            </div>
          ))}
        </div>
        {/* Right arrow */}
        <div className="rounded-full text-[#BFBFBF] hover:text-gray-800 cursor-pointer">
          <IoIosArrowForward onClick={nextSlide} size={22} />
        </div>
      </div>
      <ProductCards branchData={branchData} coordinates={coordinates}/>
      <DiscountedProducts />
      <BrowseProducts branch categoryList={categoryList} />
      {/*  */}
      {/* bg-[#f9f9f9]  */}
      {!customer && (
        <div className="bg-[#f9f9f9] px-[16px] md:px-[32px] lg:px-[160px] pb-[4rem] pt-[4rem] mt-10 flex flex-col">
          {/* Create Account Banner */}
          <div className="flex bg-white flex-col md:flex-row mx-auto h-full rounded-2xl border border-[#D1D5D8] hover:shadow-md">
            <div className="flex flex-col py-6 px-7 gap-2 justify-between mr-20 w-full md:w-max">
              <div className="flex flex-col gap-1.5">
                <span className="whitespace-pre tracking-tight font-semibold text-[24px] bg-gradient-to-r from-[#86CBB8] to-[#067627] text-transparent bg-clip-text">Create Your Account</span>
                <span className="text-gray-600 text-[15px] font-normal">
                  Enjoy even more discounts with a digital account
                </span>
              </div>
              <Link to={'/register'}>
                <button
                  type="submit"
                  className="gap-2.5 flex items-center mt-4 md:mt-3 rounded-full bg-[#28302A] px-4 py-2.5 w-max text-[13.5px] font-medium text-white transition delay-100 ease-in-out hover:bg-[#151a17] "
                >
                  <span>Sign Up</span>
                  <img src={arrowLong} alt="" className="pt-[0.1rem]" />
                </button>
              </Link>
            </div>
            <div className="w-full h-full relative">
              <img src={homeLogin} alt="" className="h-[150px] md:h-[200px] w-full rounded-bl-2xl rounded-br-2xl md:rounded-bl-none md:rounded-r-2xl object-cover" />
            </div>
          </div>
        </div>
      )}

      {/*  */}
      {/*  */}
      <Footer />
    </>
  );
} 