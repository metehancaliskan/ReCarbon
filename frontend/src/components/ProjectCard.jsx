import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SvgIcon from '../components/SvgIcon';
import {
  vote,
  votesReceived
} from '../utils/web3/vote';

const ProjectCard = ({ id }) => {
  const [projectData, setProjectData] = useState({});
  const [numberVote, setNumberVote] = useState(0);
  const [numberVoteWithWeight, setNumberVoteWithWeight] = useState(0);
  let projectAddresses = ["0xeA35D05ee498626d3602E931e73999dE10382Fb8", "0xB69418959376244779Aee02e537D3E9e13C880a1"];


  const voting = async () => {
    await vote(projectAddresses[id], numberVote);
  };

  async function getvotesReceived(){
    let tempvotes = await votesReceived(projectAddresses[id]);
    setNumberVoteWithWeight("Number of Votes:" + tempvotes);
  }


  const fetchProjectData = async (id) => {
    setProjectData({
      id: id,
      name: 'Project #' + id,
    });
  };

  useEffect(() => {
    try { 
      getvotesReceived();
     } catch (error) {
      
     }
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
                <SvgIcon icon="RC" className="w-5 h-5" />
              </div>
            </div>
            <div className='pb-3 block text-sm font-semibold'>{numberVoteWithWeight}</div>

          </div>
        </div>
        <div className="w-full text-gray-50">
        <input
          type="number"
          onChange={(event) => {
            setNumberVote(event.target.value);
          }}
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0"
          required
        />

        <button
                onClick={voting}
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
