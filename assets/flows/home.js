(function(){
  const Flow = {
    id: "home",
    badge: "Home guide",
    subtitle: "Water, air, and comfort plan builder",
    title: "Home Guide",
    steps: [
      {
        id:"welcome",
        title:"Build your Healthy Home Plan",
        lead:"Answer layered questions. You’ll get education and videos during the process, and an itemized recommended bundle at the end.",
        blocks:[
          {type:"callout", title:"How this works", body:"This guide narrows from symptoms → likely causes → best-fit products. You can skip anything you don’t know."},
          {type:"video", title:"Why water + air quality matter", caption:"Replace VIDEO_ID with your intro video.", embedUrl:"https://www.youtube.com/embed/VIDEO_ID"},
          {type:"text", html:"<div><div class='tile' style='margin-top:10px;'><strong>How long does this take?</strong><p>Most homeowners finish in 5-10 minutes. If you add details (humidity, staining, system age) it may take longer.</p></div><div class='tile' style='margin-top:10px;'><strong>Is the price final?</strong><p>It’s an estimate. Final pricing depends on home layout, access, code requirements, and exact sizing.</p></div><div class='tile' style='margin-top:10px;'><strong>Do I need to do everything?</strong><p>No. The guide recommends the smallest bundle that fits your goals and risk level.</p></div></div>"},
          {key:"home_type", type:"single", title:"What best describes your home?", options:[
            {value:"house", label:"Single-family home"},
            {value:"townhome", label:"Townhome / condo"},
            {value:"basement", label:"Home with basement"},
            {value:"other", label:"Other / not sure"}
          ]},
          {key:"occupants", type:"single", title:"Any sensitivities in the home?", help:"This helps decide how aggressive to be with filtration/purification.", options:[
            {value:"none", label:"No major sensitivities"},
            {value:"allergies", label:"Allergies/asthma"},
            {value:"baby", label:"Baby/young kids"},
            {value:"immune", label:"Immunocompromised"},
            {value:"multiple", label:"More than one of these"}
          ]}
        ],
        side:[
          {title:"Good better best", body:"Most homes benefit from a basic foundation: water test + quality filtration + a plan for humidity. Higher tiers add purification and specialty treatment when symptoms demand it."}
        ]
      },

      /* WATER LAYER */
      {
        id:"water_symptoms",
        showIf:{any:[{q:"primary_focus", has:"water"},{q:"primary_focus", has:"maintenance"}]},
        title:"Water: symptoms and clues",
        lead:"Start with what you see, taste, or feel. We’ll map these to likely causes.",
        blocks:[
          {type:"text", html:"<div class='tile'><strong>What the symptoms usually mean</strong><p>Hardness causes scale and spotting. Sediment causes grit and cloudy water. Chlorine/odor often points to municipal disinfection and plumbing interactions.</p></div>"},
          {type:"video", title:"Hard water in Utah - what it does", caption:"Short education video.", embedUrl:"https://www.youtube.com/embed/VIDEO_ID"}
        ],
        questions:[
          {key:"water_symptoms", type:"multi", title:"Which water issues do you notice?", options:[
            {value:"taste", label:"Bad taste or chlorine smell", meta:"Drinking water isn’t enjoyable"},
            {value:"hard", label:"Hard water / scale buildup", meta:"White crust on fixtures, soap doesn’t lather"},
            {value:"stains", label:"Staining or spotting", meta:"On sinks, tubs, toilets, dishes"},
            {value:"sediment", label:"Sediment / cloudiness", meta:"Grit, particles, brown tint"},
            {value:"skin", label:"Dry skin / itchy after showers", meta:"Can be hardness + dryness"},
            {value:"concerns", label:"Health concerns / unknown contaminants", meta:"Want a stronger safety plan"},
            {value:"none", label:"No major water issues", meta:"Still may want a baseline test"}
          ]},
          {key:"water_source", type:"single", title:"Water source", options:[
            {value:"city", label:"City/municipal"},
            {value:"well", label:"Private well"},
            {value:"mixed", label:"Not sure / mixed"},
          ]},
          {key:"water_priority", type:"single", title:"Primary goal", help:"This decides whether to start with drinking-water solutions or whole-home protection.", options:[
            {value:"drinking", label:"Better drinking water (taste + safety)"},
            {value:"wholehome", label:"Protect plumbing + fixtures (soft water)"},
            {value:"both", label:"Both drinking and whole-home"}
          ]}
        ],
        side:[
          {title:"Why a baseline test matters", body:"A simple water test prevents over-buying (treating problems you don’t have) and under-buying (missing a hidden issue)."}
        ]
      },
      {
        id:"water_details",
        showIf:{any:[{q:"water_symptoms", truthy:true},{q:"water_priority", truthy:true}]},
        title:"Water: home details",
        lead:"These details help us size and select the right system.",
        blocks:[
{type:"video", title:"Choosing whole-home vs drinking water solutions", caption:"Explain when a softener/whole-home filter matters vs when RO alone is enough.", embedUrl:"https://www.youtube.com/embed/VIDEO_ID"},
{type:"text", html:"<div><div class='tile' style='margin-top:10px;'><strong>If I only fix one thing, what should it be?</strong><p>If hardness/scale is damaging fixtures and appliances, softening is often the biggest overall protection step. If taste is the main issue, drinking water solutions may be the best first move.</p></div><div class='tile' style='margin-top:10px;'><strong>Will filters reduce water pressure?</strong><p>Properly sized systems should maintain good flow. Undersized housings or clogged filters can reduce pressure - we match the system to your home and usage.</p></div></div>"},

          {type:"callout", title:"Sizing matters", body:"Softener size is based on hardness and household usage. RO and carbon depend on goals and contaminants."},
          {type:"text", html:"<div><div class='tile' style='margin-top:10px;'><strong>What if I don’t know hardness?</strong><p>That’s fine - the guide will keep the recommendation at a safe baseline and mark sizing as confirm-in-home.</p></div><div class='tile' style='margin-top:10px;'><strong>What’s the difference between carbon and RO?</strong><p>Carbon improves taste/odor and some chemicals for the whole home. RO is a drinking-water system that removes a wider range of dissolved contaminants.</p></div></div>"},
          {key:"water_hardness_known", type:"single", title:"Do you know your water hardness (grains per gallon)?", options:[
            {value:"no", label:"No / not sure"},
            {value:"low", label:"0-5 (low)"},
            {value:"med", label:"6-10 (moderate)"},
            {value:"high", label:"11-20 (hard)"},
            {value:"vhigh", label:"20+ (very hard)"}
          ]},
          {key:"water_need_ro", type:"single", title:"Do you want a dedicated drinking water system (RO)?", options:[
            {value:"yes", label:"Yes - taste + safety"},
            {value:"maybe", label:"Maybe - if recommended"},
            {value:"no", label:"No - whole-home focus"}
          ]}
        ]
      },

      /* AIR LAYER */
      {
        id:"air_symptoms",
        showIf:{any:[{q:"primary_focus", has:"air"},{q:"primary_focus", has:"comfort"}]},
        title:"Air: symptoms and triggers",
        lead:"We’ll identify what’s driving dust, allergies, odors, or dryness.",
        blocks:[
          {type:"video", title:"Dust, allergies, and filters - what actually helps", caption:"Replace VIDEO_ID.", embedUrl:"https://www.youtube.com/embed/VIDEO_ID"},
          {type:"text", html:"<div><div class='tile' style='margin-top:10px;'><strong>Will a better filter fix allergies?</strong><p>Sometimes. The biggest win is sealing bypass air and using a deeper media cabinet so airflow stays healthy.</p></div><div class='tile' style='margin-top:10px;'><strong>Do UV lights help?</strong><p>They can help for coil bio-growth and microbial control, but the best combo depends on humidity and system conditions.</p></div></div>"},
          {key:"air_filter_now", type:"single", title:"Current filter style", options:[
            {value:"1in", label:"1-inch thin filter"},
            {value:"4in", label:"4-inch media filter"},
            {value:"unknown", label:"Not sure"}
          ]},
          {key:"air_smoke", type:"single", title:"Smoke/wildfire sensitivity?", options:[
            {value:"no", label:"Not a big issue"},
            {value:"some", label:"Sometimes"},
            {value:"yes", label:"Yes - I want strong protection"}
          ]}
        ],
        side:[
          {title:"Utah dust + inversions", body:"Most homes benefit from a sealed, deep filter setup. It catches more while keeping airflow healthier than forcing a restrictive 1-inch filter."}
        ]
      },
      {
        id:"air_details",
        showIf:{any:[{q:"air_issues", truthy:true},{q:"air_filter_now", truthy:true}]},
        title:"Air: home + HVAC details",
        lead:"We use these to decide filtration upgrades, purification add-ons, and humidity control.",
        blocks:[
{type:"video", title:"Filtration and airflow - what homeowners should know", caption:"Explain MERV ratings, bypass leakage, and why airflow matters for comfort and equipment life.", embedUrl:"https://www.youtube.com/embed/VIDEO_ID"},
{type:"checklist", title:"Signs you need more than a basic filter", items:[
  "Visible dust returns quickly after cleaning",
  "Family allergies/asthma triggers indoors",
  "Pets and odor issues",
  "Smoke season sensitivity",
  "Filters get dirty unusually fast"
]},

          {type:"callout", title:"Bypass air is common", body:"If the system pulls air around the filter, even an expensive filter won’t work well. Sealing and cabinet upgrades often beat “higher MERV” alone."}
        ],
        questions:[
          {key:"air_duct_leaks", type:"single", title:"Do you suspect duct leaks or dusty returns?", options:[
            {value:"no", label:"No / not sure"},
            {value:"maybe", label:"Maybe"},
            {value:"yes", label:"Yes (dusty returns, attic smell, hot/cold rooms)"}
          ]},
          {key:"air_humidity_score", type:"slider", title:"Dryness level in winter", help:"0 = fine, 10 = very dry (nosebleeds, cracked skin).", min:0, max:10, step:1, suffix:"/10"},
          {key:"air_basement_musty", type:"single", title:"Basement or musty smell?", options:[
            {value:"no", label:"No"},
            {value:"some", label:"Sometimes"},
            {value:"yes", label:"Yes - musty or damp"}
          ]}
        ]
      },

      /* COMFORT / HVAC LAYER */
      {
        id:"comfort",
        showIf:{any:[{q:"primary_focus", has:"comfort"}]},
        title:"Comfort: hot/cold rooms, airflow, and equipment strain",
        lead:"Comfort issues often signal airflow, duct, or humidity problems - and they impact air quality too.",
        blocks:[
          {type:"video", title:"Airflow basics: why rooms run hot or cold", caption:"Replace VIDEO_ID.", embedUrl:"https://www.youtube.com/embed/VIDEO_ID"},
          {type:"text", html:"<div><div class='tile' style='margin-top:10px;'><strong>Is this a replacement quote?</strong><p>This guide can flag when replacement may be near, but it’s not a full load calculation. For equipment quotes, schedule an in-home assessment.</p></div><div class='tile' style='margin-top:10px;'><strong>Can I fix comfort without replacing the system?</strong><p>Often yes. Return leaks, balancing, and filtration cabinet upgrades can reduce hotspots and keep airflow healthy.</p></div></div>"},
          {key:"system_age", type:"single", title:"Approximate system age", options:[
            {value:"0-5", label:"0-5 years"},
            {value:"6-10", label:"6-10 years"},
            {value:"11-15", label:"11-15 years"},
            {value:"16+", label:"16+ years"},
            {value:"unknown", label:"Not sure"}
          ]}
        ]
      },

      /* REVIEW */
      {
        id:"review",
        title:"Review: your recommended plan",
        lead:"This is your best-fit bundle based on your answers. You can add everything to your cart, or schedule an in-home confirmation.",
        isReview:true,
        blocks:[
{type:"callout", title:"Adjust your bundle before checkout", body:"Remove any items you don’t want from the recommendation list. The estimated total updates instantly. Quote-only items indicate we recommend a quick verification step."},
{type:"video", title:"How to read your final plan", caption:"Replace VIDEO_ID with a short recap video.", embedUrl:"https://www.youtube.com/embed/VIDEO_ID"},

          {type:"callout", title:"Next step options", body:"If you want the most accurate plan, schedule an in-home visit. If you’re ready, add the recommended bundle to your cart and we’ll follow up."},
          {type:"text", html:"<div><div class='tile' style='margin-top:10px;'><strong>What if I want a smaller bundle?</strong><p>Reset and answer with lower sensitivity/priority, or remove items from your cart after adding.</p></div><div class='tile' style='margin-top:10px;'><strong>What if I want the strongest protection?</strong><p>Choose stronger sensitivities (allergies, smoke), and mark health concerns or odors. The guide will build a higher tier.</p></div></div>"}, addProducts:["water_test"], addNotes:["Baseline water test helps confirm hardness, chlorine, and treatment priorities."] },

      // Water symptoms mapping
      { when:{any:[{q:"water_symptoms", has:"hard"},{q:"water_symptoms", has:"stains"},{q:"water_symptoms", has:"skin"}]}, addProducts:["water_softener"], addNotes:["Hardness/scale issues typically improve most with a correctly sized water softener."], addExplainers:[{title:"Hardness and scale", body:"Hard water leaves mineral deposits that damage fixtures and reduce water heater efficiency. A softener protects plumbing and improves soap performance."}] },
      { when:{any:[{q:"water_symptoms", has:"sediment"}]}, addProducts:["water_sediment"], addExplainers:[{title:"Sediment control", body:"Sediment filters protect valves and appliances and prevent grit in faucets. This is often step 1 before carbon or softening."}] },
      { when:{any:[{q:"water_symptoms", has:"taste"},{q:"water_symptoms", has:"concerns"}]}, addProducts:["water_wholehome_carbon"], addExplainers:[{title:"Carbon filtration", body:"Whole-home carbon reduces chlorine taste/odor and can improve shower and laundry experience."}] },

      // RO decision
      { when:{any:[{q:"water_need_ro", eq:"yes"},{q:"water_priority", eq:"drinking"},{q:"water_priority", eq:"both"}]}, addProducts:["water_ro_system"], addExplainers:[{title:"Reverse Osmosis (RO)", body:"RO is a dedicated drinking-water system that reduces many dissolved contaminants and dramatically improves taste."}] },

      // High concern adds UV option (especially for well)
      { when:{all:[{q:"water_source", eq:"well"},{q:"water_symptoms", has:"concerns"}]}, addProducts:["water_uv_disinfection"], addNotes:["Well water with health concerns often benefits from UV as a final disinfection step."], addExplainers:[{title:"UV disinfection", body:"UV can inactivate microorganisms. It’s not a sediment filter - it works best with pre-filtration."}] },

      // Air rules
      { when:{any:[{q:"air_filter_now", eq:"1in"},{q:"air_issues", has:"dust"},{q:"air_issues", has:"allergies"}]}, addProducts:["air_4in_filter_upgrade"], addNotes:["Upgrading to a 4-inch media cabinet improves capture while keeping airflow healthier."], addExplainers:[{title:"Why 4-inch media filters", body:"More surface area means less restriction and better real-world performance than forcing a high-MERV 1-inch filter."}] },
      { when:{any:[{q:"air_issues", has:"allergies"},{q:"occupants", in:["allergies","immune","multiple"]}]}, addProducts:["air_purifier_addon"], addExplainers:[{title:"Layering filtration + purification", body:"Filtration captures particles. Purification targets smaller pollutants and can help with odors and microbial concerns."}] },
      { when:{any:[{q:"air_issues", has:"odors"},{q:"air_smoke", eq:"yes"}]}, addProducts:["air_reme_halo"], addExplainers:[{title:"Odors and smoke", body:"Odors often respond to ventilation plus purification. Strong smoke sensitivity usually benefits from higher-tier air cleaning."}] },
      { when:{any:[{q:"air_duct_leaks", eq:"yes"},{q:"comfort_symptoms", has:"hotcold"}]}, addProducts:["air_duct_seal_check"], addNotes:["If ducts leak, filtration and comfort both suffer. Sealing/return fixes can be a major win."] },

      // Humidity
      { when:{any:[{q:"air_humidity_score", gte:7},{q:"air_issues", has:"dry"}]}, addProducts:["air_humidifier"], addExplainers:[{title:"Winter dryness", body:"Balanced humidity can reduce static, dry skin, and nasal irritation. Proper setup prevents over-humidification."}] },
      { when:{any:[{q:"air_basement_musty", eq:"yes"},{q:"air_issues", has:"humidity"}]}, addProducts:["air_dehumidifier"], addExplainers:[{title:"Musty / humid homes", body:"Dehumidification reduces musty odor drivers, improves comfort, and can help discourage microbial growth."}] },

      // Comfort flags (quote-only assessments)
      { when:{all:[{q:"system_age", in:["16+","unknown"]},{q:"comfort_symptoms", truthy:true}]}, addQuoteOnly:["air_dust"], addNotes:["Older systems with comfort issues often benefit from a full airflow and duct evaluation before upgrades."] },
    ]
  };

  window.HWA_FLOWS = window.HWA_FLOWS || {};
  window.HWA_FLOWS.home = Flow;
})();
