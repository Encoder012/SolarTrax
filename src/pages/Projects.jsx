import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Share2 } from "lucide-react";
import '../App.css';
import FadeIn from '../components/FadeIn';

const fetchProjectData = async (urls) => {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching project data from ${url}:`, error);
        }
    }
    throw new Error('All fetch attempts failed');
};

function Projects() {
    const [projects, setProjects] = useState([]);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const urls = ['/projects.json'];

        const fetchData = async () => {
            try {
                const data = await fetchProjectData(urls);
                setProjects(data || []);
            } catch (error) {
                console.error('Failed to fetch project data from all sources:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    return (
        <div className="flex min-h-screen w-full overflow-hidden scrollbar-hidden bg-[#04011C] text-white">
            <div className="flex-1 p-4 sm:p-8 overflow-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-[#0D0D2D] border-b border-gray-800">
                    <FadeIn direction="down" delay={0.1} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-white">Projects</h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.1}>
                        <Link to="/projects/post-project">
                            <Button variant="outline" className="flex items-center gap-2 text-[#C554C5] border-[#C554C5] bg-[#0D0D2D] hover:bg-[#C554C5] hover:text-white">
                                <PlusCircle className="h-5 w-5" />
                                Post a Project
                            </Button>
                        </Link>
                    </FadeIn>
                </header>

                <FadeIn direction="up" delay={0.3} fullWidth>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="relative h-[350px] w-full mx-auto overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer bg-gradient-to-t from-[#C554C54D] to-[#9999994D]"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                onClick={() => handleProjectClick(project.id)}
                            >
                                <img
                                    src={project.Image}
                                    alt={project.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute top-2 right-2 p-2 bg-[#1A3A2C] rounded-full shadow-md hover:bg-[#C554C5] transition-colors cursor-pointer">
                                    <Share2 className="h-4 w-4 text-white" />
                                </div>
                                <div className={`absolute inset-0 rounded-lg p-4 bg-gradient-to-t from-[#0D0D2D] to-[#04011C] transition-transform duration-500 ease-in-out ${hoveredProject === project.id ? "translate-y-[15%]" : "translate-y-[30%]"}`}>
                                    <h2 className="text-xl font-bold sm:line-clamp-1 text-white">{project.title}</h2>
                                    <div className="flex items-center mt-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={project.createdByImage} alt={project.createdBy} />
                                            <AvatarFallback>{project.createdBy.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="ml-2 text-sm font-medium text-white">{project.createdBy}</p>
                                    </div>
                                    <p className="mt-2 text-gray-300 sm:line-clamp-3 line-clamp-2">{project.description}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="flex flex-col w-full">
                                            <div className="relative w-full bg-gray-600 rounded-full h-2">
                                                <div
                                                    className="absolute h-2 bg-[#C554C5] rounded-full"
                                                    style={{ width: `${(project.raisedAmount / project.fundingGoal) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex flex-row w-full mt-4">
                                                <span className="mt-1 text-[#C554C5] font-semibold text-lg">${project.raisedAmount}</span>
                                                {/* Highlighted rounded box for the funding goal */}
                                                <span className="mt-1 bg-[#C554C5] text-white rounded-full px-2 py-1 text-sm font-medium ml-auto">
                                                    ${project.fundingGoal} goal
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    {/* Move the button below the other content and make it conditional on hover */}
                                    {hoveredProject === project.id && (
                                        <div className="absolute bottom-16 left-4 right-4">
                                            <Button className="w-full bg-[#C554C5] text-white py-1 rounded-md hover:bg-purple-700">
                                                Invest
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default Projects;
