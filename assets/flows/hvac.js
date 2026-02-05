(function(){
  const Flow = {
    id: "hvac",
    badge: "HVAC guide",
    subtitle: "Comfort, sizing, airflow",
    title: "HVAC Comfort Guide",
    steps: [
      {
        id: "h_intro",
        title: "Comfort basics",
        lead: "Education first. Your answers refine emphasis without changing the learning path.",
        blocks: [
          {
            type: "explain",
            title: "Plain-language explanation",
            body: "Most comfort problems are not caused by the brand of equipment. They come from sizing, airflow, and duct design. Install quality matters more than brand."
          },
          {
            type: "videoModule",
            title: "Video: Why install quality beats brand",
            caption: "One concept only: sizing + airflow + verification drives comfort.",
            thumb: "assets/img/thumb-hvac.png",
            href: "#"
          },
          {
            type: "chart",
            title: "Visual / chart placeholder",
            body: "Simple diagram of Manual J (load), Manual D (ducts), and verification.",
            chartTitle: "Comfort system overview",
            rows: [
              { label: "Manual J sizing", value: 80 },
              { label: "Manual D ducts", value: 75 },
              { label: "Verification", value: 70 },
              { label: "Refrigerant charge", value: 55, showIf: { any: [{ q: "h_symptoms", has: "humidity" }] } }
            ],
            caption: "What this shows: correct design and verification drive comfort."
          },
          {
            type: "evidenceAccordion",
            title: "Evidence & Sources",
            summary: "Open sources (ACCA, ASHRAE, ENERGY STAR)",
            items: [
              { label: "ACCA Manuals (Manual J/D)", url: "https://www.acca.org/standards/technical-manuals" },
              { label: "ASHRAE Standards Overview", url: "https://www.ashrae.org/technical-resources/standards-and-guidelines" },
              { label: "ENERGY STAR HVAC Guidance", url: "https://www.energystar.gov/" },
              { label: "University Energy Efficiency", url: "https://extension.umn.edu/energy-efficiency" }
            ]
          },
          {
            type: "implications",
            title: "What this means for your home",
            body: "Your symptoms help narrow the likely root cause.",
            scenarios: [
              { title: "Hot/cold rooms", body: "Likely airflow or duct design issues. Manual D design is key.", showIf: { any: [{ q: "h_symptoms", has: "uneven" }] } },
              { title: "High bills", body: "Sizing and airflow issues often increase run time and energy use.", showIf: { any: [{ q: "h_symptoms", has: "bills" }] } },
              { title: "Humidity problems", body: "Refrigerant charge, airflow, and equipment sizing all affect humidity control.", showIf: { any: [{ q: "h_symptoms", has: "humidity" }] } },
              { title: "Older homes", body: "Duct leakage and sizing assumptions are more common in older homes.", showIf: { any: [{ q: "h_home_age", eq: "old" }] } }
            ]
          },
          {
            type: "products",
            title: "Product implications + recommendations",
            body: "Good: airflow balance. Better: duct improvements. Best: design + verification + equipment only if needed.",
            items: [
              { title: "Airflow balance", solves: "Uneven rooms and noise", not: "Oversized equipment", for: "Homes with airflow problems", notFor: "Equipment-only swaps", link: "shop.html", showIf: { any: [{ q: "h_symptoms", has: "uneven" }, { q: "h_symptoms", has: "noise" }] } },
              { title: "System diagnostic", solves: "Unknown issues", not: "Design mistakes", for: "Homes with mixed symptoms", notFor: "Brand-only upgrades", link: "shop.html", showIf: { any: [{ q: "h_symptoms", truthy: true }] } }
            ]
          },
          {
            type: "deepdive",
            title: "Go deeper (advanced)",
            items: [
              { q: "Go deeper: Manual J", a: "Manual J calculates the actual heating and cooling load. Without it, equipment is often oversized." },
              { q: "Go deeper: Manual D", a: "Manual D designs ducts to deliver the correct airflow to each room." }
            ]
          }
        ],
        questions: [
          { key: "h_symptoms", type: "multi", title: "What comfort issues do you notice?", options: [
            { value: "uneven", label: "Hot/cold rooms" },
            { value: "noise", label: "Noisy airflow" },
            { value: "bills", label: "High energy bills" },
            { value: "humidity", label: "Humidity problems" }
          ]},
          { key: "h_home_age", type: "single", title: "Age of home", options: [
            { value: "new", label: "0-10 years" },
            { value: "mid", label: "10-30 years" },
            { value: "old", label: "30+ years" }
          ]}
        ]
      },

      {
        id: "h_airflow",
        title: "Airflow and duct design",
        lead: "Airflow is the most common root cause of comfort problems.",
        blocks: [
          {
            type: "explain",
            title: "Plain-language explanation",
            body: "Even a new system cannot fix comfort if ducts are undersized or leaking."
          },
          {
            type: "videoModule",
            title: "Video: Airflow and duct basics",
            caption: "One concept only: static pressure and airflow balance.",
            thumb: "assets/img/thumb-hvac.png",
            href: "#"
          },
          {
            type: "chart",
            title: "Visual / chart placeholder",
            body: "Comparison of balanced airflow vs restricted airflow.",
            chartTitle: "Airflow impact",
            rows: [
              { label: "Balanced airflow", value: 85 },
              { label: "Restricted airflow", value: 35, showIf: { any: [{ q: "h_symptoms", has: "noise" }, { q: "h_symptoms", has: "uneven" }] } }
            ],
            caption: "What this shows: airflow balance drives comfort and efficiency."
          },
          {
            type: "evidenceAccordion",
            title: "Evidence & Sources",
            summary: "Open sources (ACCA, ASHRAE)",
            items: [
              { label: "ACCA Manual D", url: "https://www.acca.org/standards/technical-manuals" },
              { label: "ASHRAE Standards", url: "https://www.ashrae.org/technical-resources/standards-and-guidelines" },
              { label: "ENERGY STAR HVAC Tips", url: "https://www.energystar.gov/products/heating_cooling" }
            ]
          },
          {
            type: "implications",
            title: "What this means for your home",
            body: "If you have hot/cold rooms, duct design is usually the first fix.",
            scenarios: [
              { title: "Uneven rooms", body: "Likely duct sizing, balancing, or leakage issues.", showIf: { any: [{ q: "h_symptoms", has: "uneven" }] } },
              { title: "Noisy vents", body: "Often caused by high static pressure from restrictive ducts or filters.", showIf: { any: [{ q: "h_symptoms", has: "noise" }] } },
              { title: "Tight space", body: "Compact duct solutions or zoning may be needed.", showIf: { any: [{ q: "h_space", eq: "tight" }] } },
              { title: "Budget sensitivity", body: "Prioritize measurement and airflow fixes before equipment upgrades.", showIf: { any: [{ q: "h_budget", eq: "high" }] } },
              { title: "Electrical limits", body: "Electrical constraints can affect equipment options and should be verified early.", showIf: { any: [{ q: "h_electrical", eq: "limited" }] } },
              { title: "Keep existing system", body: "Focus on airflow, verification, and controls before replacement.", showIf: { any: [{ q: "h_system", eq: "keep" }] } },
              { title: "Comfort priority", body: "Airflow balance and duct fixes usually deliver the fastest comfort gains.", showIf: { any: [{ q: "h_priority", eq: "comfort" }] } }
            ]
          },
          {
            type: "products",
            title: "Product implications + recommendations",
            body: "Design and verification first, equipment second.",
            items: [
              { title: "Duct improvements", solves: "Uneven temperatures and noise", not: "Oversized equipment", for: "Homes with airflow issues", notFor: "Simple tune-ups only", link: "shop.html" }
            ]
          },
          {
            type: "deepdive",
            title: "Go deeper (advanced)",
            items: [
              { q: "Go deeper: Static pressure", a: "Static pressure shows resistance in the duct system. High pressure means restricted airflow." },
              { q: "Go deeper: Refrigerant charge", a: "Incorrect charge impacts humidity control and efficiency. Verification catches this." }
            ]
          }
        ],
        questions: [
          { key: "h_priority", type: "single", title: "Priority", options: [
            { value: "comfort", label: "Comfort" },
            { value: "efficiency", label: "Efficiency" },
            { value: "longevity", label: "Equipment longevity" }
          ]},
          { key: "h_space", type: "single", title: "Space limitations", options: [
            { value: "none", label: "No" },
            { value: "tight", label: "Yes, space is tight" }
          ]},
          { key: "h_budget", type: "single", title: "Budget sensitivity", options: [
            { value: "low", label: "Low (performance first)" },
            { value: "medium", label: "Balanced" },
            { value: "high", label: "High (cost sensitive)" }
          ]},
          { key: "h_electrical", type: "single", title: "Electrical limitations", options: [
            { value: "none", label: "None" },
            { value: "limited", label: "Limited/unsure" }
          ]},
          { key: "h_system", type: "single", title: "Existing system compatibility", options: [
            { value: "keep", label: "Prefer to keep existing system" },
            { value: "replace", label: "Open to replacement" },
            { value: "unknown", label: "Not sure" }
          ]}
        ]
      },

      {
        id: "h_review",
        title: "Review: your comfort plan",
        lead: "Education comes first. Here is your recommended plan with pricing.",
        isReview: true,
        blocks: [
          { type: "callout", title: "Before you add to cart", body: "You can remove any items you do not want and still keep the rest of the bundle. If any line says Quote, we recommend a quick verification step before finalizing." },
          { type: "video", title: "How to read your recommendation", caption: "Replace VIDEO_ID.", embedUrl: "https://www.youtube.com/embed/VIDEO_ID" }
        ],
        questions: [
          { key: "h_notes", type: "textarea", title: "Optional notes", help: "Any known duct issues or previous equipment problems?" }
        ]
      }
    ],

    rules: [
      { when: { any: [{ q: "h_symptoms", has: "uneven" }, { q: "h_symptoms", has: "noise" }] },
        addProducts: ["hvac_airflow_balance"],
        addExplainers: [{ title: "Airflow focus", body: "Airflow and duct design are the most common comfort fixes." }]
      },
      { when: { any: [{ q: "h_symptoms", has: "humidity" }] },
        addProducts: ["air_dehumidifier"],
        addExplainers: [{ title: "Humidity balance", body: "Humidity control improves comfort and can reduce cooling load." }]
      },
      { when: { any: [{ q: "h_budget", eq: "high" }] },
        addExplainers: [{ title: "Budget-sensitive path", body: "We will prioritize the highest impact fixes before equipment upgrades." }]
      }
    ]
  };

  window.HWA_FLOWS = window.HWA_FLOWS || {};
  window.HWA_FLOWS.hvac = Flow;
})();
