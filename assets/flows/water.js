(function(){
  const Flow = {
    id: "water",
    badge: "Water guide",
    subtitle: "Taste, hardness, staining, and confidence",
    title: "Water Quality Guide",
    steps: [
      {
        id: "w_intro",
        title: "Water quality basics",
        lead: "Education first. Your answers refine emphasis without changing the learning path.",
        blocks: [
          {
            type: "explain",
            title: "Plain-language explanation",
            body: "Most water issues come from three buckets: particles (sediment), dissolved minerals (hardness), and disinfectants or contaminants (taste/odor and confidence). The right fix matches the right problem."
          },
          {
            type: "videoModule",
            title: "Video: Water basics in 60 seconds",
            caption: "One concept only: the three problem buckets and how treatment layers map.",
            thumb: "assets/img/thumb-water.png",
            href: "#"
          },
          {
            type: "chart",
            title: "Visual / chart placeholder",
            body: "Simple diagram showing treatment layers and where each problem is addressed.",
            chartTitle: "Layered treatment overview",
            rows: [
              { label: "Sediment", value: 35 },
              { label: "Carbon", value: 60 },
              { label: "Softening", value: 75 },
              { label: "RO (drinking)", value: 85 }
            ],
            caption: "What this shows: each layer addresses a different problem."
          },
          {
            type: "evidenceAccordion",
            title: "Evidence & Sources",
            summary: "Open sources (EPA, CDC, NSF, WQA)",
            items: [
              { label: "EPA Drinking Water Standards", url: "https://www.epa.gov/sdwa" },
              { label: "USGS Water Hardness", url: "https://water.usgs.gov/owq/hardness-alkalinity.html" },
              { label: "CDC Private Well Guidance", url: "https://www.cdc.gov/healthywater/drinking/private/wells/", showIf: { any: [{ q: "w_source", eq: "well" }] } },
              { label: "NSF Water Filter Standards", url: "https://www.nsf.org/consumer-resources/water-quality/water-filters-testing-treatment" },
              { label: "WQA Learn About Water", url: "https://www.wqa.org/learn-about-water" }
            ]
          },
          {
            type: "implications",
            title: "What this means for your home",
            body: "Your answers focus the examples and the recommended layers below.",
            scenarios: [
              { title: "City water", body: "Carbon is the most common layer for taste/odor and shower feel.", showIf: { any: [{ q: "w_source", eq: "city" }] } },
              { title: "Private well", body: "Testing plus sediment and disinfection layers are usually the starting point.", showIf: { any: [{ q: "w_source", eq: "well" }] } },
              { title: "Hardness symptoms", body: "Scale or spotting points to softening.", showIf: { any: [{ q: "w_symptoms", has: "scale" }, { q: "w_symptoms", has: "spotting" }] } },
              { title: "Safety priority", body: "If confidence is the goal, testing plus RO gives the most reliable improvement.", showIf: { any: [{ q: "w_goals", has: "safety" }] } }
            ]
          },
          {
            type: "products",
            title: "Product implications + recommendations",
            body: "Use products only when they match the problem. Good: carbon for taste. Better: RO for drinking. Best: carbon + RO + testing for confidence.",
            items: [
              { title: "Sediment filtration", solves: "Grit, cloudiness, clogged fixtures", not: "Dissolved minerals or chlorine taste", for: "Particles in water or older plumbing", notFor: "Hardness-only issues", link: "shop.html", showIf: { any: [{ q: "w_source", eq: "well" }] } },
              { title: "Carbon filtration", solves: "Chlorine taste/odor and shower feel", not: "Scale or heavy minerals", for: "City water taste/odor", notFor: "Scale-only complaints", link: "shop.html", showIf: { any: [{ q: "w_goals", has: "taste" }, { q: "w_goals", has: "odor" }] } },
              { title: "Water test", solves: "Confirms hardness and safety baseline", not: "Treats water by itself", for: "Safety or unknown issues", notFor: "When you already have recent results", link: "shop.html", showIf: { any: [{ q: "w_goals", has: "safety" }, { q: "w_symptoms", has: "concern" }] } }
            ]
          },
          {
            type: "deepdive",
            title: "Go deeper (advanced)",
            items: [
              { q: "Go deeper: NSF/ANSI standards", a: "NSF/ANSI standards (42, 53, 58) define verified reduction claims. Match certifications to your goals." },
              { q: "Go deeper: Why tests matter", a: "A basic test confirms hardness, sediment, and disinfectant levels so you do not over-buy or miss key issues." }
            ]
          }
        ],
        questions: [
          { key: "w_source", type: "single", title: "Water source", options: [
            { value: "city", label: "City/municipal" },
            { value: "well", label: "Private well" },
            { value: "unknown", label: "Not sure" }
          ]},
          { key: "w_goals", type: "multi", title: "What are you trying to improve?", help: "Pick all that apply.", options: [
            { value: "taste", label: "Better drinking taste" },
            { value: "odor", label: "Less smell (chlorine/other)" },
            { value: "protect", label: "Protect plumbing/appliances" },
            { value: "showers", label: "Better showers/skin feel" },
            { value: "stains", label: "Fix staining" },
            { value: "safety", label: "Higher confidence/safety" }
          ]}
        ]
      },

      {
        id: "w_hardness",
        title: "Hardness, scale, and staining",
        lead: "Hardness creates scale, spotting, and appliance wear.",
        blocks: [
          {
            type: "explain",
            title: "Plain-language explanation",
            body: "Hardness is dissolved minerals that leave scale. Scale lowers water heater efficiency and shortens appliance life."
          },
          {
            type: "videoModule",
            title: "Video: Hard water in 60 seconds",
            caption: "One concept only: how scale forms and why softeners work.",
            thumb: "assets/img/thumb-generic.png",
            href: "#"
          },
          {
            type: "chart",
            title: "Visual / chart placeholder",
            body: "Simple chart showing scale risk by hardness range.",
            chartTitle: "Scale risk by hardness",
            rows: [
              { label: "0-5 gpg", value: 20 },
              { label: "6-10 gpg", value: 55 },
              { label: "11-20 gpg", value: 80 },
              { label: "Staining risk (iron/manganese)", value: 70, showIf: { any: [{ q: "w_symptoms", has: "stains" }] } }
            ],
            caption: "What this shows: scale risk rises quickly as hardness increases."
          },
          {
            type: "evidenceAccordion",
            title: "Evidence & Sources",
            summary: "Open sources (USGS, Extension, WQA)",
            items: [
              { label: "USGS Hardness Ranges", url: "https://water.usgs.gov/owq/hardness-alkalinity.html" },
              { label: "Utah State University Water Quality", url: "https://extension.usu.edu/waterquality/" },
              { label: "WQA Treatment Basics", url: "https://www.wqa.org/learn-about-water" }
            ]
          },
          {
            type: "implications",
            title: "What this means for your home",
            body: "If you see scale or spotting, softening is usually the direct fix.",
            scenarios: [
              { title: "Scale or spotting present", body: "A properly sized softener is the most direct solution.", showIf: { any: [{ q: "w_symptoms", has: "scale" }, { q: "w_symptoms", has: "spotting" }] } },
              { title: "Staining colors", body: "Orange/brown often points to iron; black/purple to manganese.", showIf: { any: [{ q: "w_symptoms", has: "stains" }] } },
              { title: "Larger households", body: "Sizing for more people prevents frequent regeneration and low pressure.", showIf: { any: [{ q: "w_household", eq: "5+" }] } },
              { title: "Older homes", body: "Older plumbing can add sediment or corrosion, which may require pre-filtration.", showIf: { any: [{ q: "w_home_age", eq: "old" }] } },
              { title: "Tight space", body: "Compact or stacked systems can solve space constraints without sacrificing performance.", showIf: { any: [{ q: "w_space", eq: "tight" }] } },
              { title: "Low maintenance", body: "Favor fewer cartridges and longer service intervals.", showIf: { any: [{ q: "w_maintenance", eq: "low" }] } }
            ]
          },
          {
            type: "products",
            title: "Product implications + recommendations",
            body: "Softening targets scale. Carbon targets taste/odor. Use the right tool for the symptom.",
            items: [
              { title: "Water softener", solves: "Scale, spotting, dry skin", not: "Chlorine taste/odor", for: "Homes with hardness symptoms", notFor: "Taste-only issues", link: "shop.html", showIf: { any: [{ q: "w_symptoms", has: "scale" }, { q: "w_symptoms", has: "spotting" }] } },
              { title: "Sediment filter", solves: "Grit and particles", not: "Dissolved minerals", for: "Sediment or older plumbing", notFor: "Hardness-only issues", link: "shop.html", showIf: { any: [{ q: "w_symptoms", has: "sediment" }, { q: "w_home_age", eq: "old" }] } }
            ]
          },
          {
            type: "deepdive",
            title: "Go deeper (advanced)",
            items: [
              { q: "Go deeper: Why sizing matters", a: "Oversized softeners waste salt. Undersized units regenerate too often. Sizing uses hardness and household size." },
              { q: "Go deeper: Staining colors", a: "Iron and manganese usually need targeted filtration beyond a standard softener." }
            ]
          }
        ],
        questions: [
          { key: "w_symptoms", type: "multi", title: "What water issues do you notice?", options: [
            { value: "chlorine", label: "Chlorine taste/odor", meta: "Drinking water smell or taste" },
            { value: "scale", label: "Scale buildup", meta: "White crust on fixtures, showerheads" },
            { value: "spotting", label: "Spots on dishes/glass", meta: "Hardness minerals" },
            { value: "stains", label: "Staining", meta: "Toilets/sinks discoloration" },
            { value: "sediment", label: "Sediment / grit", meta: "Particles in faucet or tub" },
            { value: "dryskin", label: "Dry skin after showers", meta: "Hardness + dryness" },
            { value: "cloudy", label: "Cloudy water", meta: "Often sediment or aeration" },
            { value: "rottenegg", label: "Rotten egg smell", meta: "Often sulfur/hydrogen sulfide" },
            { value: "concern", label: "Health concerns / unknown", meta: "Want more reduction and confidence" }
          ]},
          { key: "w_household", type: "single", title: "People in the home", options: [
            { value: "1-2", label: "1-2" },
            { value: "3-4", label: "3-4" },
            { value: "5+", label: "5+" }
          ]},
          { key: "w_home_age", type: "single", title: "Age of home", options: [
            { value: "new", label: "0-10 years" },
            { value: "mid", label: "10-30 years" },
            { value: "old", label: "30+ years" }
          ]},
          { key: "w_space", type: "single", title: "Space for equipment?", options: [
            { value: "plenty", label: "Plenty of space" },
            { value: "tight", label: "Tight space" },
            { value: "unknown", label: "Not sure" }
          ]},
          { key: "w_maintenance", type: "single", title: "Maintenance tolerance", options: [
            { value: "low", label: "Low (set-and-forget)" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High (ok with regular upkeep)" }
          ]}
        ]
      },

      {
        id: "w_taste",
        title: "Taste, odor, and drinking confidence",
        lead: "Taste and confidence usually come from carbon + RO at the drinking tap.",
        blocks: [
          {
            type: "explain",
            title: "Plain-language explanation",
            body: "Carbon removes common taste/odor issues. RO (reverse osmosis) targets many dissolved contaminants at the drinking faucet."
          },
          {
            type: "videoModule",
            title: "Video: RO in 60 seconds",
            caption: "One concept only: RO is for drinking water, not whole-home.",
            thumb: "assets/img/thumb-water.png",
            href: "#"
          },
          {
            type: "chart",
            title: "Visual / chart placeholder",
            body: "Simple comparison of taste improvement sources.",
            chartTitle: "Taste improvement impact",
            rows: [
              { label: "Carbon filtration", value: 70, showIf: { any: [{ q: "w_goals", has: "taste" }, { q: "w_goals", has: "odor" }] } },
              { label: "RO for drinking", value: 85, showIf: { any: [{ q: "w_ro_want", in: ["yes","maybe"] }, { q: "w_goals", has: "safety" }] } },
              { label: "Softener only", value: 30 }
            ],
            caption: "What this shows: taste improvements typically come from carbon or RO."
          },
          {
            type: "evidenceAccordion",
            title: "Evidence & Sources",
            summary: "Open sources (EPA, NSF)",
            items: [
              { label: "EPA Drinking Water Guidance", url: "https://www.epa.gov/ground-water-and-drinking-water" },
              { label: "NSF Filter Performance", url: "https://www.nsf.org/consumer-resources/water-quality/water-filters-testing-treatment" },
              { label: "CDC Private Well Basics", url: "https://www.cdc.gov/healthywater/drinking/private/wells/", showIf: { any: [{ q: "w_source", eq: "well" }] } }
            ]
          },
          {
            type: "implications",
            title: "What this means for your home",
            body: "Use RO when taste and confidence are top priorities.",
            scenarios: [
              { title: "Confidence priority", body: "If safety confidence is the goal, RO plus testing is usually the strongest step.", showIf: { any: [{ q: "w_goals", has: "safety" }, { q: "w_symptoms", has: "concern" }] } },
              { title: "Taste/odor priority", body: "Whole-home carbon helps showers and laundry; RO improves drinking taste most.", showIf: { any: [{ q: "w_goals", has: "taste" }, { q: "w_goals", has: "odor" }] } },
              { title: "Comfort priority", body: "Focus on carbon for shower feel plus RO for drinking taste.", showIf: { any: [{ q: "w_priority", eq: "comfort" }] } }
            ]
          },
          {
            type: "products",
            title: "Product implications + recommendations",
            body: "Good: carbon for taste/odor. Better: RO for drinking. Best: carbon + RO + test for confidence.",
            items: [
              { title: "Whole-home carbon", solves: "Chlorine taste/odor, shower feel", not: "Scale", for: "City water taste/odor", notFor: "Scale-only issues", link: "shop.html", showIf: { any: [{ q: "w_goals", has: "taste" }, { q: "w_goals", has: "odor" }] } },
              { title: "Reverse osmosis (RO)", solves: "Drinking water taste and dissolved contaminants", not: "Whole-home hardness", for: "Homeowners who cook/drink at home", notFor: "Shower-only improvements", link: "shop.html", showIf: { any: [{ q: "w_ro_want", in: ["yes","maybe"] }, { q: "w_goals", has: "safety" }] } }
            ]
          },
          {
            type: "deepdive",
            title: "Go deeper (advanced)",
            items: [
              { q: "Go deeper: Does RO waste water?", a: "Yes, some. Modern systems are more efficient, and the taste + confidence benefits are often worth it." },
              { q: "Go deeper: Remineralization", a: "Some prefer the taste. It is optional and preference-based." }
            ]
          }
        ],
        questions: [
          { key: "w_ro_want", type: "single", title: "Do you want RO for drinking water?", options: [
            { value: "yes", label: "Yes" },
            { value: "maybe", label: "Maybe / recommend if it fits" },
            { value: "no", label: "No" }
          ]},
          { key: "w_priority", type: "single", title: "Priority", help: "Pick the most important outcome.", options: [
            { value: "health", label: "Health confidence" },
            { value: "comfort", label: "Comfort and taste" },
            { value: "protect", label: "Protect plumbing" }
          ]}
        ]
      },

      {
        id: "w_review",
        title: "Review: your water plan",
        lead: "Education comes first. Here is your recommended plan with pricing.",
        isReview: true,
        blocks: [
          { type: "callout", title: "Before you add to cart", body: "You can remove any items you do not want and still keep the rest of the bundle. If any line says Quote, we recommend a quick verification step before finalizing." },
          { type: "video", title: "How to read your recommendation", caption: "Replace VIDEO_ID.", embedUrl: "https://www.youtube.com/embed/VIDEO_ID" }
        ],
        questions: [
          { key: "w_notes", type: "textarea", title: "Optional notes", help: "Any known issues (old galvanized pipe, water heater problems, basement plumbing)?" }
        ]
      }
    ],

    rules: [
      { when: { any: [{ q: "w_priority", truthy: true }, { q: "w_symptoms", truthy: true }, { q: "w_goals", truthy: true }] }, addProducts: ["water_test"] },

      { when: { any: [{ q: "w_symptoms", has: "sediment" }, { q: "w_symptoms", has: "cloudy" }, { q: "w_home_age", eq: "old" }] },
        addProducts: ["water_sediment"],
        addExplainers: [{ title: "Sediment first", body: "Sediment protection prevents clogs and protects other treatment devices. It is often the lowest-cost high-impact starting point." }]
      },

      { when: { any: [
          { q: "w_symptoms", has: "chlorine" },
          { q: "w_symptoms", has: "rottenegg" },
          { q: "w_goals", has: "odor" },
          { q: "w_goals", has: "taste" }
        ]},
        addProducts: ["water_wholehome_carbon"],
        addExplainers: [{ title: "Carbon filtration", body: "Whole-home carbon improves shower and laundry experience and reduces chlorine taste/odor." }]
      },

      { when: { any: [
          { q: "w_symptoms", has: "scale" },
          { q: "w_symptoms", has: "spotting" },
          { q: "w_symptoms", has: "dryskin" },
          { q: "w_goals", has: "protect" },
          { q: "w_goals", has: "showers" }
        ]},
        addProducts: ["water_softener"],
        addNotes: ["A softener is the most direct solution for scale and spotting. Proper sizing prevents frequent regeneration."],
        addExplainers: [{ title: "Soft water benefits", body: "Soft water reduces scale buildup, extends appliance life, improves soap performance, and can make showers feel noticeably better." }]
      },

      { when: { any: [
          { q: "w_ro_want", in: ["yes", "maybe"] },
          { q: "w_goals", has: "taste" },
          { q: "w_goals", has: "safety" },
          { q: "w_symptoms", has: "concern" }
        ]},
        addProducts: ["water_ro_system"],
        addExplainers: [{ title: "RO drinking water", body: "RO is the most noticeable taste upgrade. It also reduces many dissolved contaminants for higher confidence." }]
      },

      { when: { all: [{ q: "w_source", eq: "well" }, { q: "w_priority", in: ["health", "comfort"] }] },
        addProducts: ["water_uv_disinfection"],
        addExplainers: [{ title: "Well disinfection layer", body: "UV can add a confidence layer for microbial concerns when paired with proper pre-filtration." }]
      },
      { when: { any: [{ q: "w_maintenance", eq: "low" }] },
        addExplainers: [{ title: "Low-maintenance plan", body: "We will prioritize fewer cartridges and longer service intervals where possible." }]
      }
    ]
  };

  window.HWA_FLOWS = window.HWA_FLOWS || {};
  window.HWA_FLOWS.water = Flow;
})();
