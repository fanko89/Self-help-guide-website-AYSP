(function(){
  const Flow = {
    id: "air",
    badge: "Air guide",
    subtitle: "Dust, allergies, odors, humidity",
    title: "Air Quality Guide",
    steps: [
      {
        id: "a_intro",
        title: "Indoor air basics",
        lead: "Education first. Your answers refine emphasis without changing the learning path.",
        blocks: [
          {
            type: "explain",
            title: "Plain-language explanation",
            body: "Indoor air issues usually come from particles (dust/pets), gases/odors (VOC, smoke), and moisture/ventilation. Filtration helps particles, ventilation helps gases, and humidity control helps comfort."
          },
          {
            type: "videoModule",
            title: "Video: Indoor air basics",
            caption: "One concept only: particles vs gases vs humidity.",
            thumb: "assets/img/thumb-air.png",
            href: "#"
          },
          {
            type: "chart",
            title: "Visual / chart placeholder",
            body: "Simple diagram of air quality layers and what each solves.",
            chartTitle: "IAQ layers overview",
            rows: [
              { label: "Filtration", value: 70 },
              { label: "Ventilation", value: 55, showIf: { any: [{ q: "a_symptoms", has: "odors" }] } },
              { label: "Humidity control", value: 45, showIf: { any: [{ q: "a_symptoms", has: "dry" }] } }
            ],
            caption: "What this shows: different problems need different layers."
          },
          {
            type: "evidenceAccordion",
            title: "Evidence & Sources",
            summary: "Open sources (EPA, CDC, university)",
            items: [
              { label: "EPA Indoor Air Quality", url: "https://www.epa.gov/indoor-air-quality-iaq" },
              { label: "EPA Air Cleaners and Filters", url: "https://www.epa.gov/indoor-air-quality-iaq/air-cleaners-and-air-filters-in-the-home" },
              { label: "CDC Asthma", url: "https://www.cdc.gov/asthma/" },
              { label: "Harvard Healthy Buildings", url: "https://healthybuildings.hsph.harvard.edu/" }
            ]
          },
          {
            type: "implications",
            title: "What this means for your home",
            body: "Your answers control which topics are emphasized below.",
            scenarios: [
              { title: "Allergies or asthma", body: "Filtration and sealing usually have the biggest impact on triggers.", showIf: { any: [{ q: "a_sensitivity", has: "allergies" }, { q: "a_sensitivity", has: "asthma" }] } },
              { title: "Pets", body: "Capture larger particles with a deep media filter and focus on airflow.", showIf: { any: [{ q: "a_pets", eq: "yes" }] } },
              { title: "Odors", body: "Ventilation and source control matter more than standard filters.", showIf: { any: [{ q: "a_symptoms", has: "odors" }] } }
            ]
          },
          {
            type: "products",
            title: "Product implications + recommendations",
            body: "Good: better filtration. Better: sealed media cabinet. Best: media + ventilation when odors or humidity are present.",
            items: [
              { title: "4-inch media filtration", solves: "Dust and allergen capture", not: "Odors or gases", for: "Homes with dust/allergy concerns", notFor: "Odor-only complaints", link: "shop.html", showIf: { any: [{ q: "a_symptoms", has: "dust" }, { q: "a_symptoms", has: "allergies" }] } },
              { title: "Ventilation (ERV)", solves: "Stale air and odors", not: "Large particle buildup", for: "Homes with odors or humidity", notFor: "Dust-only issues", link: "shop.html", showIf: { any: [{ q: "a_symptoms", has: "odors" }] } },
              { title: "Humidification", solves: "Dry air and static", not: "Dust or odor removal", for: "Homes with dry air complaints", notFor: "High humidity climates", link: "shop.html", showIf: { any: [{ q: "a_symptoms", has: "dry" }] } }
            ]
          },
          {
            type: "deepdive",
            title: "Go deeper (advanced)",
            items: [
              { q: "Go deeper: What is MERV?", a: "MERV is a filter rating for particle capture. Higher MERV can restrict airflow if the system is not designed for it." },
              { q: "Go deeper: Why ventilation?", a: "Ventilation dilutes indoor pollutants. It complements filtration rather than replacing it." }
            ]
          }
        ],
        questions: [
          { key: "a_symptoms", type: "multi", title: "What air issues do you notice?", options: [
            { value: "dust", label: "Dust buildup" },
            { value: "allergies", label: "Allergies/sneezing" },
            { value: "odors", label: "Odors or smoke" },
            { value: "dry", label: "Dry air/static" },
            { value: "pets", label: "Pet dander" }
          ]},
          { key: "a_pets", type: "single", title: "Pets in the home?", options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]},
          { key: "a_sensitivity", type: "multi", title: "Sensitivity in the home", help: "Select all that apply.", options: [
            { value: "allergies", label: "Allergies" },
            { value: "asthma", label: "Asthma" },
            { value: "none", label: "None" }
          ]}
        ]
      },

      {
        id: "a_filtration",
        title: "Filtration and airflow",
        lead: "Filters help only when airflow is protected and bypass leaks are sealed.",
        blocks: [
          {
            type: "explain",
            title: "Plain-language explanation",
            body: "A better filter is not always better air. If airflow is restricted, comfort can get worse."
          },
          {
            type: "videoModule",
            title: "Video: Filtration without airflow loss",
            caption: "One concept only: deeper media captures more without choking airflow.",
            thumb: "assets/img/thumb-air.png",
            href: "#"
          },
          {
            type: "chart",
            title: "Visual / chart placeholder",
            body: "Comparison of 1-inch vs 4-inch media filters.",
            chartTitle: "Filter vs airflow tradeoff",
            rows: [
              { label: "1-inch filters", value: 45, showIf: { any: [{ q: "a_filter", eq: "1in" }] } },
              { label: "4-inch media", value: 80, showIf: { any: [{ q: "a_filter", eq: "4in" }, { q: "a_symptoms", has: "dust" }] } }
            ],
            caption: "What this shows: deeper media can capture more without restricting airflow."
          },
          {
            type: "evidenceAccordion",
            title: "Evidence & Sources",
            summary: "Open sources (EPA, ASHRAE)",
            items: [
              { label: "EPA Air Cleaners and Filters", url: "https://www.epa.gov/indoor-air-quality-iaq/air-cleaners-and-air-filters-in-the-home" },
              { label: "ASHRAE Standards Overview", url: "https://www.ashrae.org/technical-resources/standards-and-guidelines" },
              { label: "CDC Indoor Air Basics", url: "https://www.cdc.gov/healthyhomes/bytopic/airquality.html" }
            ]
          },
          {
            type: "implications",
            title: "What this means for your home",
            body: "Use deeper media when dust or allergy symptoms are strong.",
            scenarios: [
              { title: "Dust or allergy symptoms", body: "A 4-inch media cabinet is usually the best balance of capture and airflow.", showIf: { any: [{ q: "a_symptoms", has: "dust" }, { q: "a_symptoms", has: "allergies" }] } },
              { title: "Pets in the home", body: "Deep media plus sealed bypass gaps helps capture pet dander.", showIf: { any: [{ q: "a_pets", eq: "yes" }] } },
              { title: "1-inch filters today", body: "Upgrading to a media cabinet often improves capture without hurting airflow.", showIf: { any: [{ q: "a_filter", eq: "1in" }] } },
              { title: "Tight space", body: "Compact cabinets and careful placement solve space constraints.", showIf: { any: [{ q: "a_space", eq: "tight" }] } },
              { title: "Low maintenance", body: "Choose longer-life filters and avoid high-maintenance add-ons.", showIf: { any: [{ q: "a_maintenance", eq: "low" }] } },
              { title: "Health priority", body: "Focus on particle capture and sealing first.", showIf: { any: [{ q: "a_priority", eq: "health" }] } },
              { title: "Larger homes", body: "Higher airflow systems benefit from deeper media to maintain capture.", showIf: { any: [{ q: "a_home_size", eq: "large" }] } }
            ]
          },
          {
            type: "products",
            title: "Product implications + recommendations",
            body: "Good: better filter. Better: sealed cabinet + media. Best: media + ventilation when odors are present.",
            items: [
              { title: "4-inch media cabinet", solves: "Dust and allergen capture", not: "Odors or gases", for: "Homes with dust/allergy concerns", notFor: "Odor-only complaints", link: "shop.html" }
            ]
          },
          {
            type: "deepdive",
            title: "Go deeper (advanced)",
            items: [
              { q: "Go deeper: Static pressure", a: "Static pressure tells you how hard the blower is working. High pressure means airflow problems." },
              { q: "Go deeper: Sealing bypass", a: "Air that bypasses the filter never gets cleaned. Sealing the cabinet is key." }
            ]
          }
        ],
        questions: [
          { key: "a_filter", type: "single", title: "Current filter type", options: [
            { value: "1in", label: "1-inch filter" },
            { value: "4in", label: "4-inch media" },
            { value: "unknown", label: "Not sure" }
          ]},
          { key: "a_priority", type: "single", title: "Priority", options: [
            { value: "health", label: "Health" },
            { value: "comfort", label: "Comfort" },
            { value: "efficiency", label: "Efficiency" }
          ]},
          { key: "a_home_size", type: "single", title: "Home size", options: [
            { value: "small", label: "Under 1,800 sq ft" },
            { value: "medium", label: "1,800-3,000 sq ft" },
            { value: "large", label: "3,000+ sq ft" }
          ]},
          { key: "a_space", type: "single", title: "Space for equipment?", options: [
            { value: "plenty", label: "Plenty of space" },
            { value: "tight", label: "Tight space" },
            { value: "unknown", label: "Not sure" }
          ]},
          { key: "a_maintenance", type: "single", title: "Maintenance tolerance", options: [
            { value: "low", label: "Low (set-and-forget)" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High (ok with regular upkeep)" }
          ]}
        ]
      },

      {
        id: "a_review",
        title: "Review: your air plan",
        lead: "Education comes first. Here is your recommended plan with pricing.",
        isReview: true,
        blocks: [
          { type: "callout", title: "Before you add to cart", body: "You can remove any items you do not want and still keep the rest of the bundle. If any line says Quote, we recommend a quick verification step before finalizing." },
          { type: "video", title: "How to read your recommendation", caption: "Replace VIDEO_ID.", embedUrl: "https://www.youtube.com/embed/VIDEO_ID" }
        ],
        questions: [
          { key: "a_notes", type: "textarea", title: "Optional notes", help: "Any known airflow issues or noisy vents?" }
        ]
      }
    ],

    rules: [
      { when: { any: [{ q: "a_symptoms", has: "dust" }, { q: "a_symptoms", has: "allergies" }, { q: "a_pets", eq: "yes" }] },
        addProducts: ["air_4in_filter_upgrade"],
        addExplainers: [{ title: "Filtration focus", body: "Dust and allergens are best addressed with deeper media filtration and sealed bypass gaps." }]
      },
      { when: { any: [{ q: "a_symptoms", has: "odors" }] },
        addProducts: ["air_erv_ventilation"],
        addExplainers: [{ title: "Ventilation focus", body: "Odors and stale air respond better to ventilation than to higher MERV filters." }]
      },
      { when: { any: [{ q: "a_symptoms", has: "dry" }] },
        addProducts: ["air_humidifier"],
        addExplainers: [{ title: "Humidity balance", body: "Dry air and static often improve with controlled humidification." }]
      },
      { when: { any: [{ q: "a_maintenance", eq: "low" }] },
        addExplainers: [{ title: "Low-maintenance focus", body: "We will favor longer-life filters and fewer add-ons." }]
      }
    ]
  };

  window.HWA_FLOWS = window.HWA_FLOWS || {};
  window.HWA_FLOWS.air = Flow;
})();
