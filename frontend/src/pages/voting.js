import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

function Voting() {
  const [query] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState(query.get('project') || '');
  const [projectIDs, setProjectIDs] = useState([]);

  const listedProjects = [
    {
      id: 1,
      project: 'ra'
    },
    {
      id: 2,
      project: 're'    }
  ];

  const projects = [
    {
      id: 'ra',
      name: 'Regenerative Agriculture',
    },
    {
      id: 're',
      name: 'Renewable Energy',
    }
  ];

const asyncGet =  async () =>{
  let modifiedNfts = [];
  return modifiedNfts.concat(listedProjects);
}

  useEffect(() => {
    asyncGet().then((i) =>{
        setProjectIDs(i);
    });

  }, [])

  return (
    <section className="w-full pt-24 md:pt-32 md:min-h-screen relative flex flex-col ">
      <div className="container w-full flex bg-red">
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-3/12">
            <aside aria-label="Sidebar" className="px-5">
              <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 shadow-2xl">
                <ul className="space-y-2">
                  <li>
                    <h2 className="p-2 text-lg font-bold">Projects</h2>
                  </li>
                  <li>
                    <Link
                      to="/voting"
                      className={
                        'flex items-center p-2 text-gray-900 rounded-lg' +
                        (selectedProject === '' ? 'hover:bg-gray-100' : '')
                      }
                      onClick={() => setSelectedProject('')}
                    >
                      <span className="ml-3">All</span>
                    </Link>
                  </li>
                  {projects.map((project) => (
                    <li key={project.id}>
                      <Link
                        to={`/voting?project=${project.id}`}
                        className={
                          'flex items-center p-2 text-gray-900 rounded-lg' +
                          (selectedProject === project ? 'hover:bg-gray-100' : '')
                        }
                        onClick={() => setSelectedProject(project.id)}
                      >
                        <span className="ml-3">{project.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
          <div className="w-full md:w-9/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {projectIDs
                .filter((prj) => {
                  return selectedProject === '' ? 'all' : prj.project === selectedProject;
                })
                .map((listedProject) => {
                  return <ProjectCard id={listedProject.id} key={listedProject.id} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Voting;
