import React, { useState } from "react";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { Gameoflife, Skillstrainer, DebateHouse } from "./projects";
// import "./Components/Background";
import JuliaSetVisualizer from "./JuliaSetVisualizer";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

const App = () => {
  const [moreInfo, setmoreInfo] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const handleMouseMove = (e) => {
    setCursorPosition({ top: e.pageY + 10, left: e.pageX + 10 });
  };

  const [projects, setProjects] = useState([
    {
      title: "Skillstrainer",
      img: Skillstrainer,
      info: [
        {
          time: "Jul 2021 - Nov 2021",
          description:
            "Worked as an intern at Skillstrainer, Unifier's flagship learning management system",
        },
        {
          time: "Nov 2021 - May 2022",
          description: `Worked a junior developer at Skillstrainer, I was able to gain valuable hands-on experience working on the company's flagship learning management system. I had the opportunity to collaborate with a team of talented engineers, and together we were able to ship code that could handle scale and was being used by over 1 million users. This was a challenging but rewarding experience, as I was able to develop my skills in problem-solving and efficient code development. I also had the chance to work in a high growth startup environment, which allowed me to learn about the unique challenges and opportunities that come with working in a fast-paced, rapidly evolving company. Overall, my time at Skillstrainer was a great learning experience that helped me to grow both personally and professionally.`,
          link: "https://www.skillstrainer.in",
        },
      ],
    },
    {
      title: "DebateHouse",
      img: DebateHouse,
      info: [
        {
          description:
            "Debatehouse provides a platform for organized discussions on various topics. The goal is to allow people to consider multiple perspectives on a topic and come to a resolution through discussion. After the discussion is over, a summary of the debate is made available in the debate feed for others to learn from. The aim is to provide a larger perspective on the issue made available by the thoughtful discussion.",
          time: 2021,
          link: "https://www.youtube.com/watch?v=jXEDxppCj1g&ab_channel=AkshatSinghania",
        },
      ],
    },
    {
      title: "Game Of Life",
      img: Gameoflife,
      info: [
        {
          description: `A website that simulates the Conway's Game of Life, a
    mathematical model that shows the evolution of a
    population of cells according to predetermined rules.
    Users can set up the initial configuration of cells on a
    grid and watch as the cells interact and evolve.`,
          time: 2022,
          link: `https://conwayss-game-of-life.web.app`,
        },
      ],
    },
  ]);
  const handleEnter = (index) => {
    var newprojects = projects;
    newprojects[index]["show"] = true;
    setProjects([...newprojects]);
  };
  const handleLeave = (index) => {
    var newprojects = projects;
    newprojects[index]["show"] = false;
    setProjects([...newprojects]);
  };
  const handleClick = (index) => {
    var newprojects = projects;
    if (newprojects[index].expand) newprojects[index].expand = false;
    else newprojects[index].expand = true;
    setProjects(newprojects);
  };
  return (
    <div onMouseMove={handleMouseMove} className="index">
      <div className="animation-container">
        <JuliaSetVisualizer />
      </div>
      <div className="app">
        <div id="container"></div>
        <h1 className="glitch">
          <span>Hey I'm Akshat</span>
          Hey I'm Akshat
          <span>Hey I'm Akshat</span>
        </h1>

        <h2 className="about">
          I am a sophomore with a strong interest in computer science and have
          been working in the field for about 4 years now, focusing on full
          stack web development.
          <br />
          <br />I thrive on the challenge of competing in programming
          competitions and tackling projects that test my problem-solving
          abilities, often incorporating my love of physics and mathematics into
          my work.
          <br />
          <br />
          Recently, I have been exploring the field of machine learning, with a
          focus on supervised learning and also experimenting with 3d rendering.
          <br /> <br />I also enjoy dabbling in 3D modeling and speedcubing in
          my free time.
          {/* <br /> <br /> <br />
        Thank you for visiting my website and I hope you find the content here
        interesting and informative. */}
        </h2>
        <h1 className="title-text">Projects</h1>

        {projects.map((project, index) => (
          <div className="project" key={project.title}>
            <h1
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={() => handleLeave(index)}
              className="project-title"
              onClick={() => handleClick(index)}
            >
              {project.title}

              {!project.expand ? (
                <RiArrowDropDownLine className="title-text-arrow" />
              ) : (
                <RiArrowDropUpLine className="title-text-arrow" />
              )}
            </h1>

            <img
              alt="A preview screenshot of the application/program/website"
              className="project-img"
              style={{
                ...cursorPosition,
                display: `${
                  project.show && !project.expand ? "block" : "none"
                }`,
              }}
              src={project.img}
            />
            <SlideDown>
              {project.expand && (
                <div className="project-info">
                  <img
                    alt="A bigger version of the preview screenshot"
                    src={project.img}
                  />
                  {project.info.map((info) => (
                    <div className="project-info-text">
                      <p>{info.time}</p>
                      <p>
                        {info.description}
                        <br /> <br />
                        {info.link && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={info.link}
                            className="project-info-link"
                          >
                            VISIT THE SITE
                          </a>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </SlideDown>
          </div>
        ))}
        <h1 className="title-text-contact">Contact Me</h1>
        {[
          {
            name: "EMAIL",
            info: "singhaniaakshat1@gmail.com",
            link: "mailto:singhaniaakshat1@gmail.com",
          },
          {
            name: "LINKEDIN",
            link: "https://www.linkedin.com/in/akshat-singhania-2702781b4",
          },
          { name: "DEV.TO", link: "https://dev.to/akshatsinghania" },
          {
            name: "DISCORD",
            link: "#",
            info: "Akshat#7161",
          },
        ].map((v) => (
          <div className="contact-item">
            <a
              href={v.link}
              target="_blank"
              className=" hover-underline-animation"
              rel="noopener noreferrer"
            >
              {v.name}
            </a>
            {v.info && <p>{v.info}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
