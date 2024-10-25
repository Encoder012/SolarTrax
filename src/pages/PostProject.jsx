import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react'; // Adjust according to your icon library
import FadeIn from '../components/FadeIn';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PostProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fundingGoal: '',
    raisedAmount: 0,
    sharesAvailable: 0,
    pricePerShare: 0,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Project submitted:', formData);
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-[#04011C] to-[#0D0D2D]">
      <div className="flex-1 py-5 px-8 sm:py-8 sm:px-14">
        <header className="flex items-center justify-between h-16">
          <FadeIn direction="down" delay={0.2} fullWidth>
            <h1 className="text-3xl font-semibold text-white">
              New Project
            </h1>
          </FadeIn>
          <FadeIn direction="down" delay={0.2}>
            <Link to="/projects">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-[#C554C5] border-[#C554C5] bg-transparent hover:bg-[#C554C5] hover:text-white transition duration-300"
              >
                View Projects
                <Send className="h-5 w-5" />
              </Button>
            </Link>
          </FadeIn>
        </header>

        <FadeIn direction="up" delay={0.2} fullWidth>
          <div className="p-8 flex flex-col w-full bg-[#1A1A2E] rounded-lg shadow-lg mt-4">
            <form className="w-full space-y-6 " onSubmit={handleSubmit}>
              <div className="flex flex-col w-full  gap-8">
                <div className="flex-1">
                  <div className="relative mb-6">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                    <div className="h-80 w-full bg-[#C554C5] rounded-lg flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
                      {formData.image ? (
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Project"
                          className="object-cover h-full w-full rounded-lg"
                        />
                      ) : (
                        <p className="text-white text-lg font-semibold">
                          Upload Image
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Project Name"
                      required
                      className="w-full bg-[#1A1A2E] border-b border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 hover:border-[#C554C5]"
                    />

                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Project Description"
                      required
                      className="w-full bg-[#1A1A2E] border-b border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 hover:border-[#C554C5]"
                    />

                    <Input
                      type="number"
                      name="fundingGoal"
                      value={formData.fundingGoal}
                      onChange={handleChange}
                      placeholder="Funding Goal (In $)"
                      required
                      className="w-full bg-[#1A1A2E] border-b border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 hover:border-[#C554C5]"
                    />
                    <Input
                      type="number"
                      name="raisedAmount"
                      value={formData.raisedAmount}
                      onChange={handleChange}
                      placeholder="Raised Amount (In $)"
                      required
                      className="w-full bg-[#1A1A2E] border-b border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 hover:border-[#C554C5]"
                    />
                    <Input
                      type="number"
                      name="sharesAvailable"
                      value={formData.sharesAvailable}
                      onChange={handleChange}
                      placeholder="Shares Available"
                      required
                      className="w-full bg-[#1A1A2E] border-b border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 hover:border-[#C554C5]"
                    />
                    <Input
                      type="number"
                      name="pricePerShare"
                      value={formData.pricePerShare}
                      onChange={handleChange}
                      placeholder="Price Per Share (In $)"
                      required
                      className="w-full bg-[#1A1A2E] border-b border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 hover:border-[#C554C5]"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-[35%] flex flex-col items-center justify-center">
                  <Button
                    type="submit"
                    className="mt-5 bg-[#C554C5] text-white py-3 rounded-lg hover:bg-[#9B4DFF] transition duration-300 w-full flex items-center justify-center shadow-lg"
                  >
                    Post Project
                    <Send className="h-5 w-5 mx-3" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default PostProject;
