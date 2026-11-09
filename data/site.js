/* ==========================================================================
   SITE CONTENT: edit this file to change what the site says.
   --------------------------------------------------------------------------
   You never need to touch the HTML to add a project, internship, or photo.
   See README.md for a step-by-step guide. Quick version:

   • Add a photo of yourself to the hero rotation  → add a line to heroPhotos
   • Add a project, internship, or personal project → copy an entry in
     `entries` below, give it a new unique `id`, and set its `section`
   • Hide something without deleting it            → add  hidden: true

   Paths are relative to the site root, e.g. "assets/img/casting/cover.webp".
   Text fields may contain simple HTML like <strong> or <a href="...">.
   ========================================================================== */

window.SITE = {
  profile: {
    name: "Ryan Koh",
    firstName: "Ryan",
    lastName: "Koh",
    tagline: "Mechanical Engineering · Robotics · Design",
    eyebrow: "B.S. Mechanical Engineering · CU Boulder · May 2027",
    location: "Boulder, CO",
    email: "ryankoh.usa@gmail.com",
    phone: "+1 (720) 305-7235",
    linkedin: "https://www.linkedin.com/in/rryankohh/",
    github: "https://github.com/Butterx4",
    resume: "assets/docs/Ryan_Koh_Resume.pdf",
    headshot: "assets/img/about/headshot.webp",

    // Words that rotate in the About heading ("I'm ___"). Include "a"/"an".
    rotatingWords: ["an Engineer", "a Roboticist", "a Designer", "a Builder"],

    about: [
      "I'm Ryan, a Mechanical Engineering student at the University of Colorado Boulder with a minor in Computer Science.",
      "I'm most excited about robotics and solving problems with automation. Right now I test autonomous baggage robots at Denver International Airport, and I race with CU Boulder Formula SAE. This site collects my engineering projects, internships, and research. Feel free to reach out!"
    ],

    // Little "status" callout under the About text
    now: {
      label: "Now",
      title: "Robotics Field Operator at Pattern Labs",
      body: "Graduating May 2027 and looking for full-time mechanical engineering and robotics roles in Boulder, Seattle, Boston, or California."
    },

    // Quick facts shown as a strip in the About section
    facts: [
      { value: "3.68", label: "GPA" },
      { value: "CSWA", label: "SolidWorks certified" },
      { value: "May 2027", label: "Graduation" }
    ],

    contactHeading: "Let's build something {word} together",
    contactWords: ["reliable", "autonomous", "useful"],
    contactBlurb: "Ask me about these projects, what I'm working on now, or just say hello."
  },

  // Photos that flip through in the hero. Best: portrait or square photos of you.
  // `position` is optional (CSS object-position, e.g. "top" or "50% 30%").
  heroPhotos: [
    { src: "assets/img/about/headshot.webp", alt: "Ryan Koh", position: "50% 25%" },
    { src: "assets/img/2fast2fail/photo-side.webp", alt: "The 2Fast2Fail drill-powered vehicle" },
    { src: "assets/img/casting/cover.webp", alt: "Cast aluminum puzzle pieces" },
    { src: "assets/img/2fast2fail/photo-3quarter.webp", alt: "2Fast2Fail three-quarter view" }
  ],

  // Section order and titles on the home page. Remove a line to hide a section.
  // `nav` is the short name in the top menu. Empty sections hide themselves.
  sections: [
    { id: "projects",   nav: "Projects",   title: "Engineering Projects",   label: "01 / Engineering" },
    { id: "experience", nav: "Experience", title: "Experience",             label: "02 / Internships & Teams" },
    { id: "personal",   nav: "Personal",   title: "Personal & Extracurricular", label: "03 / Beyond Class" },
    { id: "research",   nav: "Research",   title: "Research & Technical Papers", label: "04 / Research" }
  ],

  skills: [
    { group: "CAD", items: ["SolidWorks (CSWA)", "Onshape", "Fusion 360", "Design drawings", "3D printing"] },
    { group: "Fabrication", items: ["Lathe & mill", "Saws & drills", "Soldering", "Laser cutting", "Composite testing"] },
    { group: "Electronics", items: ["Circuits", "Arduino", "LiDAR & sensor arrays"] },
    { group: "Software", items: ["C++", "Python", "Java", "C#", "MATLAB", "Git", "SimVascular", "3D Slicer"] }
  ],

  /* ------------------------------------------------------------------------
     ENTRIES: every card on the home page, and its detail page.
     ------------------------------------------------------------------------
     Required:  id, section, title, date, summary
     Optional:  subtitle, cover, coverPosition, tags[], awards[], featured,
                role, company, link (opens a file/URL instead of a page),
                hidden, blocks[] (the detail page content)

     section: "projects" | "experience" | "personal" | "research"

     Detail-page block types (use any, in any order):
       { type: "stats",   items: [{ value, label }] }
       { type: "text",    heading, body: "paragraph" or ["p1", "p2"] }
       { type: "list",    heading, items: ["...", "..."] }
       { type: "image",   src, caption, wide: true }
       { type: "split",   src, caption, heading, body }   // image beside text
       { type: "gallery", heading, images: [{ src, caption }] }
       { type: "table",   heading, columns: [...], rows: [[...], ...] }
       { type: "video",   src (mp4) or youtube: "VIDEO_ID", caption }
       { type: "docs",    heading, groups: [{ title, files: [{ label, href }] }] }
     ------------------------------------------------------------------------ */
  entries: [
    /* ======================= ENGINEERING PROJECTS ======================= */
    {
      id: "2fast2fail",
      section: "projects",
      featured: true,
      title: "2Fast2Fail: Drill-Powered Endurance Vehicle",
      subtitle: "MCEN 3025 Component Design · CU Boulder",
      date: "Spring 2026",
      role: "CAD Engineer · Team of 6",
      cover: "assets/img/2fast2fail/photo-side.webp",
      summary: "A three-wheeled vehicle powered only by a cordless drill, raced in a 30-minute endurance event. I modeled the frame and drivetrain in SolidWorks and drew the parts our team machined.",
      tags: ["SolidWorks", "FEA", "Drivetrain", "Drawings", "Machining"],
      blocks: [
        { type: "stats", items: [
          { value: "4.5 : 1", label: "Chain drive ratio" },
          { value: "271 lb·in", label: "Torque at rear axle" },
          { value: "46 lb", label: "Finished vehicle weight" },
          { value: "6.9", label: "Laps in 30 minutes" }
        ]},
        { type: "split", src: "assets/img/2fast2fail/cover.webp", caption: "Final vehicle assembly (CAD)",
          heading: "Overview",
          body: "For MCEN 3025 (Component Design), our six-person team designed and built a three-wheeled vehicle powered only by a single cordless drill, then raced it in a 30-minute endurance event. As one of two CAD Engineers, I modeled the frame and drivetrain in SolidWorks and produced the engineering drawings our manufacturing engineers built from." },
        { type: "list", heading: "Key takeaways", items: [
          "Power transmission design: 4.5:1 chain drive sized for torque (about 271 lb·in at the axle)",
          "SolidWorks assemblies, FEA, and engineering drawings for manufacture",
          "Designing for reliability over top speed",
          "Iterating a mechanism after testing (cable actuation to brake caliper)",
          "Team coordination across CAD, manufacturing, and testing roles"
        ]},
        { type: "text", heading: "Design approach",
          body: "Endurance rewards drivetrain efficiency and reliable power delivery more than top speed, so we built everything around torque and durability. We chose a tricycle layout: one steered and braked front wheel reused from a donated bicycle, and two 26-inch rear wheels, one driven through the chain. The frame used two bent tubes plus three mitered tubes, analyzed for rider weight and drivetrain loads." },
        { type: "split", src: "assets/img/2fast2fail/cad-drivetrain.webp", caption: "Drill plate mount detail (CAD)",
          heading: "Drivetrain",
          body: [
            "A 45-tooth driven sprocket and 10-tooth drive sprocket gave a 4.5:1 ratio, keeping the drill in its efficient RPM range while delivering about 271 lb·in at the rear axle and about 430 RPM at the rear sprocket.",
            "We first actuated the drill trigger with a hinge-and-cable mechanism off the handlebars. Testing showed inconsistent cable tension, so we redesigned it around a bicycle brake caliper, which was far more repeatable and easier to mount."
          ]},
        { type: "split", src: "assets/img/2fast2fail/photo-qc.webp", caption: "Machined front wheel rod tube on my drawing (P06, Steel 304)",
          heading: "Manufacturing",
          body: "The drill sits on a machined drill plate subassembly (pillow blocks, a machined shaft, and McMaster hardware) that carries torque into the chain drive. I drew the frame part drawings our manufacturing engineers machined from, like the front wheel rod tube shown here. The finished vehicle weighed about 46 lb." },
        { type: "text", heading: "Results and lessons learned",
          body: [
            "We completed 6.9 laps, just under the field average. Our horizontal dropout tabs drifted out of alignment under use, giving the rear wheel inward camber that added friction and drained the battery faster. The same cable-tension issues limited braking, which we flagged as the first safety fix for a future version.",
            "The vehicle still met every core requirement and finished the race as a working, rideable machine built from one power tool."
          ]},
        { type: "gallery", heading: "Drawings & images", images: [
          { src: "assets/img/2fast2fail/photo-3quarter.webp", caption: "Three-quarter view of the build" },
          { src: "assets/img/2fast2fail/drawing-frame.webp", caption: "Frame engineering drawing" },
          { src: "assets/img/2fast2fail/drawing-drillplate.webp", caption: "Drill plate subassembly drawing" },
          { src: "assets/img/2fast2fail/exploded-view.webp", caption: "Exploded assembly view" },
          { src: "assets/img/2fast2fail/exploded-bom-drawing.webp", caption: "Exploded view with bill of materials" }
        ]},
        { type: "docs", heading: "Reports & drawings", groups: [
          { title: "Reports", files: [
            { label: "Final Design Report", href: "assets/docs/2fast2fail/Final-Design-Report.pdf" },
            { label: "Design Review Presentation", href: "assets/docs/2fast2fail/Design-Review-Presentation.pdf" }
          ]},
          { title: "Frame drawings", files: [
            { label: "Frame assembly", href: "assets/docs/2fast2fail/frame-drawings/FrameDrawing.pdf" },
            { label: "Part P01", href: "assets/docs/2fast2fail/frame-drawings/FrameP01.pdf" },
            { label: "Part P02", href: "assets/docs/2fast2fail/frame-drawings/FrameP02.pdf" },
            { label: "Part P03", href: "assets/docs/2fast2fail/frame-drawings/FrameP03.pdf" },
            { label: "Part P04", href: "assets/docs/2fast2fail/frame-drawings/FrameP04.pdf" },
            { label: "Part P05", href: "assets/docs/2fast2fail/frame-drawings/FrameP05.pdf" },
            { label: "Part P06", href: "assets/docs/2fast2fail/frame-drawings/FrameP06.pdf" },
            { label: "Part P07", href: "assets/docs/2fast2fail/frame-drawings/FrameP07.pdf" }
          ]},
          { title: "Drill plate drawings", files: [
            { label: "Drill plate subassembly", href: "assets/docs/2fast2fail/drill-plate-drawings/drill-plate-subassembly.pdf" },
            { label: "Drill plate", href: "assets/docs/2fast2fail/drill-plate-drawings/drill-plate.pdf" },
            { label: "Pillow block", href: "assets/docs/2fast2fail/drill-plate-drawings/pillow-block.pdf" },
            { label: "Pillow block shaft", href: "assets/docs/2fast2fail/drill-plate-drawings/pillow-block-shaft.pdf" }
          ]},
          { title: "CAD", files: [
            { label: "Frame analysis part (.SLDPRT)", href: "assets/docs/2fast2fail/FrameAnalysis.SLDPRT" }
          ]}
        ]}
      ]
    },

    {
      id: "casting",
      section: "projects",
      featured: true,
      title: "Casting Puzzle Pieces: Aluminum Sand Casting",
      subtitle: "MCEN 4026 Lab · CU Boulder",
      date: "Fall 2026",
      role: "Team of 3",
      cover: "assets/img/casting/cover.webp",
      summary: "Designed and sand-cast interlocking aluminum puzzle pieces: sculpted, modeled in CAD, 3D printed patterns, designed the gating system, poured, measured against CAD, and machined to fit.",
      tags: ["Sand casting", "Gating design", "Metrology", "3D printing"],
      blocks: [
        { type: "stats", items: [
          { value: "3", label: "Unique parts, one pour" },
          { value: "4", label: "Dimensions checked on MMS" },
          { value: "±0.05 mm", label: "Best match to CAD (prong width)" },
          { value: "3", label: "Pattern surface finishes tested" }
        ]},
        { type: "text", heading: "Overview",
          body: "Our three-person team designed and sand-cast a set of interlocking aluminum puzzle pieces. We sculpted the shape, modeled it in CAD, 3D printed the patterns, and designed a gating system so three unique parts would fill at the same rate. Then we poured the aluminum, measured the parts against CAD, and machined them until they fit together." },
        { type: "list", heading: "Key takeaways", items: [
          "Gating system design: a central sprue, runners, and risers laid out for even filling",
          "Sand mold packing and pattern removal, and how a damaged mold shows up in the part",
          "Measuring cast parts against CAD on a measuring microscope (MMS)",
          "Diagnosing casting defects: short pour, shrinkage sink, and metal penetration",
          "Post-processing on the bandsaw and sander to bring parts into a working fit"
        ]},
        { type: "split", src: "assets/img/casting/gating-diagram.webp", caption: "Gating system: sprue (S), runners, and risers (R)",
          heading: "Design",
          body: "To keep three unique parts filling at the same rate, we put the sprue at the center with a curved runner out to each part, shaped to disturb the puzzle-piece geometry as little as possible. A riser sat one finger-width past each piece. The risers confirm that a cavity filled and feed metal back in as the part shrinks while cooling." },
        { type: "split", src: "assets/img/casting/as-poured.webp", caption: "The casting as poured. The third part never formed.",
          heading: "Casting",
          body: "Pulling the printed patterns out with screws caved in the sand around the puzzle tabs, twice. The mold was still usable, so we cut the runners, risers, and sprue and poured. Only one riser filled. The thin parts were predicted to solidify in under a second, and our pour wasn't fast enough to reach the third cavity before its runner froze, so we came away with two of the three parts." },
        { type: "table", heading: "Measurement vs. CAD", columns: ["Dimension", "Measured (mm)", "CAD (mm)"], rows: [
          ["Overall length", "50.988", "52.0"],
          ["2-prong length", "29.631", "30.0"],
          ["Prong width", "9.439", "9.53"],
          ["Part height", "6.903", "6.35"]
        ]},
        { type: "text", heading: "Defects",
          body: "The worst defects were a short-pour cavity 4.37 mm deep and a shrinkage sink about 4.2 mm across. Both are well outside typical sand-casting tolerance (±0.76 to ±1.5 mm at this scale). We traced most of the error to the damaged mold. Metal also penetrated the sand in places, which widened some features. After a few hours on the bandsaw and sander, the parts fit together." },
        { type: "split", src: "assets/img/casting/improved-gating.webp", caption: "Proposed improved gating system",
          heading: "Lessons learned",
          body: "Next time we would support the sand around the tabs with toothpicks, add draft to the puzzle-piece holes, and insulate the thin edges and runners so the metal stays liquid longer. We would also feed each part with two runners, with the parts arranged in a triangle around the sprue. We tried patterns in three surface finishes (plain, sanded, and epoxy-smoothed), and none made a visible difference in the cast surface." },
        { type: "gallery", heading: "Process & measurement images", images: [
          { src: "assets/img/casting/playdough.webp", caption: "The original hand-sculpted shape" },
          { src: "assets/img/casting/patterns.webp", caption: "3D-printed patterns" },
          { src: "assets/img/casting/surface-finishes.webp", caption: "Patterns in three surface finishes" },
          { src: "assets/img/casting/sand-mold.webp", caption: "Gating system in the sand after the pour" },
          { src: "assets/img/casting/mold-after-pour.webp", caption: "Mold after pouring" },
          { src: "assets/img/casting/pre-processing.webp", caption: "A part before post-processing" },
          { src: "assets/img/casting/short-pour-defect.webp", caption: "Short-pour cavity under the MMS" },
          { src: "assets/img/casting/sink-defect.webp", caption: "Sink defect in the side wall (MMS)" },
          { src: "assets/img/casting/mms-dims.webp", caption: "MMS key dimensions" },
          { src: "assets/img/casting/cad-dims.webp", caption: "CAD key dimensions" }
        ]},
        { type: "docs", heading: "Lab report", groups: [
          { title: "Report", files: [{ label: "Casting lab report", href: "assets/docs/casting/casting-lab-report.pdf" }] }
        ]}
      ]
    },

    {
      id: "qav250",
      section: "projects",
      title: "QAV250 FPV Drone: Reverse-Engineered CAD",
      subtitle: "MCEN 1025 · CU Boulder",
      date: "Spring 2025",
      role: "Individual project",
      cover: "assets/img/qav250/cover.webp",
      summary: "Reverse-engineered a QAV250 racing drone in SolidWorks: lofted propeller blades, three mating carbon-fiber plates, OEM electronics, and fully dimensioned drawings.",
      tags: ["SolidWorks", "Reverse engineering", "Lofts & splines", "Drawings"],
      blocks: [
        { type: "split", src: "assets/img/qav250/exploded.webp", caption: "Exploded assembly view",
          heading: "Overview",
          body: "I reverse-engineered a QAV250 FPV racing drone entirely in SolidWorks. I chose it because it was hard to model: curved, lofted propeller blades, several OEM electronics (flight controller, ESC, motors, FPV camera), and three carbon-fiber base plates that all had to mate precisely." },
        { type: "list", heading: "Key takeaways", items: [
          "Reverse engineering a real product from measurements and reference images",
          "Lofts and splines for curved propeller geometry",
          "Fully defined sketches so late fixes propagate through the model",
          "Dimensioned drawings with detail views and no double-dimensioning",
          "Integrating imported OEM part files into a custom assembly"
        ]},
        { type: "text", heading: "Critical components",
          body: [
            "The three carbon-fiber base plates (big, medium, small) were the most critical and time-consuming parts. Their hole patterns had to match the real drone closely enough that the imported motors, flight controller, and ESC would actually fit.",
            "The propeller was the hardest single part, since its blade curvature needed the loft and spline tools rather than simple extrudes."
          ]},
        { type: "split", src: "assets/img/qav250/drawing.webp", caption: "Dimensioned drawing of the big base plate",
          heading: "Drawings",
          body: "The big base plate was the hardest drawing. Fully defining every hole and slot took overlapping dimensions and detail views while avoiding double-dimensioning." },
        { type: "text", heading: "Lessons learned",
          body: [
            "Keeping every sketch fully defined meant that when I caught dimensioning mistakes late, which happened often on the big plate, I could fix them once and have the change carry through the rest of the model.",
            "I imported OEM files for the electronics rather than modeling each one, since each would have been a multi-week project on its own. The plates and propellers I modeled myself are the most faithful to the real product."
          ]},
        { type: "gallery", heading: "Renders", images: [
          { src: "assets/img/qav250/propeller.webp", caption: "Alternate render" },
          { src: "assets/img/qav250/reference-photo.webp", caption: "The real QAV250, for comparison" }
        ]}
      ]
    },

    /* =========================== EXPERIENCE ============================= */
    {
      id: "pattern-labs",
      section: "experience",
      current: true,
      company: "Pattern Labs",
      title: "Robotics Field Operator / Test Engineer",
      date: "Jun 2026 – Present",
      location: "Erie, CO · Denver International Airport",
      summary: "Operating and testing an autonomous baggage transport robot for commercial flights at DIA, alongside United Airlines.",
      tags: ["Autonomy", "LiDAR", "Field testing", "Data analysis"],
      blocks: [
        { type: "text", heading: "Overview",
          body: "I operate and chaperone an autonomous baggage transport robot moving bags for commercial flights at Denver International Airport. The work is part of Pattern Labs' $5 million partnership with United Airlines." },
        { type: "list", heading: "What I do", items: [
          "Communicate design flaws and changes to the software team to improve and optimize robot performance",
          "Test new software releases while tracking, organizing, and analyzing operational data",
          "Troubleshoot robot hardware and software by diagnosing, retrofitting, and replacing components in a complex LiDAR, camera, and sensor array, while keeping accurate documentation and version control",
          "Work with technicians and the electrical and software teams to create test plans, safety compliance protocols, and performance benchmarks"
        ]}
      ]
    },
    {
      id: "jebsen-jessen",
      section: "experience",
      company: "Jebsen & Jessen",
      title: "Engineer & Research Intern",
      date: "May – Jul 2025",
      location: "Singapore · Technology & Industrial Services",
      summary: "Built and tested a drone-based aircraft engine inspection system using photogrammetry, working with clients like SAESL and Pratt & Whitney.",
      tags: ["Drones", "Photogrammetry", "NDT", "Documentation"],
      blocks: [
        { type: "text", heading: "Overview",
          body: "At Jebsen & Jessen's Technology and Industrial Services division in Singapore, I helped develop a new hardware and systems project for non-destructive testing (NDT): an automated aircraft engine inspection system using a drone and photogrammetry software." },
        { type: "list", heading: "What I did", items: [
          "Researched technical documentation for robotics and drone systems with computer vision to scope the new inspection system",
          "Developed and tested the automated engine inspection system using a drone and photogrammetry software",
          "Learned NDT methods such as thermography and ultrasonic testing on aircraft fuselages and engines",
          "Met with clients including SAESL (Singapore Aero Engine Services) and Pratt & Whitney to discuss inspection parameters and system requirements",
          "Coordinated enterprise-grade hardware and software purchases with suppliers within the project budget",
          "Wrote technical documentation and budget reports for the system"
        ]}
      ]
    },
    {
      id: "formula-sae",
      section: "experience",
      current: true,
      company: "CU Boulder Formula SAE",
      title: "Racing Team Member · Aerodynamics",
      date: "Aug 2025 – Present",
      location: "Boulder, CO",
      summary: "Composite testing on a universal testing machine and CFD-driven design of aerodynamic components for a formula-style race car.",
      tags: ["CFD", "Composites", "Aero design", "Testing"],
      blocks: [
        { type: "text", heading: "Overview",
          body: "CU Boulder's Formula SAE team designs, manufactures, and tests a formula-style car to race against more than a hundred university teams at the annual Formula SAE competition." },
        { type: "list", heading: "What I do", items: [
          "Run composite material tests on a universal testing machine to gather stress-strain data",
          "Use computational fluid dynamics to analyze downforce from aerodynamic components",
          "Design and optimize aero components from test data to meet targets for weight, drag, downforce, acceleration, and steering"
        ]}
      ]
    },

    /* ==================== PERSONAL & EXTRACURRICULAR ==================== */
    {
      id: "mate-rov",
      section: "personal",
      title: "MATE ROV Competition",
      subtitle: "Singapore American School Robotics",
      date: "2023",
      role: "Mechanical Team Lead",
      cover: "assets/img/mate-rov/cover.webp",
      summary: "Co-led an underwater robotics team as Mechanical Team Lead: eight-thruster T-slot frame, claw, and electronics mount. Placed 8th of 29 at regionals.",
      awards: ["8th of 29 teams · MATE ROV Regionals"],
      tags: ["Leadership", "CAD", "Fabrication", "Arduino"],
      blocks: [
        { type: "split", src: "assets/img/mate-rov/cover.webp", caption: "Final ROV assembly (CAD)",
          heading: "Overview",
          body: "The MATE ROV Competition is an international underwater robotics competition where teams design and build a remotely operated vehicle for simulated underwater tasks, then present it to judges through a technical paper and poster. As a robotics team officer, I co-led our team as Mechanical Team Lead, with a view across the whole vehicle and a personal focus on CAD, fabrication, and assembly." },
        { type: "list", heading: "Key takeaways", items: [
          "Leading and dividing a team into module sub-teams",
          "Frame CAD in aluminum T-slot with 3D-printed connectors",
          "Designing four range-of-motion arms and the electronics mount",
          "Making cost vs. reliability trade-offs from test results",
          "Training 15+ students in CAD, fabrication, soldering, and Arduino"
        ]},
        { type: "text", heading: "Design approach",
          body: [
            "We chose an eight-thruster frame for maneuverability through redundancy, built from aluminum T-slot extrusion with 3D-printed connectors and thruster guards, a laser-cut and 3D-printed claw, and a Blue Robotics waterproof enclosure.",
            "Our in-house 3-axis arm wasn't competition-ready, so we simplified to a lighter claw. Cheaper enclosures leaked under pressure in testing, so we kept the more reliable Blue Robotics one."
          ]},
        { type: "text", heading: "Results",
          body: "We placed 8th of 29 teams at the regional competition with a fully functional ROV that met nearly all criteria." }
      ]
    },

    /* ============================= RESEARCH ============================= */
    {
      id: "fontan-pavm",
      section: "research",
      title: "Supporting Strategies to Address Pulmonary Arteriovenous Malformations in Fontan Patients",
      date: "Research abstract · CU Boulder",
      summary: "With Markkus Tong and Tom Yeh: a framework to help clinicians compare interventions for uneven hepatic flow, using segmented MRI data (3D Slicer) from five Fontan patients.",
      link: "assets/docs/papers/fontan-pavm-abstract.pdf"
    },
    {
      id: "cfd-junction",
      section: "research",
      title: "CFD Junction Analysis: Bernoulli Estimate at a Flow Stagnation Point",
      date: "Fluid dynamics · CFD",
      summary: "A Bernoulli estimate of stagnation pressure at a pipe junction, compared against CFD results.",
      link: "assets/docs/papers/cfd-bernoulli-junction-analysis.pdf"
    },
    {
      id: "markov-seir",
      section: "research",
      title: "Markov Chain Modeling of Small-Population Disease Spread",
      date: "APPM · Mar 2025",
      summary: "With Jiawei Zheng and Josh Smith: a Markov chain SEIR model of small-population epidemics, including how vaccination changes the spread.",
      link: "assets/docs/papers/markov-chain-seir-disease-model.pdf"
    },
    {
      id: "tribble-ode",
      section: "research",
      title: "Nonlinear ODE Modeling of Harvested Population Dynamics",
      date: "APPM 2360 · Spring 2025",
      summary: "With Bryce Kim and Dante Fan: logistic nonlinear ODEs with harvesting, equilibria, and direction fields in MATLAB.",
      link: "assets/docs/papers/tribble-population-ode-model.pdf"
    }
  ]
};
