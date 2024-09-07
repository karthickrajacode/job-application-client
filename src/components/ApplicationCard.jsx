import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const ApplicationCard = ({ cmp }) => {
  return (
    <div className="w-full h-16 flex gap-4 items-center justify-between bg-white shadow-md rounded">
      <div className="w-3/4 md:w-2/4 flex gap-4 items-center">
        <Link to={`/company-profile/${cmp?.jobPosting.company._id}`}>
          <img
            src={cmp?.jobPosting.company.profileUrl}
            alt={cmp?.jobPosting.jobTitle}
            className="w-8 md:w-12 h-8 md:h-12 rounded"
          />
        </Link>
        <div className="h-full flex flex-col">
          <Link
            to={`/job-detail/${cmp?.jobPosting._id}`}
            className="text-base md:text-lg font-semibold text-gray-600 truncate"
          >
            {cmp?.jobPosting.jobTitle}
          </Link>
          <span className="text-sm text-blue-600">
            {cmp?.jobPosting.company.name}
          </span>
        </div>
      </div>

      <div className="w-1/4 h-full flex flex-col items-center">
        <span className="text-xs md:base font-normal text-gray-600">
          Created At
        </span>
        <p className="text-base text-start">
          {moment(cmp?.createdAt).fromNow()}
        </p>
      </div>

      <div className="w-1/4 h-full flex flex-col items-center">
        <span className="text-xs md:base font-normal text-gray-600">
          Updated At
        </span>
        <p className="text-base text-start">
          {moment(cmp?.updatedAt).fromNow()}
        </p>
      </div>

      <div className="w-1/4 h-full flex flex-col items-center">
        <span className="text-xs md:base font-normal text-gray-600">
          Status
        </span>
        <p className="text-blue-600 font-semibold">{cmp?.status}</p>
      </div>
    </div>
  );
};

export default ApplicationCard;
