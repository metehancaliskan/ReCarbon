import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SvgIcon from '../components/SvgIcon';

const ProjectCard = ({ id }) => {
  const [projectData, setProjectData] = useState({});

  const fetchProjectData = async (id) => {
    setProjectData({
      id: id,
      name: 'Project #' + id,
    });
  };

  useEffect(() => {
    fetchProjectData(id);
  }, [id]);

  return (
    <div className="flex w-full items-center justify-center shadow-2xl">
      <div className="w-full  overflow-hidden rounded-md max-w-sm p-2 flex flex-col">
        <div className="flex items-center justify-center p-2 text-center border-b border-gray-200">
          <h3 className="text-left text-lg text-black font-semibold text-center">
            {projectData.name}
          </h3>
        </div>
        <div className="flex justify-between p-5">
          <div className="w-full flex items-center justify-center  font-bold">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center rounded-full w-8 h-8">
                <SvgIcon icon="CARBON" className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-gray-50">

        <button
                // onClick={() => {
                //   setIsButtonLoading(true);
                //   createNewFlow(client.contract, client.rate);
                //   setTimeout(() => {
                //     setIsButtonLoading(false);
                //   }, 1000);
                // }}
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                
                Vote
              </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
