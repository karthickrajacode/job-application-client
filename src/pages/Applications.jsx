import React, { useEffect, useState } from "react";
import {
  ApplicationCard,
  CustomButton,
  Header,
  ListBox,
  Loading,
} from "../components";
import { apiRequest, updateURL } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Applications = () => {
  const { user } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [cmpLocation, setCmpLocation] = useState("");
  const [recordsCount, setRecordsCount] = useState(0);
  const [sort, setSort] = useState("Newest");
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [numPage, setNumPage] = useState(1);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchApplications = async () => {
    setIsFetching(true);

    const newURL = updateURL({
      pageNum: page,
      query: searchQuery,
      cmpLoc: cmpLocation,
      sort: sort,
      navigate: navigate,
      location: location,
    });

    try {
      const res = await apiRequest({
        url: newURL,
        token: user?.token,
        method: "GET",
      });

      setNumPage(res?.numOfPage);
      setRecordsCount(res?.total);
      setData(res?.data);

      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    fetchApplications();
  };
  const handleShowMore = () => {};
  useEffect(() => {
    fetchApplications();
  }, [page, sort]);

  return (
    <div className="w-full">
      <Header
        title="Your Applications List"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={setCmpLocation}
        status="1"
      />
      <div className="container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 md:px-0 py-6 bg-[#f7fdfd]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm md:text-base">
            Showing: <span className="font-semibold">{recordsCount}</span> Jobs
            Applied
          </p>

          <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
            <p className="text-sm md:text-base">Sort By:</p>

            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          { data?.map((cmp, index) => (
            <ApplicationCard cmp={cmp} key={index} />
          ))}

          {isFetching && (
            <div className="mt-10">
              <Loading />
            </div>
          )}

          <p className="text-sm text-right">
            {data?.length} records out of {recordsCount}
          </p>
        </div>

        {numPage > page && !isFetching && (
          <div className="w-full flex items-center justify-center pt-16">
            <CustomButton
              onClick={handleShowMore}
              title="Load More"
              containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
