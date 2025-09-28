import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import './color.css'
import './portrait.css'
import './landscape.css'

function Header({ displayed }) {


  return (
    <header>
      <h1>My resume</h1>
      <h2>CAPPAERT Ilann</h2>
      <button className='lg-btn gl' id='menu-button' onClick={() => displayed()} >
        <span class="material-symbols-outlined">
          menu
        </span>
      </button>
    </header>
  )
}

function Menu({ current }) {
  return (
    <>
      <nav id='menu-nav'>
        <ul className='container lg-btn'>
          <a href="#" onClick={() => current("presentation")}><li className='lg-btn gl'><h2>&lt;/Introduction&gt;</h2></li></a>
          <a href="#" onClick={() => current("skills")}><li className='lg-btn gl'><h2>&lt;/Skills&gt;</h2></li></a>
          <a href="#" onClick={() => current("experiences")}><li className='lg-btn gl'><h2>&lt;/Experiences&gt;</h2></li></a>
          <a href="#" onClick={() => current("project")}><li className='lg-btn gl'><h2>&lt;/Project&gt;</h2></li></a>
        </ul>
      </nav>
    </>
  )
}

function Presentation({ current }) {
  if (current == "presentation") {
    return (
      <>
        <div className='slide container lg-btn' id='intro'>
          <div className="introduction">
            <h3>&lt;/Introduction&gt;</h3>
            <p>
              <span>Hello and welcome to my online resume! <br /><br /><br /></span>
              My name is Ilann, and I'm a front-end developer looking to diversify.
              I have a Higher National Diploma in IT Services for Organizations with a focus on development, and I'm currently pursuing a Master's degree in AI at Epitech. <br /><br /><br />
              <span>I hope you enjoy browsing my resume!</span></p>
          </div>
        </div>
      </>
    )
  }
}

function Skills({ current, skills }) {
  if (current == "skills") {
    return (
      <>
        <div className='slide container lg-btn' id='skills'>
          <h2>&lt;/Skills&gt;</h2>
          <div>
          {skills.map((skill, index) => {
            return (
              <>
              <a className='card lg-btn' href={skill.doc}>
                  <img src={skill.image} alt="" />
                  <h3>{skill.titre}</h3>
                </a>
              </>
            )
          })}
        </div>
        </div>
      </>
    )
  }
}

function Experiences({current, exp}) {
  if (current == "experiences") {
    return (
      <>
        <div className='slide container lg-btn' id='exp'>
          <h2>&lt;/Experiences&gt;</h2>
          <div>
          {exp.map((exp, index) => {
            return (
              <>
              <a className='card lg-btn'>
                  <img src={exp.image} alt="" />
                  <h3>{exp.titre}</h3>
                  <h4>{exp.date}</h4>
                </a>
              </>
            )
          })}
        </div>
        </div>
      </>
    )
  }
}

function Project({current, projet}) {
  if (current == "project") {
    return (
      <>
        <div className='slide container lg-btn' id='project'>
          <h2>&lt;/Project&gt;</h2>
          <div>
          {projet.map((project, index) => {
            return (
              <>
              <a className='card lg-btn' href={project.lienProjet}>
                  <img src={project.image} alt="" />
                  <h3>{project.titre}</h3>
                  <h4>{project.date}</h4>
                </a>
              </>
            )
          })}
        </div>
        </div>
      </>
    )
  }
}



function App() {
  const [currentDiv, setCurrentDiv] = useState("presentation");

  const [skills, setSkills] = useState([]);
  const [exp, setExp] = useState([]);
  const [projet, setProjet] = useState([]);

  const getSkills = function () {
    fetch("/skills.json")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
      });
  };

    const getExp = function () {
    fetch("/experiences.json")
      .then((res) => res.json())
      .then((data) => {
        setExp(data);
      });
  };

      const getProject = function () {
    fetch("/projet.json")
      .then((res) => res.json())
      .then((data) => {
        setProjet(data);
      });
  };

  useEffect(() => {
    getSkills();
    getExp();
    getProject();
  }, []);

  function menuDisplayed() {
    let button = document.getElementById("menu-button");
    button.classList.toggle("displayed");

    let menu = document.getElementById("menu-nav")
    menu.classList.toggle("displayed");

    if (document.getElementById("intro")) {
      let main = document.getElementById("intro")
      main.classList.toggle("displayed")
    }
    if (document.getElementById("skills")) {
      let skills = document.getElementById("skills")
      skills.classList.toggle("displayed")
    }
        if (document.getElementById("exp")) {
      let exp = document.getElementById("exp")
      exp.classList.toggle("displayed")
    }
            if (document.getElementById("project")) {
      let project = document.getElementById("project")
      project.classList.toggle("displayed")
    }
  }

  function changeSlide(slide) {
    setCurrentDiv(slide)
    menuDisplayed()
  }




  return (
    <>
      <Header displayed={() => menuDisplayed()}></Header>
      <main>
        <Menu current={(e) => changeSlide(e)}></Menu>
        <Presentation current={currentDiv}></Presentation>
        <Skills current={currentDiv} skills={skills}>/</Skills>
        <Experiences current={currentDiv} exp={exp}></Experiences>
        <Project current={currentDiv} projet={projet}></Project>
      </main>
    </>
  )
}

export default App
