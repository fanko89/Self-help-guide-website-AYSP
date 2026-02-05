(function(){
  const Flow = {
    id: "electrical",
    badge: "Electrical guide",
    subtitle: "Panels, circuits, safety",
    title: "Electrical Guide",
    steps: [
      {
        id: "e_intro",
        title: "Electrical basics",
        lead: "Start with safety and capacity. Your answers tailor the emphasis.",
        blocks: [
          {
            type: "explain",
            title: "Plain-language explanation",
            body: "Most electrical problems come from capacity limits, aging panels, or unsafe wiring. We focus on safe load capacity, proper circuiting, and protection devices first."
          },
          {
            type: "videoModule",
            title: "Video: Electrical safety in 90 seconds",
            caption: "One concept only: why panel capacity and protection devices matter.",
            thumb: "assets/img/thumb-generic.png",
            href: "#"
          },
          {
            type: "chart",
            title: "Visual / chart placeholder",
            body: "Snapshot of common electrical priorities.",
            chartTitle: "Electrical priorities",
            rows: [
              { label: "Safety devices", value: 80 },
              { label: "Panel capacity", value: 70 },
              { label: "Dedicated circuits", value: 60 }
            ],
            caption: "What this shows: safety and capacity come before new loads."
          },
          {
            type: "evidenceAccordion",
            title: "Evidence & Sources",
            summary: "Open sources (NFPA, CPSC)",
            items: [
              { label: "NFPA Electrical Safety", url: "https://www.nfpa.org/education" },
              { label: "CPSC Home Electrical Safety", url: "https://www.cpsc.gov/Safety-Education" }
            ]
          },
          {
            type: "implications",
            title: "What this means for your home",
            body: "We prioritize safety risks and capacity limits first.",
            scenarios: [
              { title: "Frequent breaker trips", body: "Often a sign of overloaded circuits or undersized breakers.", showIf: { any: [{ q: "e_issues", has: "breakers" }] } },
              { title: "Flickering lights", body: "Can indicate loose connections, shared neutral, or panel wear.", showIf: { any: [{ q: "e_issues", has: "flicker" }] } },
              { title: "Warm outlets", body: "Heat is a red flag. We inspect connections and device load.", showIf: { any: [{ q: "e_issues", has: "warm" }] } }
            ]
          },
          {
            type: "products",
            title: "Recommendations",
            body: "We match upgrades to actual safety and capacity needs.",
            items: [
              { title: "Panel safety evaluation", solves: "Identify overloads and safety risks", not: "Cosmetic updates", for: "Homes with breaker trips or flicker", notFor: "New homes with no issues", link: "schedule.html" },
              { title: "Dedicated circuit planning", solves: "Heavy-load appliances", not: "Legacy wiring issues", for: "Kitchens, laundry, EV chargers", notFor: "Light-load circuits", link: "schedule.html" }
            ]
          },
          {
            type: "deepdive",
            title: "Go deeper (advanced)",
            items: [
              { q: "Go deeper: AFCI vs GFCI", a: "GFCI protects from shock in wet areas. AFCI protects from arc faults that can cause fires." },
              { q: "Go deeper: Panel capacity", a: "Service size and panel condition determine how many loads can be added safely." }
            ]
          }
        ],
        questions: [
          { key: "e_issues", type: "multi", title: "What issues do you notice?", options: [
            { value: "breakers", label: "Breakers trip" },
            { value: "flicker", label: "Lights flicker" },
            { value: "warm", label: "Outlets/switches feel warm" },
            { value: "old", label: "Older panel or wiring" },
            { value: "none", label: "No issues" }
          ]},
          { key: "e_panel_age", type: "single", title: "Panel age", options: [
            { value: "new", label: "Under 10 years" },
            { value: "mid", label: "10-25 years" },
            { value: "old", label: "25+ years" },
            { value: "unknown", label: "Not sure" }
          ]}
        ]
      },

      {
        id: "e_loads",
        title: "Capacity and new loads",
        lead: "Plan for kitchens, HVAC, and EV chargers without overloading the system.",
        blocks: [
          {
            type: "explain",
            title: "Plain-language explanation",
            body: "Modern homes add more electrical loads over time. Dedicated circuits and panel capacity keep the system safe."
          },
          {
            type: "videoModule",
            title: "Video: Load planning",
            caption: "One concept only: match loads to available capacity.",
            thumb: "assets/img/thumb-generic.png",
            href: "#"
          },
          {
            type: "chart",
            title: "Visual / chart placeholder",
            body: "Typical high-load additions that require planning.",
            chartTitle: "High-load additions",
            rows: [
              { label: "EV charger", value: 80, showIf: { any: [{ q: "e_additions", has: "ev" }] } },
              { label: "HVAC upgrade", value: 70, showIf: { any: [{ q: "e_additions", has: "hvac" }] } },
              { label: "Kitchen remodel", value: 60, showIf: { any: [{ q: "e_additions", has: "kitchen" }] } }
            ],
            caption: "What this shows: big loads need dedicated planning."
          },
          {
            type: "implications",
            title: "What this means for your home",
            body: "We plan circuits and panel capacity before upgrades.",
            scenarios: [
              { title: "EV charger", body: "Usually needs a dedicated circuit and panel capacity check.", showIf: { any: [{ q: "e_additions", has: "ev" }] } },
              { title: "Kitchen remodel", body: "Often requires multiple dedicated circuits.", showIf: { any: [{ q: "e_additions", has: "kitchen" }] } },
              { title: "HVAC upgrade", body: "New equipment can change electrical load requirements.", showIf: { any: [{ q: "e_additions", has: "hvac" }] } }
            ]
          },
          {
            type: "products",
            title: "Recommendations",
            body: "We design around safe capacity, not guesses.",
            items: [
              { title: "Load calculation + panel check", solves: "Prevent overload and nuisance trips", not: "Cosmetic updates", for: "Homes adding new loads", notFor: "No planned changes", link: "schedule.html" }
            ]
          }
        ],
        questions: [
          { key: "e_additions", type: "multi", title: "Any new loads planned?", options: [
            { value: "ev", label: "EV charger" },
            { value: "hvac", label: "HVAC upgrade" },
            { value: "kitchen", label: "Kitchen remodel" },
            { value: "workshop", label: "Shop/tools" },
            { value: "none", label: "No new loads" }
          ]},
          { key: "e_priority", type: "single", title: "Priority", options: [
            { value: "safety", label: "Safety" },
            { value: "capacity", label: "Capacity" },
            { value: "future", label: "Future-proofing" }
          ]}
        ]
      },

      {
        id: "e_review",
        title: "Review: your electrical plan",
        lead: "Education first. Here is your recommended next step.",
        isReview: true,
        blocks: [
          { type: "callout", title: "Before you schedule", body: "We verify safety risks first. If anything is unsafe, we prioritize repairs before upgrades." },
          { type: "video", title: "How to read your recommendation", caption: "Replace VIDEO_ID.", embedUrl: "https://www.youtube.com/embed/VIDEO_ID" }
        ],
        questions: [
          { key: "e_notes", type: "textarea", title: "Optional notes", help: "Describe any breaker issues or recent upgrades." }
        ]
      }
    ]
  };

  window.HWA_FLOWS = window.HWA_FLOWS || {};
  window.HWA_FLOWS.electrical = Flow;
})();
