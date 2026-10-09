/* EDIT THIS FILE to personalise the homepage. No other file needs to change.
   Photos: copy your image into assets/ and change the path below (jpg, png, webp or svg all work). */
window.CONTENT={
  project:{name:"Project Name (to be confirmed)",tagline:"Curiosity Is Where Exploration Begins.",
    intro:"We are exploring how science, technology, and human ingenuity can help us understand the challenges of space and inspire the next generation of explorers.",
    draftNote:"Draft wording: replace with approved project text."},
  team:{groupPhoto:"assets/team-group-placeholder.svg",groupAlt:"Placeholder for the team group photograph",
    about:"[Editable] Add a short paragraph about your team's interests, motivation and contribution to the project.",
    members:[ /* add or remove members freely */
      {name:"Team Member 1",role:"Project Lead",photo:"assets/team-member-1-placeholder.svg",alt:"Placeholder photo of Team Member 1",bio:"[Editable] Short introduction."},
      {name:"Team Member 2",role:"Role to be confirmed",photo:"assets/team-member-2-placeholder.svg",alt:"Placeholder photo of Team Member 2",bio:"[Editable] Short introduction."},
      {name:"Team Member 3",role:"Role to be confirmed",photo:"assets/team-member-3-placeholder.svg",alt:"Placeholder photo of Team Member 3",bio:"[Editable] Short introduction."},
      {name:"Team Member 4",role:"Role to be confirmed",photo:"assets/team-member-4-placeholder.svg",alt:"Placeholder photo of Team Member 4",bio:"[Editable] Short introduction."}]},
  why:{paragraphs:["Space inspires people to ask questions and imagine new possibilities.","Younger generations deserve engaging, accessible ways to explore scientific ideas, and learning works best when it encourages experimentation, critical thinking, creativity and curiosity.","Our project aims to make a complex space-related topic easier to understand through an interactive experience."],
    placeholder:"[Editable] Add your team's own experiences and motivations here. We have not invented a backstory for you."},
  goals:[{title:"Educate",text:"Make space-related knowledge easier to explore and understand."},{title:"Inspire",text:"Encourage younger generations to become curious about space and science."},{title:"Innovate",text:"Use technology and interactive visualisation to communicate complex ideas."},{title:"Connect",text:"Show how different scientific systems and decisions influence one another."},{title:"Explore",text:"Encourage visitors to ask questions, experiment with ideas and discover new information."}],
  goalsNote:"Provisional goals: align with the official project brief. They describe aims, not achieved results.",
  science:{intro:"Selected facts with their sources. Add more by copying an item in the list below: every item needs a unit, meaning, source and status.",
    /* status: "sourced" (checked against the cited source) | "pending" (placeholder). numeric values with status "sourced" and unit starting "kPa" are drawn in the chart. */
    stats:[
      {label:"Spacewalk suit operating pressure (EMU)",value:29.6,unit:"kPa (4.3 psi)",meaning:"Spacewalk suits run at far lower pressure than a station cabin so the suit stays flexible. That difference is why spacewalk preparation includes oxygen prebreathe.",source:"National Research Council, Extravehicular Activity Systems (National Academies Press)",url:"https://www.nap.edu/read/5826/chapter/6",date:"undated in retrieved text",status:"sourced"},
      {label:"International Space Station cabin pressure",value:101.3,unit:"kPa (14.7 psi)",meaning:"Equal to sea-level pressure on Earth, so the crew can breathe an Earth-like air mixture inside.",source:"Norcross et al., NASA's Exploration Atmospheres Working Group, Aerospace Medicine and Human Performance 89(9)",url:"https://asma.kglmeridian.com/downloadpdf/view/journals/amhp/89/9/article-p792.pdf",date:"2018",status:"sourced"},
      {label:"Verified statistic to be added",value:"",unit:"",meaning:"What this number means.",source:"Source to be confirmed",url:"",date:"",status:"pending"},
      {label:"Verified statistic to be added",value:"",unit:"",meaning:"What this number means.",source:"Source to be confirmed",url:"",date:"",status:"pending"}]},
  vision:{quote:"Every great discovery begins with a question. Our goal is to help make those questions easier to ask, explore, and understand.",
    text:"We want to encourage curiosity, not promise outcomes. The interactive platform that follows lets visitors ask 'what if?' by choosing an astronaut, a task and its conditions."},
  progress:{milestones:[{label:"Milestone to be added",status:"planned"},{label:"Milestone to be added",status:"planned"}],updates:[{date:"Date to be added",text:"Project update to be added."}]},
  enter:{title:"Begin Your Exploration",text:"Explore fictional astronaut profiles, simulated health information, spacecraft and spacesuit systems, nutrition, and an illustrative mission planner. Nothing there is live NASA data."}
};
