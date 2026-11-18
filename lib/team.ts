/**
 * Leadership and advisors. The About page shows the cards; /team/<slug> shows each full profile.
 * Every statement here is drawn from material the person approved or from public sources; do not
 * add claims without checking them.
 */
export type Member = {
  slug: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  /** omitted when the person has not asked for a profile link */
  linkedIn?: string;
  /** short summary shown on the About card */
  bio: string;
  sections: { heading: string; body: string[] }[];
  facts: { label: string; value: string[] }[];
};

export const team: Member[] = [
  {
    slug: 'sadiq-ali-mir',
    name: 'Sadiq Ali Mir',
    role: 'Founder and Chief Executive Officer',
    image: '/team/sadiq-ali-mir.webp',
    imageAlt: 'Sadiq Ali Mir, Founder and Chief Executive Officer of Zephyra Dynamics',
    linkedIn: 'https://www.linkedin.com/in/sadiqalimir/',
    bio: 'Sadiq founded Zephyra Dynamics and leads it as CEO. An aerospace engineering graduate of RV College of Engineering, he co-founded Team AeroAstro and was named to the National Space Society’s inaugural 30 Under 30 class.',
    sections: [
      {
        heading: 'Building Zephyra Dynamics',
        body: [
          'Sadiq founded Zephyra Dynamics and leads it as Chief Executive Officer. The company grew out of a student research initiative at RV College of Engineering in Bengaluru, where he studied aerospace engineering, and today brings together a team of more than 45 engineers.',
          'As CEO he sets the direction for the whole system the company is building: the Kestrel X2 aircraft, the LAMINAR airspace platform and the FlightLab virtual twin.',
        ],
      },
      {
        heading: 'Team AeroAstro',
        body: [
          'Before Zephyra, Sadiq co-founded and led Team AeroAstro, a student team that developed eVTOL and space-debris concepts. The team presented its eVTOL work to members of the Vertical Flight Society and to Boeing, and was mentored by NASA engineers.',
        ],
      },
      {
        heading: 'Space missions and recognition',
        body: [
          'Sadiq was Lead Systems Engineer on a lunar rover team in the Milo Mission Academy, which admitted him by exception as its only participant from India.',
          'He was named to the National Space Society’s inaugural 30 Under 30 class.',
        ],
      },
    ],
    facts: [
      { label: 'Role', value: ['Founder and Chief Executive Officer'] },
      { label: 'Education', value: ['Aerospace engineering, RV College of Engineering'] },
      { label: 'Recognition', value: ['National Space Society, inaugural 30 Under 30'] },
    ],
  },
  {
    slug: 'george-a-salazar',
    name: 'George A. Salazar',
    role: 'Regulatory and Certification Advisor',
    image: '/team/george-salazar-800.webp',
    imageAlt: 'George A. Salazar, Regulatory and Certification Advisor at Zephyra Dynamics',
    bio: 'A retired NASA engineer with over 40 years of experience, from the Space Shuttle to Artemis, George Salazar specialises in flight-system development, certification and human systems integration, and advises Zephyra Dynamics on regulation and certification.',
    sections: [
      {
        heading: 'Four decades at NASA',
        body: [
          'George joined NASA in 1983 and retired in January 2024. His work spanned the Space Shuttle cockpit avionics upgrade, X-38 crew return vehicle avionics, International Space Station communications, displays and controls for the Commercial Crew Program, and crew interfaces for Artemis.',
          'Across that career he specialised in the development and certification of flight systems, and in human systems integration: making sure the people on board and the systems they rely on work well together.',
        ],
      },
      {
        heading: 'Qualifications',
        body: [
          'George is a registered Professional Engineer in Texas and an INCOSE Expert Systems Engineering Professional. He received the NASA Silver Achievement Medal.',
          'He holds a B.S. in Electrical Engineering from the University of Houston and an M.S. in Systems Engineering from Southern Methodist University.',
        ],
      },
      {
        heading: 'At Zephyra Dynamics',
        body: ['George advises Zephyra Dynamics on the regulatory and certification pathway for Kestrel X2.'],
      },
    ],
    facts: [
      { label: 'Role', value: ['Regulatory and Certification Advisor'] },
      { label: 'Experience', value: ['NASA, 1983 to 2024'] },
      { label: 'Education', value: ['B.S. Electrical Engineering, University of Houston', 'M.S. Systems Engineering, Southern Methodist University'] },
      { label: 'Credentials', value: ['Professional Engineer, Texas', 'INCOSE Expert Systems Engineering Professional', 'NASA Silver Achievement Medal'] },
    ],
  },
  {
    slug: 'promio-charles',
    name: 'Dr. Promio Charles F',
    role: 'Mentor and Senior Aerospace Advisor',
    image: '/promio.png',
    imageAlt: 'Dr. Promio Charles F, Mentor and Senior Aerospace Advisor at Zephyra Dynamics',
    linkedIn: 'https://www.linkedin.com/in/dr-promio-charles-194a6b32/',
    bio: 'An Associate Professor of Aerospace Engineering at RV College of Engineering, Dr Promio Charles specialises in aeroelasticity, smart structures and aeroservoelasticity, and advises Zephyra Dynamics on aerospace engineering.',
    sections: [
      {
        heading: 'Research and teaching',
        body: [
          'Dr Promio Charles is an Associate Professor of Aerospace Engineering at RV College of Engineering, where he has been on the faculty since 2017. His work focuses on aeroelasticity, smart structures and aeroservoelasticity: how flexible aircraft structures interact with the air around them and with the systems that control them.',
          'He brings about 15 years of experience across research, industry and teaching.',
        ],
      },
      {
        heading: 'Education',
        body: [
          'He earned his PhD in Aerospace Engineering from the Academy of Scientific and Innovative Research (AcSIR) at the CSIR National Aerospace Laboratories campus, after an M.Tech in Aeronautical Engineering from Visvesvaraya Technological University.',
        ],
      },
      {
        heading: 'At Zephyra Dynamics',
        body: ['As mentor and senior aerospace advisor, he advises Zephyra Dynamics on aerospace engineering.'],
      },
    ],
    facts: [
      { label: 'Role', value: ['Mentor and Senior Aerospace Advisor'] },
      { label: 'Position', value: ['Associate Professor of Aerospace Engineering, RV College of Engineering'] },
      { label: 'Education', value: ['PhD Aerospace Engineering, AcSIR at CSIR National Aerospace Laboratories', 'M.Tech Aeronautical Engineering, Visvesvaraya Technological University'] },
      { label: 'Focus', value: ['Aeroelasticity', 'Smart structures', 'Aeroservoelasticity'] },
    ],
  },
  {
    slug: 'ravindra-s-kulkarni',
    name: 'Dr. Ravindra S Kulkarni',
    role: 'Mentor and Technical Advisor',
    image: '/ravindra.png',
    imageAlt: 'Dr. Ravindra S Kulkarni, Mentor and Technical Advisor at Zephyra Dynamics',
    linkedIn: 'https://www.linkedin.com/in/dr-ravindra-s-kulkarni-90181ab0/',
    bio: 'A founding member and former Head of Aerospace Engineering at RV College of Engineering, Dr Kulkarni has taught there since 1991 and specialises in computational fluid dynamics, aerodynamics and gas dynamics.',
    sections: [
      {
        heading: 'Building an aerospace programme',
        body: [
          'Dr Ravindra S Kulkarni is a founding member and former Head of the Department of Aerospace Engineering at RV College of Engineering, where he has taught since 1991. Across more than three decades of teaching and research, he has guided doctoral scholars and helped build RVCE’s aerospace programme.',
          'His expertise is in computational fluid dynamics, aerodynamics and gas dynamics.',
        ],
      },
      {
        heading: 'Education',
        body: ['An alumnus of the Aerospace Engineering Department at the Indian Institute of Science, he holds a PhD, an M.S. and a B.E.'],
      },
      {
        heading: 'At Zephyra Dynamics',
        body: ['As mentor and technical advisor, he advises Zephyra Dynamics on aerodynamics and computational fluid dynamics.'],
      },
    ],
    facts: [
      { label: 'Role', value: ['Mentor and Technical Advisor'] },
      { label: 'Position', value: ['Founding member and former Head, Aerospace Engineering, RV College of Engineering'] },
      { label: 'Education', value: ['Alumnus, Aerospace Engineering, Indian Institute of Science', 'PhD, M.S. and B.E.'] },
      { label: 'Focus', value: ['Computational fluid dynamics', 'Aerodynamics', 'Gas dynamics'] },
    ],
  },
];

export function getMember(slug: string): Member | undefined {
  return team.find((m) => m.slug === slug);
}
