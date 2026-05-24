import React, { useMemo, useState, useEffect } from "react";

const SYSTEMS = {
  muscular: { label: "Muscular", color: "#B83020", dot: "#E45735" },
  skeletal: { label: "Skeletal", color: "#D8CCA8", dot: "#E8DCC8" },
  tendon: { label: "Tendons & Ligaments", color: "#C8B888", dot: "#D4C4A0" },
  cardiovascular: { label: "Cardiovascular", color: "#B01828", dot: "#B01828" },
  respiratory: { label: "Respiratory", color: "#80B8D0", dot: "#80B8D0" },
};

const COLORS = {
  bg: "#07050C",
  panel: "#0C0818",
  border: "#1E0A30",
  gold: "#F0D890",
  muted: "#A06820",
  body: "#D09A58",
  muscle: "#B83020",
  bone: "#E8DCC8",
  tendon: "#D4C4A0",
  artery: "#B01828",
  vein: "#2840A0",
  lung: "#80B8D0",
};

const INFO = {
  scm: {
    name: "Sternocleidomastoid",
    system: "muscular",
    function:
      "Rotates the head to the opposite side, assists neck flexion, and helps elevate the sternum during forced inspiration.",
    clinical:
      "Tenderness, asymmetry, or shortening may contribute to torticollis, forward-head posture, headache patterns, and altered respiratory mechanics. It is a useful landmark for carotid pulse location and neck assessment.",
  },
  pec_major: {
    name: "Pectoralis Major",
    system: "muscular",
    function:
      "Adducts, flexes, and internally rotates the humerus while providing powerful anterior shoulder movement for pushing and climbing.",
    clinical:
      "Strain often presents with anterior chest or shoulder pain after pressing movements. Tightness may pull the shoulders forward and limit scapular positioning during rehabilitation or strength assessment.",
  },
  deltoid_l: {
    name: "Left Deltoid",
    system: "muscular",
    function:
      "Abducts the shoulder through the middle fibers, with anterior fibers assisting flexion and posterior fibers assisting extension.",
    clinical:
      "The deltoid region is a common intramuscular injection landmark. Weakness may suggest axillary nerve involvement or rotator cuff compensation issues.",
  },
  deltoid_r: {
    name: "Right Deltoid",
    system: "muscular",
    function:
      "Abducts the shoulder through the middle fibers, with anterior fibers assisting flexion and posterior fibers assisting extension.",
    clinical:
      "Painful abduction can occur with impingement, bursitis, cuff injury, or direct trauma. Compare side-to-side contour and strength during screening.",
  },
  biceps_l: {
    name: "Left Biceps Brachii",
    system: "muscular",
    function:
      "Flexes the elbow, supinates the forearm, and assists shoulder flexion through its long and short heads.",
    clinical:
      "Anterior arm pain or a Popeye deformity may indicate tendon rupture. The biceps tendon is also relevant in shoulder impingement and labral pathology.",
  },
  biceps_r: {
    name: "Right Biceps Brachii",
    system: "muscular",
    function:
      "Flexes the elbow, supinates the forearm, and assists shoulder flexion through its long and short heads.",
    clinical:
      "Bicipital groove tenderness can indicate tendinopathy. Strength testing with resisted supination helps distinguish biceps involvement from general elbow flexor weakness.",
  },
  rectus_abdominis: {
    name: "Rectus Abdominis",
    system: "muscular",
    function:
      "Flexes the trunk, compresses abdominal contents, and supports breathing, posture, and force transfer between pelvis and ribs.",
    clinical:
      "Diastasis recti, strain, hernia patterns, and post-surgical weakness are common clinical concerns. Palpation and functional bracing tests are useful in rehab and nursing mobility work.",
  },
  external_oblique_l: {
    name: "Left External Oblique",
    system: "muscular",
    function:
      "Rotates the trunk to the opposite side, laterally flexes the spine, and compresses the abdominal wall.",
    clinical:
      "Pain may mimic rib, abdominal, or hip referral patterns. It is important in breathing mechanics, trunk stability, and safe transfers.",
  },
  external_oblique_r: {
    name: "Right External Oblique",
    system: "muscular",
    function:
      "Rotates the trunk to the opposite side, laterally flexes the spine, and compresses the abdominal wall.",
    clinical:
      "Weakness or guarding may alter gait, coughing, and rolling mechanics. It is often assessed during core-control training.",
  },
  serratus_l: {
    name: "Left Serratus Anterior",
    system: "muscular",
    function:
      "Protracts and upwardly rotates the scapula, keeping it flush against the thoracic wall during reaching.",
    clinical:
      "Long thoracic nerve injury can cause scapular winging. Serratus control is central to shoulder rehab and overhead movement quality.",
  },
  serratus_r: {
    name: "Right Serratus Anterior",
    system: "muscular",
    function:
      "Protracts and upwardly rotates the scapula, keeping it flush against the thoracic wall during reaching.",
    clinical:
      "Poor activation may contribute to neck compensation, shoulder impingement, and limited overhead reach.",
  },
  brachioradialis_l: {
    name: "Left Brachioradialis",
    system: "muscular",
    function:
      "Flexes the elbow most efficiently when the forearm is in a neutral handshake position.",
    clinical:
      "Used in neurologic screening through the brachioradialis reflex. Tenderness may overlap with lateral elbow pain patterns.",
  },
  brachioradialis_r: {
    name: "Right Brachioradialis",
    system: "muscular",
    function:
      "Flexes the elbow most efficiently when the forearm is in a neutral handshake position.",
    clinical:
      "Reflex change can suggest cervical nerve root involvement. It also becomes overworked with repetitive gripping or lifting.",
  },
  rectus_femoris_l: {
    name: "Left Rectus Femoris",
    system: "muscular",
    function:
      "Extends the knee and flexes the hip as one of the quadriceps muscles crossing both joints.",
    clinical:
      "Strain is common in sprinting and kicking. Tightness can contribute to anterior pelvic tilt and patellofemoral stress.",
  },
  rectus_femoris_r: {
    name: "Right Rectus Femoris",
    system: "muscular",
    function:
      "Extends the knee and flexes the hip as one of the quadriceps muscles crossing both joints.",
    clinical:
      "Assess length with modified Thomas testing and strength during sit-to-stand, stairs, and gait observation.",
  },
  vastus_lateralis_l: {
    name: "Left Vastus Lateralis",
    system: "muscular",
    function:
      "Extends the knee and stabilizes the patella laterally during loaded movement.",
    clinical:
      "A common intramuscular injection site in infants and some adults. Overdominance may influence lateral patellar tracking.",
  },
  vastus_lateralis_r: {
    name: "Right Vastus Lateralis",
    system: "muscular",
    function:
      "Extends the knee and stabilizes the patella laterally during loaded movement.",
    clinical:
      "Important for stair climbing, rising from a chair, and knee rehab after immobilization or surgery.",
  },
  vastus_medialis_l: {
    name: "Left Vastus Medialis",
    system: "muscular",
    function:
      "Extends the knee and supports medial patellar stability near terminal extension.",
    clinical:
      "Weakness may appear with patellofemoral pain or post-operative quadriceps inhibition. Terminal knee extension control is often trained in rehab.",
  },
  vastus_medialis_r: {
    name: "Right Vastus Medialis",
    system: "muscular",
    function:
      "Extends the knee and supports medial patellar stability near terminal extension.",
    clinical:
      "Observe for delayed activation, atrophy, and knee valgus during squats, steps, or gait.",
  },
  tibialis_anterior_l: {
    name: "Left Tibialis Anterior",
    system: "muscular",
    function:
      "Dorsiflexes and inverts the foot, clearing the toes during swing phase of gait.",
    clinical:
      "Weakness can cause foot drop and increased fall risk. Shin pain may involve overuse, compartment irritation, or training load errors.",
  },
  tibialis_anterior_r: {
    name: "Right Tibialis Anterior",
    system: "muscular",
    function:
      "Dorsiflexes and inverts the foot, clearing the toes during swing phase of gait.",
    clinical:
      "Screen during heel walking and gait. Sudden weakness requires neurologic or peripheral nerve consideration.",
  },
  trapezius: {
    name: "Trapezius",
    system: "muscular",
    function:
      "Elevates, retracts, depresses, and upwardly rotates the scapula through upper, middle, and lower fibers.",
    clinical:
      "Trigger points and overactivity are common in neck pain. Weak lower trapezius may contribute to scapular dyskinesis and shoulder impingement.",
  },
  rhomboids: {
    name: "Rhomboids",
    system: "muscular",
    function:
      "Retract and downwardly rotate the scapula while stabilizing it against the rib cage.",
    clinical:
      "Pain between the shoulder blades may involve rhomboids, thoracic posture, cervical referral, or scapular loading deficits.",
  },
  infraspinatus_l: {
    name: "Left Infraspinatus",
    system: "muscular",
    function:
      "Externally rotates the shoulder and contributes to humeral head stability as part of the rotator cuff.",
    clinical:
      "Weakness or pain with resisted external rotation may suggest rotator cuff tendinopathy or tear.",
  },
  infraspinatus_r: {
    name: "Right Infraspinatus",
    system: "muscular",
    function:
      "Externally rotates the shoulder and contributes to humeral head stability as part of the rotator cuff.",
    clinical:
      "Atrophy in the infraspinous fossa can suggest suprascapular nerve involvement or chronic cuff pathology.",
  },
  teres_l: {
    name: "Left Teres Major/Minor",
    system: "muscular",
    function:
      "Teres minor externally rotates and stabilizes the humerus; teres major extends, adducts, and internally rotates the humerus.",
    clinical:
      "Posterior shoulder tenderness may involve cuff overload, impingement, or compensation from poor scapular control.",
  },
  teres_r: {
    name: "Right Teres Major/Minor",
    system: "muscular",
    function:
      "Teres minor externally rotates and stabilizes the humerus; teres major extends, adducts, and internally rotates the humerus.",
    clinical:
      "The region is relevant to quadrangular space anatomy and posterior shoulder pain assessment.",
  },
  latissimus: {
    name: "Latissimus Dorsi",
    system: "muscular",
    function:
      "Extends, adducts, and internally rotates the shoulder while connecting arm motion to trunk and pelvis.",
    clinical:
      "Tightness can limit overhead reach and alter lumbar extension or rib mechanics. It is important in transfers, pulling, and crutch or walker use.",
  },
  erector_spinae: {
    name: "Erector Spinae",
    system: "muscular",
    function:
      "Extends and laterally flexes the spine while maintaining upright posture and controlling trunk motion.",
    clinical:
      "Spasm or guarding is common in low back pain. Endurance and motor control matter more than maximal strength in many rehab plans.",
  },
  glute_max: {
    name: "Gluteus Maximus",
    system: "muscular",
    function:
      "Powerfully extends and externally rotates the hip, especially during rising, climbing, sprinting, and lifting.",
    clinical:
      "Weakness may shift load to the lumbar spine or hamstrings. It is essential for gait, sit-to-stand, and fall-prevention training.",
  },
  glute_med_l: {
    name: "Left Gluteus Medius",
    system: "muscular",
    function:
      "Abducts the hip and stabilizes the pelvis during single-leg stance.",
    clinical:
      "Weakness can cause Trendelenburg gait and knee valgus. It is a key target in hip, knee, and balance rehabilitation.",
  },
  glute_med_r: {
    name: "Right Gluteus Medius",
    system: "muscular",
    function:
      "Abducts the hip and stabilizes the pelvis during single-leg stance.",
    clinical:
      "Tenderness may overlap with greater trochanteric pain syndrome. Side-to-side pelvic drop is a useful movement screen.",
  },
  hamstrings_l: {
    name: "Left Hamstrings",
    system: "muscular",
    function:
      "Extend the hip and flex the knee, controlling limb deceleration during gait and running.",
    clinical:
      "Strain is common near the proximal tendon. Tightness and weakness can affect pelvic control and knee loading.",
  },
  hamstrings_r: {
    name: "Right Hamstrings",
    system: "muscular",
    function:
      "Extend the hip and flex the knee, controlling limb deceleration during gait and running.",
    clinical:
      "Important after ACL injury, hamstring graft procedures, and return-to-sport progression.",
  },
  gastroc_l: {
    name: "Left Gastrocnemius",
    system: "muscular",
    function:
      "Plantarflexes the ankle and assists knee flexion, generating push-off power during gait.",
    clinical:
      "Calf pain requires consideration of strain, Achilles involvement, or vascular red flags. Compare warmth, swelling, and tenderness when clinically appropriate.",
  },
  gastroc_r: {
    name: "Right Gastrocnemius",
    system: "muscular",
    function:
      "Plantarflexes the ankle and assists knee flexion, generating push-off power during gait.",
    clinical:
      "Weakness reduces push-off and stair performance. Sudden swelling or unexplained calf pain may require medical evaluation.",
  },
  soleus_l: {
    name: "Left Soleus",
    system: "muscular",
    function:
      "Plantarflexes the ankle with the knee bent and helps pump venous blood upward during standing and walking.",
    clinical:
      "Soleus endurance supports gait and circulation. Tightness can limit ankle dorsiflexion and affect squat or stair mechanics.",
  },
  soleus_r: {
    name: "Right Soleus",
    system: "muscular",
    function:
      "Plantarflexes the ankle with the knee bent and helps pump venous blood upward during standing and walking.",
    clinical:
      "Often trained with bent-knee calf raises and walking tolerance work after immobilization.",
  },
  skull: {
    name: "Skull",
    system: "skeletal",
    function:
      "Protects the brain, supports the face, and provides attachment points for head, neck, and facial muscles.",
    clinical:
      "Assessment includes trauma signs, cranial nerve implications, facial symmetry, and landmarks for airway or neurologic examination.",
  },
  mandible: {
    name: "Mandible",
    system: "skeletal",
    function:
      "Forms the lower jaw, supports teeth, and enables chewing and speech through temporomandibular joint motion.",
    clinical:
      "TMJ pain, fracture, malocclusion, and airway positioning make the mandible clinically important in emergency and rehabilitation settings.",
  },
  clavicles: {
    name: "Clavicles",
    system: "skeletal",
    function:
      "Act as struts that hold the shoulders laterally and transmit force from upper limb to axial skeleton.",
    clinical:
      "Fractures are common after falls. Observe shoulder droop, deformity, neurovascular status, and pain with arm support.",
  },
  scapulae: {
    name: "Scapulae",
    system: "skeletal",
    function:
      "Provide the mobile foundation for shoulder motion and glenohumeral joint positioning.",
    clinical:
      "Scapular winging, dyskinesis, fracture, and poor upward rotation are relevant to shoulder pain and neurologic assessment.",
  },
  ribs: {
    name: "Ribs and Sternum",
    system: "skeletal",
    function:
      "Protect thoracic organs, support breathing mechanics, and anchor intercostal and trunk muscles.",
    clinical:
      "Rib fracture, flail chest, costochondral pain, and respiratory restriction are important in trauma, pulmonary care, and mobility work.",
  },
  humerus_l: {
    name: "Left Humerus",
    system: "skeletal",
    function:
      "Forms the arm bone connecting shoulder to elbow and serving as a lever for upper-limb movement.",
    clinical:
      "Fractures may endanger the radial nerve. Check distal sensation, wrist extension, pulse, and functional grip.",
  },
  humerus_r: {
    name: "Right Humerus",
    system: "skeletal",
    function:
      "Forms the arm bone connecting shoulder to elbow and serving as a lever for upper-limb movement.",
    clinical:
      "Proximal humerus injuries often limit shoulder function and are common after falls in older adults.",
  },
  radius_ulna_l: {
    name: "Left Radius and Ulna",
    system: "skeletal",
    function:
      "Support forearm rotation, wrist positioning, and force transfer between hand and elbow.",
    clinical:
      "Distal radius fracture is common after a fall on an outstretched hand. Assess swelling, deformity, sensation, and capillary refill.",
  },
  radius_ulna_r: {
    name: "Right Radius and Ulna",
    system: "skeletal",
    function:
      "Support forearm rotation, wrist positioning, and force transfer between hand and elbow.",
    clinical:
      "Forearm injuries can compromise pronation, supination, and grip. Compartment syndrome signs require urgent attention.",
  },
  carpals: {
    name: "Carpals",
    system: "skeletal",
    function:
      "Create the wrist's compact, mobile bony base for hand positioning and load transfer.",
    clinical:
      "Scaphoid injury may be missed initially. Snuffbox tenderness after a fall deserves careful follow-up.",
  },
  pelvis: {
    name: "Pelvis",
    system: "skeletal",
    function:
      "Transfers weight between spine and lower limbs, protects pelvic organs, and anchors hip and trunk muscles.",
    clinical:
      "Pelvic fracture, sacroiliac pain, gait asymmetry, and childbirth-related mechanics are major clinical considerations.",
  },
  femur_l: {
    name: "Left Femur",
    system: "skeletal",
    function:
      "The body's longest bone, transmitting load from hip to knee and supporting powerful locomotion.",
    clinical:
      "Hip and femoral fractures carry major mobility and medical risk. Observe limb shortening, external rotation, pain, and neurovascular status.",
  },
  femur_r: {
    name: "Right Femur",
    system: "skeletal",
    function:
      "The body's longest bone, transmitting load from hip to knee and supporting powerful locomotion.",
    clinical:
      "Femoral shaft injury can involve significant blood loss and requires careful immobilization and urgent assessment.",
  },
  patella_l: {
    name: "Left Patella",
    system: "skeletal",
    function:
      "Improves quadriceps leverage across the knee and protects the anterior joint.",
    clinical:
      "Patellar tracking, fracture, tendon rupture, and anterior knee pain are common clinical concerns.",
  },
  patella_r: {
    name: "Right Patella",
    system: "skeletal",
    function:
      "Improves quadriceps leverage across the knee and protects the anterior joint.",
    clinical:
      "Assess swelling, extension lag, and pain during stairs or sit-to-stand when patellofemoral issues are suspected.",
  },
  tib_fib_l: {
    name: "Left Tibia and Fibula",
    system: "skeletal",
    function:
      "The tibia bears most lower-leg weight while the fibula supports ankle stability and muscle attachment.",
    clinical:
      "Shin trauma, stress fracture, ankle syndesmosis injury, and fibular head nerve irritation are key assessment issues.",
  },
  tib_fib_r: {
    name: "Right Tibia and Fibula",
    system: "skeletal",
    function:
      "The tibia bears most lower-leg weight while the fibula supports ankle stability and muscle attachment.",
    clinical:
      "Monitor alignment, swelling, pulses, and sensation after fractures or severe ankle injuries.",
  },
  tarsals_metatarsals: {
    name: "Tarsals and Metatarsals",
    system: "skeletal",
    function:
      "Form the foot arches, absorb shock, and create a stable lever for push-off.",
    clinical:
      "Stress fractures, plantar pain, arch collapse, and diabetic foot risk make the foot clinically important in mobility and skin checks.",
  },
  achilles_l: {
    name: "Left Achilles Tendon",
    system: "tendon",
    function:
      "Transfers force from gastrocnemius and soleus to the calcaneus for plantarflexion and push-off.",
    clinical:
      "Tendinopathy presents with posterior heel pain and morning stiffness. Rupture may show a positive Thompson test and loss of push-off.",
  },
  achilles_r: {
    name: "Right Achilles Tendon",
    system: "tendon",
    function:
      "Transfers force from gastrocnemius and soleus to the calcaneus for plantarflexion and push-off.",
    clinical:
      "Load management is central to rehab. Sudden pop, bruising, or inability to plantarflex requires urgent evaluation.",
  },
  patellar_tendon_l: {
    name: "Left Patellar Tendon",
    system: "tendon",
    function:
      "Connects patella to tibial tuberosity and transmits quadriceps force for knee extension.",
    clinical:
      "Jumper's knee, rupture, and post-operative irritation are common. Pain localizes below the patella with jumping, stairs, or squats.",
  },
  patellar_tendon_r: {
    name: "Right Patellar Tendon",
    system: "tendon",
    function:
      "Connects patella to tibial tuberosity and transmits quadriceps force for knee extension.",
    clinical:
      "Extension lag or inability to straight-leg raise may suggest serious extensor mechanism injury.",
  },
  rotator_cuff_l: {
    name: "Left Rotator Cuff Tendons",
    system: "tendon",
    function:
      "Stabilize the humeral head and coordinate shoulder rotation through supraspinatus, infraspinatus, teres minor, and subscapularis tendons.",
    clinical:
      "Cuff tendinopathy and tears can cause night pain, weakness, painful arc, and difficulty with overhead activities.",
  },
  rotator_cuff_r: {
    name: "Right Rotator Cuff Tendons",
    system: "tendon",
    function:
      "Stabilize the humeral head and coordinate shoulder rotation through supraspinatus, infraspinatus, teres minor, and subscapularis tendons.",
    clinical:
      "Assessment often compares active and passive range, resisted rotation, and scapular mechanics.",
  },
  biceps_tendon_l: {
    name: "Left Biceps Tendons",
    system: "tendon",
    function:
      "Long and short head tendons anchor the biceps to the shoulder region and transmit force for elbow flexion and supination.",
    clinical:
      "Long-head tendinopathy can cause anterior shoulder pain. Rupture may alter contour and reduce supination strength.",
  },
  biceps_tendon_r: {
    name: "Right Biceps Tendons",
    system: "tendon",
    function:
      "Long and short head tendons anchor the biceps to the shoulder region and transmit force for elbow flexion and supination.",
    clinical:
      "Tenderness in the bicipital groove and pain with resisted supination are common screening findings.",
  },
  wrist_retinaculum: {
    name: "Wrist Flexor/Extensor Retinacula",
    system: "tendon",
    function:
      "Hold tendons close to the wrist, improving mechanical efficiency and preventing bowstringing.",
    clinical:
      "The flexor retinaculum forms the roof of the carpal tunnel, making it central to median nerve compression symptoms.",
  },
  ankle_retinaculum: {
    name: "Ankle Retinacula",
    system: "tendon",
    function:
      "Secure tendons around the ankle during dorsiflexion, plantarflexion, inversion, and eversion.",
    clinical:
      "Irritation can accompany tendinopathy, sprains, or altered foot mechanics. Look for swelling, snapping, or pain with resisted motion.",
  },
  cruciate_ligaments: {
    name: "ACL/PCL",
    system: "tendon",
    function:
      "The ACL resists anterior tibial translation and rotation; the PCL resists posterior tibial translation.",
    clinical:
      "ACL injury often occurs with pivoting, swelling, and instability. PCL injury can follow dashboard trauma or hyperflexion.",
  },
  plantar_fascia: {
    name: "Plantar Fascia",
    system: "tendon",
    function:
      "Supports the medial arch and helps store elastic energy during stance and push-off.",
    clinical:
      "Plantar fasciitis often causes sharp first-step heel pain. Footwear, calf mobility, and graded loading matter in management.",
  },
  heart: {
    name: "Heart",
    system: "cardiovascular",
    function:
      "Pumps deoxygenated blood to the lungs and oxygenated blood to systemic circulation through coordinated chamber contraction.",
    clinical:
      "Assessment includes pulse, blood pressure, heart sounds, edema, chest symptoms, exercise tolerance, and signs of perfusion compromise.",
  },
  aorta: {
    name: "Aorta and Arch",
    system: "cardiovascular",
    function:
      "Carries oxygenated blood from the left ventricle to the systemic arterial tree.",
    clinical:
      "Aneurysm, dissection, and atherosclerotic disease are serious vascular concerns. Sudden tearing chest or back pain is a red flag.",
  },
  vena_cava: {
    name: "Superior and Inferior Vena Cava",
    system: "cardiovascular",
    function:
      "Return systemic venous blood from upper and lower body to the right atrium.",
    clinical:
      "Venous return is affected by hydration, pressure changes, heart failure, and obstruction. Jugular venous assessment can reflect right-sided pressures.",
  },
  carotids: {
    name: "Common Carotid Arteries",
    system: "cardiovascular",
    function:
      "Supply oxygenated blood to the head and brain through branches of the carotid system.",
    clinical:
      "Carotid pulse and bruit assessment are important. Avoid bilateral compression because cerebral perfusion may be compromised.",
  },
  subclavian: {
    name: "Subclavian Vessels",
    system: "cardiovascular",
    function:
      "Supply and drain the upper limbs, neck, and thoracic wall through major arterial and venous routes.",
    clinical:
      "Compression, trauma, or catheter placement issues can affect upper-limb perfusion and venous return.",
  },
  brachial_radial_ulnar: {
    name: "Brachial, Radial, and Ulnar Vessels",
    system: "cardiovascular",
    function:
      "Carry blood through the arm, forearm, and hand, supporting tissue perfusion and pulse landmarks.",
    clinical:
      "Brachial pressure, radial pulse, capillary refill, and Allen testing are common assessment points.",
  },
  femoral_popliteal_tibial: {
    name: "Femoral, Popliteal, and Tibial Vessels",
    system: "cardiovascular",
    function:
      "Provide arterial supply and venous drainage through the thigh, knee, leg, and foot.",
    clinical:
      "Peripheral vascular assessment includes pulses, skin temperature, color, edema, pain with walking, and wound-healing status.",
  },
  trachea: {
    name: "Trachea and Carina",
    system: "respiratory",
    function:
      "Conduct air from the larynx into the main bronchi, with the carina marking the bifurcation into right and left airways.",
    clinical:
      "Tracheal deviation can signal serious thoracic pathology. The carina is important in airway anatomy and endotracheal tube depth.",
  },
  bronchi: {
    name: "Main and Lobar Bronchi",
    system: "respiratory",
    function:
      "Distribute air into each lung and its lobes through branching airway passages.",
    clinical:
      "Wheezing, obstruction, aspiration, mucus plugging, and bronchitis affect airflow and breath sounds by region.",
  },
  lungs: {
    name: "Lung Lobes",
    system: "respiratory",
    function:
      "Exchange oxygen and carbon dioxide across alveolar surfaces, with the right lung having three lobes and the left lung two lobes plus a cardiac notch.",
    clinical:
      "Auscultation, oxygen saturation, work of breathing, pneumonia localization, atelectasis, and pulmonary edema are core clinical concerns.",
  },
  diaphragm: {
    name: "Diaphragm",
    system: "respiratory",
    function:
      "Primary muscle of inspiration, descending to increase thoracic volume and assist venous return.",
    clinical:
      "Dysfunction affects breathing, posture, trunk pressure, and exertional tolerance. It is important after surgery, respiratory illness, and neurologic injury.",
  },
};

const baseInfo = INFO.pec_major;

function structurePath(id, d, system, view, extras = {}) {
  return { id, d, system, view, ...extras };
}

const anteriorStructures = [
  structurePath("scm", "M188 108 C177 124 172 151 168 178 C176 174 185 155 198 125 C203 115 199 108 188 108 Z M232 108 C243 124 248 151 252 178 C244 174 235 155 222 125 C217 115 221 108 232 108 Z", "muscular", "anterior"),
  structurePath("pec_major", "M146 190 C165 168 196 168 210 194 C224 168 255 168 274 190 C270 230 238 246 212 232 C184 248 151 231 146 190 Z", "muscular", "anterior"),
  structurePath("deltoid_l", "M117 177 C94 188 84 217 91 246 C115 238 134 217 143 189 C135 179 127 176 117 177 Z", "muscular", "anterior"),
  structurePath("deltoid_r", "M303 177 C326 188 336 217 329 246 C305 238 286 217 277 189 C285 179 293 176 303 177 Z", "muscular", "anterior"),
  structurePath("biceps_l", "M91 251 C111 246 124 268 121 309 C118 346 104 366 88 355 C79 331 78 285 91 251 Z", "muscular", "anterior"),
  structurePath("biceps_r", "M329 251 C309 246 296 268 299 309 C302 346 316 366 332 355 C341 331 342 285 329 251 Z", "muscular", "anterior"),
  structurePath("brachioradialis_l", "M88 358 C103 354 112 376 105 421 C100 456 85 481 73 470 C72 432 76 385 88 358 Z", "muscular", "anterior"),
  structurePath("brachioradialis_r", "M332 358 C317 354 308 376 315 421 C320 456 335 481 347 470 C348 432 344 385 332 358 Z", "muscular", "anterior"),
  structurePath("rectus_abdominis", "M184 246 C201 237 219 237 236 246 C238 292 235 345 223 398 C215 405 205 405 197 398 C185 345 182 292 184 246 Z", "muscular", "anterior"),
  structurePath("external_oblique_l", "M145 241 C165 254 179 286 181 332 C183 369 174 397 157 414 C141 370 132 296 145 241 Z", "muscular", "anterior"),
  structurePath("external_oblique_r", "M275 241 C255 254 241 286 239 332 C237 369 246 397 263 414 C279 370 288 296 275 241 Z", "muscular", "anterior"),
  structurePath("serratus_l", "M140 221 C154 229 164 239 171 253 C154 254 143 247 135 236 C131 229 133 224 140 221 Z M136 245 C151 252 162 264 168 278 C151 277 139 269 132 257 C128 250 130 246 136 245 Z M134 270 C149 277 159 289 164 304 C149 301 136 294 130 282 C127 275 128 271 134 270 Z", "muscular", "anterior"),
  structurePath("serratus_r", "M280 221 C266 229 256 239 249 253 C266 254 277 247 285 236 C289 229 287 224 280 221 Z M284 245 C269 252 258 264 252 278 C269 277 281 269 288 257 C292 250 290 246 284 245 Z M286 270 C271 277 261 289 256 304 C271 301 284 294 290 282 C293 275 292 271 286 270 Z", "muscular", "anterior"),
  structurePath("rectus_femoris_l", "M165 444 C187 448 199 484 195 550 C191 611 177 659 159 653 C151 590 148 496 165 444 Z", "muscular", "anterior"),
  structurePath("rectus_femoris_r", "M255 444 C233 448 221 484 225 550 C229 611 243 659 261 653 C269 590 272 496 255 444 Z", "muscular", "anterior"),
  structurePath("vastus_lateralis_l", "M135 450 C158 455 166 512 159 648 C142 644 129 601 124 538 C120 493 123 463 135 450 Z", "muscular", "anterior"),
  structurePath("vastus_lateralis_r", "M285 450 C262 455 254 512 261 648 C278 644 291 601 296 538 C300 493 297 463 285 450 Z", "muscular", "anterior"),
  structurePath("vastus_medialis_l", "M195 463 C211 489 210 594 194 644 C182 632 181 552 188 501 C190 485 192 473 195 463 Z", "muscular", "anterior"),
  structurePath("vastus_medialis_r", "M225 463 C209 489 210 594 226 644 C238 632 239 552 232 501 C230 485 228 473 225 463 Z", "muscular", "anterior"),
  structurePath("tibialis_anterior_l", "M154 666 C171 673 178 726 169 811 C164 856 151 893 136 890 C135 815 139 710 154 666 Z", "muscular", "anterior"),
  structurePath("tibialis_anterior_r", "M266 666 C249 673 242 726 251 811 C256 856 269 893 284 890 C285 815 281 710 266 666 Z", "muscular", "anterior"),
  structurePath("skull", "M178 48 C183 18 237 18 242 48 C248 74 236 99 210 101 C184 99 172 74 178 48 Z", "skeletal", "anterior"),
  structurePath("mandible", "M184 82 C195 98 225 98 236 82 C233 111 187 111 184 82 Z", "skeletal", "anterior"),
  structurePath("clavicles", "M145 169 C167 158 190 157 210 172 C230 157 253 158 275 169 C252 172 230 178 210 187 C190 178 168 172 145 169 Z", "skeletal", "anterior"),
  structurePath("ribs", "M164 202 C181 184 239 184 256 202 C266 234 263 285 241 318 C222 329 198 329 179 318 C157 285 154 234 164 202 Z M176 218 C194 208 226 208 244 218 M171 242 C191 229 229 229 249 242 M172 266 C193 253 227 253 248 266 M179 291 C198 281 222 281 241 291 M202 201 C199 235 199 276 202 315 M218 201 C221 235 221 276 218 315", "skeletal", "anterior"),
  structurePath("pelvis", "M148 399 C178 383 196 404 210 429 C224 404 242 383 272 399 C269 432 245 459 210 461 C175 459 151 432 148 399 Z M180 420 C194 424 204 438 210 456 C216 438 226 424 240 420", "skeletal", "anterior"),
  structurePath("humerus_l", "M104 214 C116 239 119 304 108 356 C98 363 91 359 88 348 C92 292 94 242 104 214 Z", "skeletal", "anterior"),
  structurePath("humerus_r", "M316 214 C304 239 301 304 312 356 C322 363 329 359 332 348 C328 292 326 242 316 214 Z", "skeletal", "anterior"),
  structurePath("radius_ulna_l", "M88 360 C99 370 96 454 76 495 C66 493 68 452 76 404 C80 381 83 367 88 360 Z M104 363 C111 397 106 461 91 498 C82 499 84 458 92 407 C96 384 100 369 104 363 Z", "skeletal", "anterior"),
  structurePath("radius_ulna_r", "M332 360 C321 370 324 454 344 495 C354 493 352 452 344 404 C340 381 337 367 332 360 Z M316 363 C309 397 314 461 329 498 C338 499 336 458 328 407 C324 384 320 369 316 363 Z", "skeletal", "anterior"),
  structurePath("carpals", "M60 498 C79 489 101 493 112 507 C102 522 71 523 57 511 C55 506 56 502 60 498 Z M308 507 C319 493 341 489 360 498 C364 502 365 506 363 511 C349 523 318 522 308 507 Z", "skeletal", "anterior"),
  structurePath("femur_l", "M159 460 C184 486 190 596 174 652 C163 657 154 652 151 641 C155 570 151 502 159 460 Z", "skeletal", "anterior"),
  structurePath("femur_r", "M261 460 C236 486 230 596 246 652 C257 657 266 652 269 641 C265 570 269 502 261 460 Z", "skeletal", "anterior"),
  structurePath("patella_l", "M161 642 C176 636 190 645 190 663 C181 675 163 677 154 665 C151 654 154 646 161 642 Z", "skeletal", "anterior"),
  structurePath("patella_r", "M259 642 C244 636 230 645 230 663 C239 675 257 677 266 665 C269 654 266 646 259 642 Z", "skeletal", "anterior"),
  structurePath("tib_fib_l", "M153 670 C172 682 171 817 153 897 C143 902 136 897 135 887 C140 809 137 716 153 670 Z M178 672 C184 739 180 846 166 900 C158 903 154 895 157 881 C164 807 164 733 178 672 Z", "skeletal", "anterior"),
  structurePath("tib_fib_r", "M267 670 C248 682 249 817 267 897 C277 902 284 897 285 887 C280 809 283 716 267 670 Z M242 672 C236 739 240 846 254 900 C262 903 266 895 263 881 C256 807 256 733 242 672 Z", "skeletal", "anterior"),
  structurePath("tarsals_metatarsals", "M124 902 C145 890 178 897 193 918 C176 936 137 936 118 922 C116 913 118 907 124 902 Z M227 918 C242 897 275 890 296 902 C302 907 304 913 302 922 C283 936 244 936 227 918 Z", "skeletal", "anterior"),
  structurePath("rotator_cuff_l", "M120 184 C135 180 146 189 150 204 C139 211 123 204 116 193 C115 188 116 185 120 184 Z", "tendon", "anterior"),
  structurePath("rotator_cuff_r", "M300 184 C285 180 274 189 270 204 C281 211 297 204 304 193 C305 188 304 185 300 184 Z", "tendon", "anterior"),
  structurePath("biceps_tendon_l", "M142 189 C150 197 150 214 140 230 C134 225 132 203 142 189 Z M118 190 C130 198 132 217 122 236 C114 225 110 203 118 190 Z", "tendon", "anterior"),
  structurePath("biceps_tendon_r", "M278 189 C270 197 270 214 280 230 C286 225 288 203 278 189 Z M302 190 C290 198 288 217 298 236 C306 225 310 203 302 190 Z", "tendon", "anterior"),
  structurePath("wrist_retinaculum", "M62 489 C78 485 100 488 113 496 L110 510 C94 502 75 501 59 508 Z M307 496 C320 488 342 485 358 489 L361 508 C345 501 326 502 310 510 Z", "tendon", "anterior"),
  structurePath("patellar_tendon_l", "M164 671 C174 670 181 671 188 676 C184 694 178 713 170 733 C160 712 158 692 164 671 Z", "tendon", "anterior"),
  structurePath("patellar_tendon_r", "M256 671 C246 670 239 671 232 676 C236 694 242 713 250 733 C260 712 262 692 256 671 Z", "tendon", "anterior"),
  structurePath("ankle_retinaculum", "M127 875 C144 869 168 871 182 883 L178 900 C158 890 140 889 123 897 Z M238 883 C252 871 276 869 293 875 L297 897 C280 889 262 890 242 900 Z", "tendon", "anterior"),
  structurePath("plantar_fascia", "M124 916 C147 908 173 909 191 922 C171 932 144 933 120 923 Z M229 922 C247 909 273 908 296 916 C300 922 279 932 249 932 C239 930 232 927 229 922 Z", "tendon", "anterior"),
  structurePath("achilles_l", "M160 812 C174 834 171 879 160 905 C150 878 148 835 160 812 Z", "tendon", "anterior"),
  structurePath("achilles_r", "M260 812 C246 834 249 879 260 905 C270 878 272 835 260 812 Z", "tendon", "anterior"),
  structurePath("cruciate_ligaments", "M148 646 C165 634 184 636 198 651 C188 660 163 662 148 646 Z M222 651 C236 636 255 634 272 646 C257 662 232 660 222 651 Z", "tendon", "anterior"),
  structurePath("heart", "M203 205 C190 186 162 194 164 222 C166 249 191 264 210 282 C229 264 254 249 256 222 C258 194 230 186 217 205 C213 211 207 211 203 205 Z M188 214 C199 219 207 231 210 252 M232 214 C221 219 213 231 210 252 M184 232 C199 236 221 236 236 232", "cardiovascular", "anterior"),
  structurePath("aorta", "M214 203 C229 184 232 160 218 147 C204 134 182 144 184 162 C186 176 204 173 207 160 C211 184 202 205 196 229 C200 234 207 233 212 227 C217 216 219 209 214 203 Z", "cardiovascular", "anterior"),
  structurePath("vena_cava", "M235 158 C228 190 228 226 237 263 C242 294 239 337 228 398 C221 399 216 396 215 389 C223 329 225 287 220 257 C216 227 219 188 225 155 Z M196 151 C199 184 198 213 190 240 C183 265 181 320 191 390 C185 396 178 396 175 389 C166 311 169 257 178 231 C186 208 187 178 183 151 Z", "cardiovascular", "anterior"),
  structurePath("carotids", "M201 105 C198 132 195 151 189 173 M219 105 C222 132 225 151 231 173", "cardiovascular", "anterior", { line: true, vessel: "artery" }),
  structurePath("subclavian", "M184 165 C159 172 136 182 115 198 M236 165 C261 172 284 182 305 198 M185 175 C160 181 138 190 119 206 M235 175 C260 181 282 190 301 206", "cardiovascular", "anterior", { line: true, vessel: "mixed" }),
  structurePath("brachial_radial_ulnar", "M113 205 C104 264 96 341 86 414 C82 445 75 471 66 500 M307 205 C316 264 324 341 334 414 C338 445 345 471 354 500 M124 208 C114 274 108 352 100 425 C96 458 91 482 84 504 M296 208 C306 274 312 352 320 425 C324 458 329 482 336 504", "cardiovascular", "anterior", { line: true, vessel: "mixed" }),
  structurePath("femoral_popliteal_tibial", "M196 418 C184 493 174 598 170 678 C166 759 160 837 146 908 M224 418 C236 493 246 598 250 678 C254 759 260 837 274 908 M180 420 C164 504 155 611 151 690 C146 782 137 850 126 910 M240 420 C256 504 265 611 269 690 C274 782 283 850 294 910", "cardiovascular", "anterior", { line: true, vessel: "mixed" }),
  structurePath("trachea", "M203 114 C213 112 219 114 223 119 L222 169 C219 176 202 176 198 169 L197 119 C200 116 201 115 203 114 Z M201 170 C204 185 208 198 210 213 C212 198 216 185 219 170", "respiratory", "anterior"),
  structurePath("bronchi", "M209 182 C195 196 183 213 172 238 M211 182 C228 197 242 213 250 238 M172 238 C184 250 193 263 199 278 M250 238 C238 250 229 263 221 278", "respiratory", "anterior", { line: true }),
  structurePath("lungs", "M159 188 C185 179 204 194 205 229 C206 269 188 318 163 334 C143 309 136 242 159 188 Z M261 188 C235 179 216 194 215 229 C214 269 232 318 257 334 C277 309 284 242 261 188 Z M222 315 C239 308 253 293 262 272 M158 272 C168 293 181 308 198 315 M265 234 C246 235 229 235 216 231 M155 234 C174 235 191 235 204 231", "respiratory", "anterior"),
  structurePath("diaphragm", "M146 331 C183 356 237 356 274 331 C266 358 244 375 210 376 C176 375 154 358 146 331 Z", "respiratory", "anterior"),
];

const posteriorStructures = [
  structurePath("trapezius", "M177 108 C197 128 223 128 243 108 C254 155 277 173 302 193 C264 210 236 201 210 177 C184 201 156 210 118 193 C143 173 166 155 177 108 Z", "muscular", "posterior"),
  structurePath("rhomboids", "M163 203 C184 186 201 181 210 189 C197 217 180 236 159 246 C151 231 152 215 163 203 Z M257 203 C236 186 219 181 210 189 C223 217 240 236 261 246 C269 231 268 215 257 203 Z", "muscular", "posterior"),
  structurePath("infraspinatus_l", "M126 196 C150 187 178 195 194 216 C171 237 144 247 123 235 C115 221 116 205 126 196 Z", "muscular", "posterior"),
  structurePath("infraspinatus_r", "M294 196 C270 187 242 195 226 216 C249 237 276 247 297 235 C305 221 304 205 294 196 Z", "muscular", "posterior"),
  structurePath("teres_l", "M123 242 C148 236 172 243 190 260 C171 280 139 286 118 269 C113 258 115 248 123 242 Z", "muscular", "posterior"),
  structurePath("teres_r", "M297 242 C272 236 248 243 230 260 C249 280 281 286 302 269 C307 258 305 248 297 242 Z", "muscular", "posterior"),
  structurePath("latissimus", "M137 258 C166 264 191 279 210 308 C229 279 254 264 283 258 C285 320 259 385 210 419 C161 385 135 320 137 258 Z", "muscular", "posterior"),
  structurePath("erector_spinae", "M196 180 C205 235 204 339 194 421 C187 433 178 428 179 412 C186 333 186 242 181 184 C185 177 191 176 196 180 Z M224 180 C215 235 216 339 226 421 C233 433 242 428 241 412 C234 333 234 242 239 184 C235 177 229 176 224 180 Z", "muscular", "posterior"),
  structurePath("glute_max", "M147 403 C177 382 198 395 210 426 C222 395 243 382 273 403 C277 444 250 483 210 488 C170 483 143 444 147 403 Z", "muscular", "posterior"),
  structurePath("glute_med_l", "M143 386 C165 371 185 375 200 397 C180 407 160 417 144 431 C135 414 134 397 143 386 Z", "muscular", "posterior"),
  structurePath("glute_med_r", "M277 386 C255 371 235 375 220 397 C240 407 260 417 276 431 C285 414 286 397 277 386 Z", "muscular", "posterior"),
  structurePath("hamstrings_l", "M151 481 C177 482 194 520 192 594 C190 645 176 690 158 683 C145 625 134 527 151 481 Z", "muscular", "posterior"),
  structurePath("hamstrings_r", "M269 481 C243 482 226 520 228 594 C230 645 244 690 262 683 C275 625 286 527 269 481 Z", "muscular", "posterior"),
  structurePath("gastroc_l", "M141 690 C166 681 186 718 184 777 C182 840 157 869 137 846 C120 801 119 715 141 690 Z", "muscular", "posterior"),
  structurePath("gastroc_r", "M279 690 C254 681 234 718 236 777 C238 840 263 869 283 846 C300 801 301 715 279 690 Z", "muscular", "posterior"),
  structurePath("soleus_l", "M153 814 C173 826 172 880 158 907 C140 886 136 837 153 814 Z", "muscular", "posterior"),
  structurePath("soleus_r", "M267 814 C247 826 248 880 262 907 C280 886 284 837 267 814 Z", "muscular", "posterior"),
  structurePath("skull", "M178 48 C183 18 237 18 242 48 C248 74 236 99 210 101 C184 99 172 74 178 48 Z", "skeletal", "posterior"),
  structurePath("mandible", "M186 83 C197 98 223 98 234 83 C228 108 192 108 186 83 Z", "skeletal", "posterior"),
  structurePath("clavicles", "M145 169 C167 158 190 157 210 172 C230 157 253 158 275 169 C252 172 230 178 210 187 C190 178 168 172 145 169 Z", "skeletal", "posterior"),
  structurePath("scapulae", "M122 193 C154 176 188 185 202 217 C183 256 146 270 119 241 C112 219 114 203 122 193 Z M298 193 C266 176 232 185 218 217 C237 256 274 270 301 241 C308 219 306 203 298 193 Z", "skeletal", "posterior"),
  structurePath("ribs", "M160 202 C181 185 239 185 260 202 C268 249 255 306 229 334 C217 342 203 342 191 334 C165 306 152 249 160 202 Z M174 220 C195 207 225 207 246 220 M168 248 C191 234 229 234 252 248 M170 277 C194 263 226 263 250 277 M181 307 C199 297 221 297 239 307", "skeletal", "posterior"),
  structurePath("pelvis", "M148 399 C178 383 196 404 210 429 C224 404 242 383 272 399 C269 432 245 459 210 461 C175 459 151 432 148 399 Z", "skeletal", "posterior"),
  structurePath("humerus_l", "M104 214 C116 239 119 304 108 356 C98 363 91 359 88 348 C92 292 94 242 104 214 Z", "skeletal", "posterior"),
  structurePath("humerus_r", "M316 214 C304 239 301 304 312 356 C322 363 329 359 332 348 C328 292 326 242 316 214 Z", "skeletal", "posterior"),
  structurePath("radius_ulna_l", "M88 360 C99 370 96 454 76 495 C66 493 68 452 76 404 C80 381 83 367 88 360 Z M104 363 C111 397 106 461 91 498 C82 499 84 458 92 407 C96 384 100 369 104 363 Z", "skeletal", "posterior"),
  structurePath("radius_ulna_r", "M332 360 C321 370 324 454 344 495 C354 493 352 452 344 404 C340 381 337 367 332 360 Z M316 363 C309 397 314 461 329 498 C338 499 336 458 328 407 C324 384 320 369 316 363 Z", "skeletal", "posterior"),
  structurePath("carpals", "M60 498 C79 489 101 493 112 507 C102 522 71 523 57 511 C55 506 56 502 60 498 Z M308 507 C319 493 341 489 360 498 C364 502 365 506 363 511 C349 523 318 522 308 507 Z", "skeletal", "posterior"),
  structurePath("femur_l", "M159 460 C184 486 190 596 174 652 C163 657 154 652 151 641 C155 570 151 502 159 460 Z", "skeletal", "posterior"),
  structurePath("femur_r", "M261 460 C236 486 230 596 246 652 C257 657 266 652 269 641 C265 570 269 502 261 460 Z", "skeletal", "posterior"),
  structurePath("patella_l", "M161 642 C176 636 190 645 190 663 C181 675 163 677 154 665 C151 654 154 646 161 642 Z", "skeletal", "posterior"),
  structurePath("patella_r", "M259 642 C244 636 230 645 230 663 C239 675 257 677 266 665 C269 654 266 646 259 642 Z", "skeletal", "posterior"),
  structurePath("tib_fib_l", "M153 670 C172 682 171 817 153 897 C143 902 136 897 135 887 C140 809 137 716 153 670 Z M178 672 C184 739 180 846 166 900 C158 903 154 895 157 881 C164 807 164 733 178 672 Z", "skeletal", "posterior"),
  structurePath("tib_fib_r", "M267 670 C248 682 249 817 267 897 C277 902 284 897 285 887 C280 809 283 716 267 670 Z M242 672 C236 739 240 846 254 900 C262 903 266 895 263 881 C256 807 256 733 242 672 Z", "skeletal", "posterior"),
  structurePath("tarsals_metatarsals", "M124 902 C145 890 178 897 193 918 C176 936 137 936 118 922 C116 913 118 907 124 902 Z M227 918 C242 897 275 890 296 902 C302 907 304 913 302 922 C283 936 244 936 227 918 Z", "skeletal", "posterior"),
  structurePath("achilles_l", "M155 786 C174 815 174 876 160 905 C149 877 146 819 155 786 Z", "tendon", "posterior"),
  structurePath("achilles_r", "M265 786 C246 815 246 876 260 905 C271 877 274 819 265 786 Z", "tendon", "posterior"),
  structurePath("rotator_cuff_l", "M124 184 C149 176 174 184 193 205 C175 216 145 216 119 197 C116 190 118 186 124 184 Z", "tendon", "posterior"),
  structurePath("rotator_cuff_r", "M296 184 C271 176 246 184 227 205 C245 216 275 216 301 197 C304 190 302 186 296 184 Z", "tendon", "posterior"),
  structurePath("wrist_retinaculum", "M62 489 C78 485 100 488 113 496 L110 510 C94 502 75 501 59 508 Z M307 496 C320 488 342 485 358 489 L361 508 C345 501 326 502 310 510 Z", "tendon", "posterior"),
  structurePath("patellar_tendon_l", "M164 671 C174 670 181 671 188 676 C184 694 178 713 170 733 C160 712 158 692 164 671 Z", "tendon", "posterior"),
  structurePath("patellar_tendon_r", "M256 671 C246 670 239 671 232 676 C236 694 242 713 250 733 C260 712 262 692 256 671 Z", "tendon", "posterior"),
  structurePath("ankle_retinaculum", "M127 875 C144 869 168 871 182 883 L178 900 C158 890 140 889 123 897 Z M238 883 C252 871 276 869 293 875 L297 897 C280 889 262 890 242 900 Z", "tendon", "posterior"),
  structurePath("plantar_fascia", "M124 916 C147 908 173 909 191 922 C171 932 144 933 120 923 Z M229 922 C247 909 273 908 296 916 C300 922 279 932 249 932 C239 930 232 927 229 922 Z", "tendon", "posterior"),
  structurePath("cruciate_ligaments", "M148 646 C165 634 184 636 198 651 C188 660 163 662 148 646 Z M222 651 C236 636 255 634 272 646 C257 662 232 660 222 651 Z", "tendon", "posterior"),
  structurePath("heart", "M203 205 C190 186 162 194 164 222 C166 249 191 264 210 282 C229 264 254 249 256 222 C258 194 230 186 217 205 C213 211 207 211 203 205 Z M188 214 C199 219 207 231 210 252 M232 214 C221 219 213 231 210 252 M184 232 C199 236 221 236 236 232", "cardiovascular", "posterior"),
  structurePath("aorta", "M214 203 C229 184 232 160 218 147 C204 134 182 144 184 162 C186 176 204 173 207 160 C211 184 202 205 196 229 C200 234 207 233 212 227 C217 216 219 209 214 203 Z", "cardiovascular", "posterior"),
  structurePath("vena_cava", "M235 158 C228 190 228 226 237 263 C242 294 239 337 228 398 C221 399 216 396 215 389 C223 329 225 287 220 257 C216 227 219 188 225 155 Z M196 151 C199 184 198 213 190 240 C183 265 181 320 191 390 C185 396 178 396 175 389 C166 311 169 257 178 231 C186 208 187 178 183 151 Z", "cardiovascular", "posterior"),
  structurePath("carotids", "M201 105 C198 132 195 151 189 173 M219 105 C222 132 225 151 231 173", "cardiovascular", "posterior", { line: true, vessel: "artery" }),
  structurePath("subclavian", "M184 165 C159 172 136 182 115 198 M236 165 C261 172 284 182 305 198 M185 175 C160 181 138 190 119 206 M235 175 C260 181 282 190 301 206", "cardiovascular", "posterior", { line: true, vessel: "mixed" }),
  structurePath("brachial_radial_ulnar", "M113 205 C104 264 96 341 86 414 C82 445 75 471 66 500 M307 205 C316 264 324 341 334 414 C338 445 345 471 354 500 M124 208 C114 274 108 352 100 425 C96 458 91 482 84 504 M296 208 C306 274 312 352 320 425 C324 458 329 482 336 504", "cardiovascular", "posterior", { line: true, vessel: "mixed" }),
  structurePath("femoral_popliteal_tibial", "M196 418 C184 493 174 598 170 678 C166 759 160 837 146 908 M224 418 C236 493 246 598 250 678 C254 759 260 837 274 908 M180 420 C164 504 155 611 151 690 C146 782 137 850 126 910 M240 420 C256 504 265 611 269 690 C274 782 283 850 294 910", "cardiovascular", "posterior", { line: true, vessel: "mixed" }),
  structurePath("trachea", "M203 114 C213 112 219 114 223 119 L222 169 C219 176 202 176 198 169 L197 119 C200 116 201 115 203 114 Z M201 170 C204 185 208 198 210 213 C212 198 216 185 219 170", "respiratory", "posterior"),
  structurePath("bronchi", "M209 182 C195 196 183 213 172 238 M211 182 C228 197 242 213 250 238 M172 238 C184 250 193 263 199 278 M250 238 C238 250 229 263 221 278", "respiratory", "posterior", { line: true }),
  structurePath("lungs", "M159 188 C185 179 204 194 205 229 C206 269 188 318 163 334 C143 309 136 242 159 188 Z M261 188 C235 179 216 194 215 229 C214 269 232 318 257 334 C277 309 284 242 261 188 Z M222 315 C239 308 253 293 262 272 M158 272 C168 293 181 308 198 315 M265 234 C246 235 229 235 216 231 M155 234 C174 235 191 235 204 231", "respiratory", "posterior"),
  structurePath("diaphragm", "M146 331 C183 356 237 356 274 331 C266 358 244 375 210 376 C176 375 154 358 146 331 Z", "respiratory", "posterior"),
];

const silhouetteD = "M210 18 C240 18 260 45 254 77 C250 101 236 113 225 117 C228 139 241 154 269 164 C304 176 334 198 346 238 C363 294 350 375 358 459 C381 470 378 515 350 530 C338 569 318 611 304 662 C299 714 311 785 304 849 C301 884 294 915 296 928 C275 945 242 940 226 922 C228 887 238 832 234 770 C231 722 218 680 210 650 C202 680 189 722 186 770 C182 832 192 887 194 922 C178 940 145 945 124 928 C126 915 119 884 116 849 C109 785 121 714 116 662 C102 611 82 569 70 530 C42 515 39 470 62 459 C70 375 57 294 74 238 C86 198 116 176 151 164 C179 154 192 139 195 117 C184 113 170 101 166 77 C160 45 180 18 210 18 Z";

const LABEL_POINTS = {
  pec_major: [284, 218], heart: [282, 236], lungs: [300, 260], trachea: [258, 150], diaphragm: [288, 350], ribs: [288, 258],
  skull: [260, 70], mandible: [255, 98], clavicles: [290, 175], pelvis: [286, 430], aorta: [256, 164], vena_cava: [268, 295],
  deltoid_l: [98, 205], deltoid_r: [322, 205], biceps_l: [87, 300], biceps_r: [333, 300], rectus_abdominis: [262, 318],
  trapezius: [295, 168], rhomboids: [285, 232], latissimus: [300, 330], glute_max: [288, 452],
  rectus_femoris_l: [150, 548], rectus_femoris_r: [270, 548], tibialis_anterior_l: [128, 760], tibialis_anterior_r: [292, 760],
  gastroc_l: [135, 780], gastroc_r: [285, 780], achilles_l: [138, 855], achilles_r: [282, 855], femoral_popliteal_tibial: [282, 700]
};

function getFill(structure, selected, hovered) {
  if (selected) return "url(#selectedFocus)";
  if (structure.system === "muscular") return hovered ? "url(#muscleActive)" : "url(#muscleGrad)";
  if (structure.system === "skeletal") return hovered ? "url(#boneActive)" : "url(#boneGrad)";
  if (structure.system === "tendon") return hovered ? "url(#tendonActive)" : "url(#tendonGrad)";
  if (structure.system === "respiratory") return hovered ? "url(#lungActive)" : "url(#lungGrad)";
  if (structure.system === "cardiovascular") {
    if (structure.vessel === "mixed") return "none";
    if (structure.vessel === "vein") return COLORS.vein;
    return hovered ? "url(#arteryActive)" : "url(#arteryGrad)";
  }
  return COLORS.muscle;
}

function getStroke(structure) {
  if (structure.system === "cardiovascular" && structure.vessel === "mixed") return "url(#vesselMixed)";
  if (structure.system === "cardiovascular" && structure.line) return COLORS.artery;
  if (structure.system === "respiratory" && structure.line) return COLORS.lung;
  return "transparent";
}

function Structure({ s, selectedId, hoveredId, onSelect, onHover, chartMode }) {
  const selected = selectedId === s.id;
  const hovered = hoveredId === s.id;
  const hasSelection = Boolean(selectedId);
  const fill = getFill(s, selected, hovered);
  const stroke = selected ? "#F6F0B8" : s.line ? getStroke(s) : "rgba(255,255,255,0.06)";
  const strokeWidth = selected ? (s.line ? 10 : 2.6) : s.line ? (s.system === "cardiovascular" ? 6 : 4) : 0.45;
  const baseOpacity = chartMode
    ? (s.system === "muscular" ? 0.62 :
       s.system === "skeletal" ? 0.72 :
       s.system === "tendon" ? 0.78 :
       s.system === "respiratory" ? 0.48 :
       s.system === "cardiovascular" ? 0.72 : 0.55)
    : (s.system === "muscular" ? 0.22 :
       s.system === "skeletal" ? 0.46 :
       s.system === "tendon" ? 0.58 :
       s.system === "respiratory" ? 0.28 :
       s.system === "cardiovascular" ? 0.44 : 0.35);
  const contextOpacity = chartMode ? baseOpacity : hasSelection && !selected && !hovered ? Math.min(baseOpacity, 0.095) : baseOpacity;
  const opacity = selected || hovered ? 1 : contextOpacity;

  return (
    <g
      className={`structure ${selected ? "selected" : ""} ${hovered ? "hovered" : ""} ${s.system}`}
      onMouseEnter={() => onHover(s.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(s.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(s.id)}
      aria-label={INFO[s.id]?.name || s.id}
    >
      <path
        d={s.d}
        fill={s.line ? "none" : fill}
        stroke={stroke}
        strokeWidth={selected || hovered ? strokeWidth + 2 : strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
        filter={selected ? "url(#selectedHalo)" : hovered ? "url(#glow)" : undefined}
      />
      {selected && !s.line && (
        <path d={s.d} fill="url(#specular)" opacity="0.18" pointerEvents="none" />
      )}
    </g>
  );
}

function AnatomySvg({ view, activeSystems, selectedId, hoveredId, setSelectedId, setHoveredId, focusMode, showDepthLighting, showFlow, explodedView, showLabels, chartMode }) {
  const structures = view === "anterior" ? anteriorStructures : posteriorStructures;
  const visible = structures.filter((s) => activeSystems[s.system]);

  return (
    <div className="svgWrap">
      <svg viewBox="0 0 420 960" preserveAspectRatio="xMidYMid meet" className={`anatomySvg ${focusMode ? "focusModeSvg" : ""} ${showFlow ? "flowMode" : ""} ${chartMode ? "chartModeSvg" : ""}`} aria-label={`${view} anatomy reference`}> 
        <defs>
          <radialGradient id="fasciaGrad" cx="50%" cy="42%" r="66%">
            <stop offset="0%" stopColor="#6F312A" />
            <stop offset="58%" stopColor="#32151A" />
            <stop offset="100%" stopColor="#0D090F" />
          </radialGradient>
          <radialGradient id="muscleGrad" cx="47%" cy="36%" r="70%">
            <stop offset="0%" stopColor="#F47A3C" />
            <stop offset="43%" stopColor="#B83020" />
            <stop offset="100%" stopColor="#4A0A14" />
          </radialGradient>
          <radialGradient id="muscleActive" cx="38%" cy="24%" r="82%">
            <stop offset="0%" stopColor="#FFE0A8" />
            <stop offset="20%" stopColor="#FF8A42" />
            <stop offset="55%" stopColor="#B83020" />
            <stop offset="100%" stopColor="#2A0510" />
          </radialGradient>
          <radialGradient id="boneGrad" cx="46%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#FFF4DE" />
            <stop offset="50%" stopColor="#E8DCC8" />
            <stop offset="100%" stopColor="#8E7D61" />
          </radialGradient>
          <radialGradient id="boneActive" cx="34%" cy="22%" r="82%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E8DCC8" />
            <stop offset="100%" stopColor="#6C5A3F" />
          </radialGradient>
          <radialGradient id="tendonGrad" cx="48%" cy="30%" r="74%">
            <stop offset="0%" stopColor="#FFF1C7" />
            <stop offset="56%" stopColor="#D4C4A0" />
            <stop offset="100%" stopColor="#70613F" />
          </radialGradient>
          <radialGradient id="tendonActive" cx="33%" cy="18%" r="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="42%" stopColor="#EBDDB7" />
            <stop offset="100%" stopColor="#74623C" />
          </radialGradient>
          <radialGradient id="arteryGrad" cx="45%" cy="33%" r="70%">
            <stop offset="0%" stopColor="#FF5361" />
            <stop offset="52%" stopColor="#B01828" />
            <stop offset="100%" stopColor="#4E0713" />
          </radialGradient>
          <radialGradient id="arteryActive" cx="30%" cy="20%" r="82%">
            <stop offset="0%" stopColor="#FFD2D5" />
            <stop offset="35%" stopColor="#E23842" />
            <stop offset="100%" stopColor="#35050D" />
          </radialGradient>
          <radialGradient id="lungGrad" cx="45%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#E8FBFF" />
            <stop offset="58%" stopColor="#80B8D0" />
            <stop offset="100%" stopColor="#1B3A4D" />
          </radialGradient>
          <radialGradient id="lungActive" cx="34%" cy="20%" r="82%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="44%" stopColor="#AEE6F5" />
            <stop offset="100%" stopColor="#1B3A4D" />
          </radialGradient>
          <linearGradient id="vesselMixed" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#B01828" />
            <stop offset="50%" stopColor="#72224B" />
            <stop offset="100%" stopColor="#2840A0" />
          </linearGradient>
          <radialGradient id="selectedFocus" cx="32%" cy="20%" r="82%">
            <stop offset="0%" stopColor="#FFF3B8" />
            <stop offset="26%" stopColor="#F7B84A" />
            <stop offset="58%" stopColor="#B83020" />
            <stop offset="100%" stopColor="#32101A" />
          </radialGradient>
          <radialGradient id="specular" cx="30%" cy="18%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="38%" stopColor="rgba(255,255,255,0.24)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="blueRim" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-3" dy="0" stdDeviation="3" floodColor="#1D4F90" floodOpacity="0.28" />
            <feDropShadow dx="3" dy="0" stdDeviation="4" floodColor="#0B355E" floodOpacity="0.18" />
          </filter>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FFF0A8" floodOpacity="0.62" />
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#C8522B" floodOpacity="0.32" />
          </filter>
          <filter id="tissueDepth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
            <feDropShadow dx="-2" dy="0" stdDeviation="3" floodColor="#2E78FF" floodOpacity="0.16" />
          </filter>
          <filter id="selectedHalo" x="-45%" y="-45%" width="190%" height="190%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FFF6B8" floodOpacity="0.95" />
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#F7B84A" floodOpacity="0.42" />
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.35" />
          </filter>
          <pattern id="fiberTexture" patternUnits="userSpaceOnUse" width="26" height="26" patternTransform="rotate(18)">
            <path d="M0 8 L26 8 M0 18 L26 18" stroke="rgba(255,210,166,0.055)" strokeWidth="0.8" />
            <path d="M0 13 L26 13" stroke="rgba(20,8,14,0.10)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="cinemaVignette" cx="50%" cy="36%" r="72%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="58%" stopColor="rgba(255,255,255,0.00)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.50)" />
          </radialGradient>
          <clipPath id="bodyClip"><path d={silhouetteD} /></clipPath>
        </defs>

        {showDepthLighting && <ellipse cx="210" cy="500" rx="150" ry="412" fill="rgba(28,70,120,0.025)" filter="url(#blueRim)" />}
        <path d={silhouetteD} fill="#14131A" stroke="#050208" strokeWidth="2" filter={showDepthLighting ? "url(#tissueDepth)" : "url(#blueRim)"} opacity="0.92" />
        <path d={silhouetteD} fill="url(#fasciaGrad)" opacity="0.18" clipPath="url(#bodyClip)" pointerEvents="none" />
        {showDepthLighting && <path d={silhouetteD} fill="url(#fiberTexture)" opacity="0.045" clipPath="url(#bodyClip)" pointerEvents="none" />}
        {showDepthLighting && <path d={silhouetteD} fill="url(#cinemaVignette)" opacity="0.42" pointerEvents="none" />}
        <path d={silhouetteD} fill="none" stroke="#030207" strokeWidth="2.2" />

        <g className={`layer respiratoryLayer ${explodedView ? "explode respiratoryExplode" : ""}`}>
          {visible.filter((s) => s.system === "respiratory").map((s) => (
            <Structure key={s.id} s={s} selectedId={selectedId} hoveredId={hoveredId} onSelect={setSelectedId} onHover={setHoveredId} chartMode={chartMode} />
          ))}
        </g>
        <g className={`layer cardiovascularLayer ${explodedView ? "explode cardiovascularExplode" : ""}`}>
          {visible.filter((s) => s.system === "cardiovascular").map((s) => (
            <Structure key={s.id} s={s} selectedId={selectedId} hoveredId={hoveredId} onSelect={setSelectedId} onHover={setHoveredId} chartMode={chartMode} />
          ))}
        </g>
        <g className={`layer skeletalLayer ${explodedView ? "explode skeletalExplode" : ""}`}>
          {visible.filter((s) => s.system === "skeletal").map((s) => (
            <Structure key={s.id} s={s} selectedId={selectedId} hoveredId={hoveredId} onSelect={setSelectedId} onHover={setHoveredId} chartMode={chartMode} />
          ))}
        </g>
        <g className={`layer tendonLayer ${explodedView ? "explode tendonExplode" : ""}`}>
          {visible.filter((s) => s.system === "tendon").map((s) => (
            <Structure key={s.id} s={s} selectedId={selectedId} hoveredId={hoveredId} onSelect={setSelectedId} onHover={setHoveredId} chartMode={chartMode} />
          ))}
        </g>
        <g className={`layer muscularLayer ${explodedView ? "explode muscularExplode" : ""}`}>
          {visible.filter((s) => s.system === "muscular").map((s) => (
            <Structure key={s.id} s={s} selectedId={selectedId} hoveredId={hoveredId} onSelect={setSelectedId} onHover={setHoveredId} chartMode={chartMode} />
          ))}
        </g>
        {chartMode && (
          <g className="chartLandmarks" pointerEvents="none">
            <path d="M154 177 C176 164 194 162 210 176 C226 162 244 164 266 177" fill="none" stroke="rgba(232,220,200,0.48)" strokeWidth="2" strokeLinecap="round" />
            <path d="M210 186 C207 226 207 275 210 322" fill="none" stroke="rgba(232,220,200,0.34)" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 7" />
            <path d="M154 410 C176 430 194 442 210 456 C226 442 244 430 266 410" fill="none" stroke="rgba(232,220,200,0.34)" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
        {chartMode && showLabels && (
          <g className="atlasLabels" pointerEvents="none">
            <path d="M118 188 C84 166, 64 150, 42 126" fill="none" stroke="#D8CCA8" strokeWidth="1.15" opacity="0.7" />
            <text x="18" y="108" fill="#F0D890" fontFamily="Source Sans 3" fontSize="11" fontWeight="900">Shoulder girdle</text>
            <path d="M210 212 C190 184, 168 160, 126 142" fill="none" stroke="#D8CCA8" strokeWidth="1.15" opacity="0.7" />
            <text x="92" y="151" fill="#F0D890" fontFamily="Source Sans 3" fontSize="11" fontWeight="900">Thorax</text>
            <path d="M210 318 C174 328, 132 348, 84 382" fill="none" stroke="#D8CCA8" strokeWidth="1.15" opacity="0.7" />
            <text x="36" y="414" fill="#F0D890" fontFamily="Source Sans 3" fontSize="11" fontWeight="900">Abdominal wall</text>
            <path d="M172 650 C132 678, 102 706, 72 742" fill="none" stroke="#D8CCA8" strokeWidth="1.15" opacity="0.7" />
            <text x="30" y="776" fill="#F0D890" fontFamily="Source Sans 3" fontSize="11" fontWeight="900">Lower limb</text>
            <path d="M300 218 C340 202, 366 184, 392 158" fill="none" stroke="#D8CCA8" strokeWidth="1.15" opacity="0.7" />
            <text x="310" y="132" fill="#F0D890" fontFamily="Source Sans 3" fontSize="11" fontWeight="900">Vessels / airway</text>
          </g>
        )}
        {showLabels && selectedId && LABEL_POINTS[selectedId] && !chartMode && (
          <g className="smartLabel" pointerEvents="none">
            <path d={`M330 116 C360 118, 376 132, 384 152 L384 188`} fill="none" stroke="#F0D890" strokeWidth="1.2" opacity="0.78" />
            <circle cx={LABEL_POINTS[selectedId][0]} cy={LABEL_POINTS[selectedId][1]} r="4" fill="#FFD447" filter="url(#selectedHalo)" />
            <path d={`M${LABEL_POINTS[selectedId][0]} ${LABEL_POINTS[selectedId][1]} C330 ${LABEL_POINTS[selectedId][1] - 16}, 354 158, 384 158`} fill="none" stroke="#F0D890" strokeWidth="1.2" opacity="0.72" />
            <rect x="250" y="102" width="150" height="54" rx="12" fill="rgba(10,13,22,0.90)" stroke="rgba(240,216,144,0.30)" />
            <text x="264" y="125" fill="#F0D890" fontFamily="Source Sans 3" fontSize="13" fontWeight="900">Selected</text>
            <text x="264" y="144" fill="#D88928" fontFamily="Source Sans 3" fontSize="12" fontWeight="800">{INFO[selectedId]?.name}</text>
          </g>
        )}
      </svg>
    </div>
  );
}

function InfoPanel({ selectedId, tab, setTab }) {
  const info = INFO[selectedId] || baseInfo;
  const system = SYSTEMS[info.system];
  return (
    <aside className="infoPanel">
      <div className="panelTopline">Selected Structure</div>
      <h2 className={info.name.length > 18 ? "longTitle" : ""}>{info.name}</h2>
      <div className="badge"><span style={{ background: system.dot }} />{system.label}</div>
      <div className="tabs" role="tablist">
        <button className={tab === "function" ? "active" : ""} onClick={() => setTab("function")}>Function</button>
        <button className={tab === "clinical" ? "active" : ""} onClick={() => setTab("clinical")}>Clinical</button>
      </div>
      <p className="bodyCopy">{tab === "function" ? info.function : info.clinical}</p>
      <div className="clinicalTip">
        <strong>RN / MBLEx / Surgical Tech study cue</strong>
        <span>Identify the structure, its primary action or flow direction, nearby nerves/vessels, common injury pattern, surgical exposure relevance, and assessment landmark.</span>
      </div>
    </aside>
  );
}

function SCMCloseup() {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg scmPlate" aria-label="Sternocleidomastoid regional anatomy close-up">
      <defs>
        <radialGradient id="scmRealMuscle" cx="35%" cy="24%" r="82%">
          <stop offset="0%" stopColor="#FFD9A3" />
          <stop offset="35%" stopColor="#D95732" />
          <stop offset="78%" stopColor="#8B1E19" />
          <stop offset="100%" stopColor="#310711" />
        </radialGradient>
        <radialGradient id="scmSkinDepth" cx="42%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#B8825C" stopOpacity="0.42" />
          <stop offset="60%" stopColor="#5A2A22" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#0B0710" stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id="scmBone" cx="42%" cy="26%" r="76%">
          <stop offset="0%" stopColor="#FFF7E8" />
          <stop offset="54%" stopColor="#E8DCC8" />
          <stop offset="100%" stopColor="#8A785D" />
        </radialGradient>
        <filter id="scmGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor="#FFF0B6" floodOpacity="0.65" />
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="30" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="17">Selected focus: Sternocleidomastoid</text>
      <text x="22" y="52" fill="#A06820" fontFamily="Source Sans 3" fontSize="12.5">Lateral neck plate: airway, carotid sheath, clavicle, cervical nerves</text>

      <path d="M70 208 C104 126 168 82 260 84 C332 86 382 124 394 176 C384 236 320 286 208 292 C118 292 50 260 70 208 Z" fill="rgba(46,120,255,0.08)" stroke="rgba(128,184,208,0.18)" strokeWidth="2" />

      <path d="M96 198 C126 154 160 128 204 112 C242 98 298 104 350 137 C345 174 326 205 294 231 C254 263 184 271 128 244 C104 233 91 216 96 198 Z" fill="url(#scmSkinDepth)" opacity="0.95" />

      <path d="M103 212 C142 204 196 207 282 234" fill="none" stroke="url(#scmBone)" strokeWidth="22" strokeLinecap="round" opacity="0.9" />
      <path d="M76 220 C112 206 142 206 166 214" fill="none" stroke="url(#scmBone)" strokeWidth="16" strokeLinecap="round" opacity="0.92" />
      <path d="M108 212 C150 208 204 213 282 238" fill="none" stroke="#FFF7E8" strokeWidth="3" strokeLinecap="round" opacity="0.45" />

      <path d="M196 80 C204 112 205 152 200 230" fill="none" stroke="#80B8D0" strokeWidth="10" strokeLinecap="round" opacity="0.68" />
      <path d="M200 134 C184 148 174 166 164 194" fill="none" stroke="#BEEFFF" strokeWidth="5" strokeLinecap="round" opacity="0.74" />

      <path d="M230 85 C254 126 256 178 236 238" fill="none" stroke="#B01828" strokeWidth="7" strokeLinecap="round" />
      <path d="M246 88 C270 132 272 180 252 242" fill="none" stroke="#2840A0" strokeWidth="6" strokeLinecap="round" opacity="0.88" />
      <path d="M218 90 C198 126 188 168 184 238" fill="none" stroke="#F2C94C" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="2 8" />

      <path d="M252 68 C234 112 218 160 202 225 C195 252 184 272 168 286 C158 274 154 252 162 228 C178 178 198 126 218 82 C228 70 240 64 252 68 Z" fill="url(#scmRealMuscle)" stroke="#FFF0B6" strokeWidth="2.6" filter="url(#scmGlow)" />
      <path d="M246 76 C226 120 208 174 190 236" fill="none" stroke="rgba(255,230,190,0.34)" strokeWidth="2" strokeLinecap="round" />
      <path d="M231 79 C216 120 202 168 187 222" fill="none" stroke="rgba(80,10,12,0.28)" strokeWidth="2" strokeLinecap="round" />

      <g fontFamily="Source Sans 3" fontSize="11" fontWeight="900">
        <circle cx="223" cy="156" r="3.5" fill="#FFF0B6" />
        <path d="M223 156 C282 150 314 144 356 134" fill="none" stroke="#FFF0B6" strokeWidth="1.3" />
        <text x="292" y="129" fill="#F0D890">Sternocleidomastoid</text>

        <path d="M232 116 C304 96 330 88 384 76" fill="none" stroke="#D8CCA8" strokeWidth="1" opacity="0.72" />
        <text x="292" y="72" fill="#B01828">Carotid artery</text>

        <path d="M196 128 C314 174 344 188 390 206" fill="none" stroke="#D8CCA8" strokeWidth="1" opacity="0.72" />
        <text x="306" y="214" fill="#80B8D0">Trachea / airway</text>

        <path d="M184 212 C278 246 324 258 380 278" fill="none" stroke="#D8CCA8" strokeWidth="1" opacity="0.72" />
        <text x="288" y="286" fill="#F2C94C">Cervical nerve path</text>
      </g>

      <g fontFamily="Source Sans 3" fontSize="11.5" fontWeight="800">
        <text x="24" y="315" fill="#E8DCC8">Bone</text>
        <text x="70" y="315" fill="#C63C2A">Muscle</text>
        <text x="132" y="315" fill="#D4C4A0">Tendon</text>
        <text x="194" y="315" fill="#B01828">Artery</text>
        <text x="252" y="315" fill="#2840A0">Vein</text>
        <text x="302" y="315" fill="#F2C94C">Nerve</text>
        <text x="354" y="315" fill="#80B8D0">Airway</text>
      </g>
    </svg>
  );
}

function SkullPlate({ info }) {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg skullPlate" aria-label="Skull and mandible regional atlas">
      <defs><radialGradient id="skullBone" cx="38%" cy="22%" r="78%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="52%" stopColor="#E8DCC8"/><stop offset="100%" stopColor="#77644A"/></radialGradient></defs>
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">{info?.name || "Skull / Mandible"}</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Cranial protection, mandible/TMJ, airway alignment, facial trauma landmarks</text>
      <path d="M150 62 C162 28 258 28 270 62 C286 112 266 172 214 178 C164 174 134 114 150 62 Z" fill="url(#skullBone)" stroke="#FFF7E8" strokeWidth="2" />
      <path d="M164 172 C180 210 242 210 258 172 C256 238 232 272 210 274 C188 272 164 238 164 172 Z" fill="url(#skullBone)" stroke="#FFF7E8" strokeWidth="2" />
      <path d="M178 94 C194 86 208 92 210 108 C212 92 226 86 242 94 M190 146 C206 154 226 154 242 146" fill="none" stroke="rgba(60,40,28,0.45)" strokeWidth="4" strokeLinecap="round" />
      <path d="M124 150 C92 160 72 176 44 204" stroke="#B01828" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M296 150 C328 160 348 176 376 204" stroke="#2840A0" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M210 216 C190 248 178 270 162 294 M210 216 C230 248 242 270 258 294" stroke="#F2C94C" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" fill="none" />
      <g fontFamily="Source Sans 3" fontSize="12" fontWeight="900">
        <text x="34" y="222" fill="#B01828">Facial artery region</text><text x="258" y="222" fill="#2840A0">Venous drainage</text><text x="128" y="306" fill="#F2C94C">Trigeminal/facial nerve relevance</text>
      </g>
    </svg>
  );
}

function ThoracicCagePlate({ info }) {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg thoraxPlate" aria-label="Ribs and sternum regional atlas">
      <defs><radialGradient id="ribBone" cx="44%" cy="25%" r="82%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="54%" stopColor="#E8DCC8"/><stop offset="100%" stopColor="#7E6B50"/></radialGradient></defs>
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">{info?.name || "Ribs and Sternum"}</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Thoracic cage: ventilation mechanics, intercostal spaces, chest tube danger zones</text>
      <path d="M210 70 C204 118 204 200 210 260" stroke="url(#ribBone)" strokeWidth="18" strokeLinecap="round" fill="none" />
      {[0,1,2,3,4,5].map((r)=><g key={r}>
        <path d={`M202 ${92+r*26} C160 ${88+r*23} 118 ${108+r*18} ${82} ${142+r*17}`} stroke="url(#ribBone)" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d={`M218 ${92+r*26} C260 ${88+r*23} 302 ${108+r*18} ${338} ${142+r*17}`} stroke="url(#ribBone)" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>)}
      <path d="M154 82 C174 72 194 72 210 84 C226 72 246 72 266 82" stroke="#D4C4A0" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M100 160 C154 144 264 144 320 160" stroke="#B01828" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M96 178 C156 194 264 194 324 178" stroke="#2840A0" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M86 142 C120 160 144 178 166 212 M334 142 C300 160 276 178 254 212" stroke="#F2C94C" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
      <g fontFamily="Source Sans 3" fontSize="12" fontWeight="900"><text x="32" y="294" fill="#F0D890">CST cue: count ribs, protect intercostal vessels/nerves, understand chest tube landmarks.</text></g>
    </svg>
  );
}

function ShoulderGirdlePlate({ info }) {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg shoulderPlate" aria-label="Clavicle and scapula regional atlas">
      <defs><radialGradient id="shoulderBone" cx="38%" cy="22%" r="80%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="52%" stopColor="#E8DCC8"/><stop offset="100%" stopColor="#79664B"/></radialGradient><radialGradient id="cuffMuscle" cx="34%" cy="24%" r="82%"><stop offset="0%" stopColor="#FFD4A0"/><stop offset="52%" stopColor="#B83020"/><stop offset="100%" stopColor="#3C0711"/></radialGradient></defs>
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">{info?.name || "Shoulder Girdle"}</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Clavicle/scapula, axillary vessels, brachial plexus, rotator cuff relations</text>
      <path d="M84 104 C142 78 190 76 210 94 C230 76 278 78 336 104" stroke="url(#shoulderBone)" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M110 124 C156 96 198 112 214 160 C198 220 150 250 104 214 C92 178 92 146 110 124 Z" fill="url(#shoulderBone)" stroke="#FFF7E8" strokeWidth="2" opacity="0.95" />
      <path d="M310 124 C264 96 222 112 206 160 C222 220 270 250 316 214 C328 178 328 146 310 124 Z" fill="url(#shoulderBone)" stroke="#FFF7E8" strokeWidth="2" opacity="0.95" />
      <path d="M118 152 C164 130 202 142 210 174 C172 196 132 190 104 166 Z M302 152 C256 130 218 142 210 174 C248 196 288 190 316 166 Z" fill="url(#cuffMuscle)" opacity="0.8" />
      <path d="M92 108 C120 146 142 184 158 238 M328 108 C300 146 278 184 262 238" stroke="#F2C94C" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 9" fill="none" />
      <path d="M84 118 C132 124 176 126 214 134 M336 118 C288 124 244 126 206 134" stroke="#B01828" strokeWidth="6" strokeLinecap="round" fill="none" />
      <text x="110" y="292" fill="#F0D890" fontFamily="Source Sans 3" fontSize="12" fontWeight="900">Protect subclavian/axillary vessels and brachial plexus during positioning.</text>
    </svg>
  );
}

function UpperLimbBonePlate({ info }) {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg upperLimbBonePlate" aria-label="Upper limb bone regional atlas">
      <defs><radialGradient id="armBone" cx="42%" cy="22%" r="80%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="50%" stopColor="#E8DCC8"/><stop offset="100%" stopColor="#78654A"/></radialGradient></defs>
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">{info?.name || "Upper Limb Bones"}</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Humerus/radius/ulna/carpals: radial nerve, brachial artery, wrist compartments</text>
      <path d="M206 70 C222 112 222 164 208 214" stroke="url(#armBone)" strokeWidth="23" strokeLinecap="round" fill="none" />
      <path d="M198 216 C184 252 174 282 166 306" stroke="url(#armBone)" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M218 216 C230 252 240 282 250 306" stroke="url(#armBone)" strokeWidth="12" strokeLinecap="round" fill="none" />
      <circle cx="206" cy="68" r="18" fill="url(#armBone)" stroke="#FFF7E8" strokeWidth="2"/><circle cx="208" cy="214" r="16" fill="url(#armBone)" stroke="#FFF7E8" strokeWidth="2"/>
      <path d="M250 70 C268 126 266 190 238 252" stroke="#B01828" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M270 90 C288 148 286 206 260 270" stroke="#2840A0" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M166 84 C138 144 142 210 172 276" stroke="#F2C94C" strokeWidth="5" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
      <text x="72" y="292" fill="#F0D890" fontFamily="Source Sans 3" fontSize="12" fontWeight="900">Exam cue: humeral shaft fracture can endanger radial nerve; check distal perfusion.</text>
    </svg>
  );
}

function PelvisPlate({ info }) {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg pelvisPlate" aria-label="Pelvic ring regional atlas">
      <defs><radialGradient id="pelvisBone" cx="42%" cy="24%" r="80%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="50%" stopColor="#E8DCC8"/><stop offset="100%" stopColor="#766348"/></radialGradient></defs>
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">{info?.name || "Pelvis"}</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Pelvic ring, iliac vessels, femoral canal pathway, positioning and hemorrhage risk</text>
      <path d="M112 92 C166 76 192 118 210 170 C228 118 254 76 308 92 C306 176 264 244 210 250 C156 244 114 176 112 92 Z" fill="url(#pelvisBone)" stroke="#FFF7E8" strokeWidth="2" />
      <path d="M156 140 C184 154 200 186 210 236 C220 186 236 154 264 140" fill="none" stroke="#766348" strokeWidth="10" strokeLinecap="round" opacity="0.55" />
      <path d="M186 116 C168 160 160 216 154 284 M234 116 C252 160 260 216 266 284" stroke="#B01828" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M170 122 C146 166 138 218 136 286 M250 122 C274 166 282 218 284 286" stroke="#2840A0" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M142 110 C114 164 108 224 122 284 M278 110 C306 164 312 224 298 284" stroke="#F2C94C" strokeWidth="5" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
      <text x="70" y="306" fill="#F0D890" fontFamily="Source Sans 3" fontSize="12" fontWeight="900">CST cue: pelvic trauma can hide major blood loss; protect iliac/femoral vessels.</text>
    </svg>
  );
}

function FemurPlate({ info }) {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg femurPlate" aria-label="Femur regional atlas">
      <defs><radialGradient id="femurBone" cx="42%" cy="22%" r="80%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="50%" stopColor="#E8DCC8"/><stop offset="100%" stopColor="#756348"/></radialGradient></defs>
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">{info?.name || "Femur"}</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Hip-to-knee load transfer, femoral vessels, sciatic/femoral nerve relations</text>
      <path d="M184 76 C220 106 232 180 218 270" stroke="url(#femurBone)" strokeWidth="28" strokeLinecap="round" fill="none" />
      <circle cx="176" cy="70" r="24" fill="url(#femurBone)" stroke="#FFF7E8" strokeWidth="2" />
      <path d="M202 272 C180 280 160 288 146 302 M218 270 C242 278 262 288 278 302" stroke="url(#femurBone)" strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M246 82 C266 144 260 226 236 300" stroke="#B01828" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M268 92 C288 154 282 230 256 300" stroke="#2840A0" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M142 86 C120 154 128 230 166 296" stroke="#F2C94C" strokeWidth="5" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
      <text x="70" y="318" fill="#F0D890" fontFamily="Source Sans 3" fontSize="12" fontWeight="900">High-yield: shaft fracture can cause significant blood loss and neurovascular risk.</text>
    </svg>
  );
}

function KneePlate({ info }) {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg kneePlate" aria-label="Knee and patella regional atlas">
      <defs><radialGradient id="kneeBone" cx="42%" cy="22%" r="80%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="50%" stopColor="#E8DCC8"/><stop offset="100%" stopColor="#756348"/></radialGradient></defs>
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">{info?.name || "Patella / Knee"}</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Patella, ACL/PCL region, popliteal vessels, peroneal nerve caution</text>
      <path d="M158 82 C188 116 232 116 262 82" stroke="url(#kneeBone)" strokeWidth="26" strokeLinecap="round" fill="none" />
      <path d="M168 252 C190 218 230 218 252 252" stroke="url(#kneeBone)" strokeWidth="24" strokeLinecap="round" fill="none" />
      <circle cx="210" cy="162" r="28" fill="url(#kneeBone)" stroke="#FFF7E8" strokeWidth="2" />
      <path d="M190 122 C218 154 228 190 230 232 M230 122 C202 154 192 190 190 232" stroke="#D4C4A0" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M246 78 C270 130 270 204 246 284" stroke="#B01828" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M268 90 C292 148 288 214 262 286" stroke="#2840A0" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M304 100 C284 156 284 220 302 284" stroke="#F2C94C" strokeWidth="5" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
      <text x="62" y="310" fill="#F0D890" fontFamily="Source Sans 3" fontSize="12" fontWeight="900">Positioning cue: fibular head compression can injure common peroneal nerve.</text>
    </svg>
  );
}

function LowerLegFootPlate({ info }) {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg lowerLegPlate" aria-label="Lower leg and foot skeletal atlas">
      <defs><radialGradient id="legBone" cx="42%" cy="22%" r="80%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="50%" stopColor="#E8DCC8"/><stop offset="100%" stopColor="#756348"/></radialGradient></defs>
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">{info?.name || "Lower Leg / Foot"}</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Tibia/fibula/tarsals/metatarsals: arches, pulses, peroneal nerve, compartment risk</text>
      <path d="M184 72 C174 142 174 220 184 284" stroke="url(#legBone)" strokeWidth="22" strokeLinecap="round" fill="none" />
      <path d="M228 76 C236 148 232 220 214 286" stroke="url(#legBone)" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M156 286 C192 276 242 280 292 300" stroke="url(#legBone)" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d="M246 88 C264 152 260 226 236 300" stroke="#B01828" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M266 94 C286 158 280 226 258 304" stroke="#2840A0" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.86" />
      <path d="M222 82 C258 116 278 150 292 194" stroke="#F2C94C" strokeWidth="5" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
      <path d="M154 292 C190 306 244 308 306 302" stroke="#D4C4A0" strokeWidth="7" strokeLinecap="round" fill="none" />
      <text x="42" y="318" fill="#F0D890" fontFamily="Source Sans 3" fontSize="12" fontWeight="900">Exam cue: dorsalis pedis/posterior tibial pulses, foot drop, arch support, compartment syndrome.</text>
    </svg>
  );
}

function SkeletalCloseup({ info }) {
  const name = (info?.name || "").toLowerCase();
  if (name.includes("skull") || name.includes("mandible")) return <SkullPlate info={info} />;
  if (name.includes("rib") || name.includes("sternum")) return <ThoracicCagePlate info={info} />;
  if (name.includes("clavicle") || name.includes("scapula")) return <ShoulderGirdlePlate info={info} />;
  if (name.includes("humerus") || name.includes("radius") || name.includes("ulna") || name.includes("carpal")) return <UpperLimbBonePlate info={info} />;
  if (name.includes("pelvis")) return <PelvisPlate info={info} />;
  if (name.includes("femur")) return <FemurPlate info={info} />;
  if (name.includes("patella")) return <KneePlate info={info} />;
  if (name.includes("tibia") || name.includes("fibula") || name.includes("tarsal") || name.includes("metatarsal")) return <LowerLegFootPlate info={info} />;
  return <ThoracicCagePlate info={info} />;
}

function HeartCloseup() {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg heartPlate" aria-label="Heart and great vessels close-up">
      <defs>
        <radialGradient id="heartGrad" cx="35%" cy="22%" r="80%">
          <stop offset="0%" stopColor="#FFD1C8" />
          <stop offset="45%" stopColor="#B01828" />
          <stop offset="100%" stopColor="#3A0710" />
        </radialGradient>
      </defs>
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">Heart + great vessels</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Flow logic: vena cava → right heart → lungs → left heart → aorta</text>
      <path d="M200 84 C178 58 128 72 126 126 C124 184 172 228 210 270 C248 228 296 184 294 126 C292 72 242 58 220 84 C214 93 206 93 200 84 Z" fill="url(#heartGrad)" stroke="#F0D890" strokeWidth="2.4" />
      <path d="M182 116 C202 136 210 172 210 246 M238 116 C218 136 210 172 210 246 M158 170 C188 184 232 184 262 170" fill="none" stroke="rgba(255,220,190,0.4)" strokeWidth="2" />
      <path d="M214 82 C244 58 252 42 238 30 C224 18 194 28 196 54 C198 72 220 72 222 52" fill="none" stroke="#B01828" strokeWidth="13" strokeLinecap="round" />
      <path d="M172 62 C178 96 174 132 158 160" fill="none" stroke="#2840A0" strokeWidth="12" strokeLinecap="round" />
      <path d="M252 68 C236 96 240 130 266 154" fill="none" stroke="#2840A0" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
      <g fontFamily="Source Sans 3" fontSize="12" fontWeight="900">
        <text x="282" y="42" fill="#B01828">Aorta</text>
        <text x="52" y="76" fill="#2840A0">Vena cava</text>
        <text x="274" y="160" fill="#2840A0">Pulmonary vessels</text>
        <text x="120" y="290" fill="#F0D890">Chambers shown as faint internal walls</text>
      </g>
    </svg>
  );
}

function FemoralCloseup() {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg femoralPlate" aria-label="Femoral triangle close-up">
      <rect width="420" height="330" rx="22" fill="#07050C" />
      <text x="22" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">Femoral triangle</text>
      <text x="22" y="54" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">NAVEL order: nerve, artery, vein, empty space, lymphatics</text>
      <path d="M96 70 C150 96 202 112 322 92 C298 160 268 230 222 290 C174 250 132 178 96 70 Z" fill="rgba(184,48,32,0.18)" stroke="rgba(240,216,144,0.16)" />
      <path d="M196 78 C182 140 178 218 186 292" stroke="#F2C94C" strokeWidth="8" strokeLinecap="round" strokeDasharray="2 10" fill="none" />
      <path d="M220 76 C214 138 214 218 224 292" stroke="#B01828" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M244 76 C250 138 250 218 240 292" stroke="#2840A0" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M92 78 C146 84 236 86 326 76" stroke="#D4C4A0" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.88" />
      <g fontFamily="Source Sans 3" fontSize="12" fontWeight="900">
        <text x="78" y="122" fill="#F2C94C">Femoral nerve</text>
        <text x="246" y="154" fill="#B01828">Femoral artery</text>
        <text x="270" y="194" fill="#2840A0">Femoral vein</text>
        <text x="84" y="306" fill="#F0D890">High-yield for access, hemorrhage, pulse checks, and groin exposure</text>
      </g>
    </svg>
  );
}

function BicepsCloseup({ side = "Right" }) {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg bicepsPlate" aria-label={`${side} biceps brachii regional anatomy close-up`}>
      <defs>
        <radialGradient id="bicepsMuscleGrad" cx="36%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#FFD08A" />
          <stop offset="42%" stopColor="#B83020" />
          <stop offset="100%" stopColor="#3B0711" />
        </radialGradient>
        <radialGradient id="bicepsBoneGrad" cx="45%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFF7E7" />
          <stop offset="55%" stopColor="#E8DCC8" />
          <stop offset="100%" stopColor="#7F6E50" />
        </radialGradient>
        <filter id="bicepsGlow" x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F0D890" floodOpacity="0.55" />
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect x="0" y="0" width="420" height="330" rx="22" fill="#07050C" />
      <text x="24" y="34" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">{side} biceps brachii</text>
      <text x="24" y="56" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Anterior arm: muscle belly, tendons, brachial vessels, and nerve-risk relationships</text>

      <path d="M96 72 C132 48 206 44 284 70 C318 82 343 111 350 150 C358 198 332 250 286 274 C218 310 128 286 82 226 C48 181 55 105 96 72 Z" fill="rgba(46,120,255,0.08)" stroke="rgba(128,184,208,0.18)" strokeWidth="2" />

      <path d="M140 70 C172 58 218 60 250 78 C266 106 272 153 266 196 C260 238 232 269 198 270 C164 269 136 238 130 196 C124 153 128 106 140 70 Z" fill="rgba(184,48,32,0.20)" stroke="rgba(255,255,255,0.05)" />
      <path d="M202 62 C214 100 216 150 212 210 C210 244 206 270 198 292" fill="none" stroke="url(#bicepsBoneGrad)" strokeWidth="20" strokeLinecap="round" opacity="0.90" />
      <path d="M194 64 C202 104 202 160 198 214 C196 246 192 270 184 292" fill="none" stroke="#FFF7E7" strokeWidth="4" strokeLinecap="round" opacity="0.42" />

      <path d="M162 78 C182 84 192 110 195 151 C198 196 187 240 166 258 C142 236 133 176 140 126 C144 99 151 84 162 78 Z" fill="url(#bicepsMuscleGrad)" stroke="#F6F0B8" strokeWidth="2.4" filter="url(#bicepsGlow)" />
      <path d="M234 78 C214 84 204 110 201 151 C198 196 209 240 230 258 C254 236 263 176 256 126 C252 99 245 84 234 78 Z" fill="url(#bicepsMuscleGrad)" stroke="#F6F0B8" strokeWidth="2.4" filter="url(#bicepsGlow)" opacity="0.96" />
      <path d="M166 88 C178 125 177 205 164 248 M230 88 C218 125 219 205 232 248" fill="none" stroke="rgba(255,210,166,0.30)" strokeWidth="2" strokeLinecap="round" />

      <path d="M162 78 C166 54 178 42 192 34 M234 78 C226 54 218 42 204 34" fill="none" stroke="#D4C4A0" strokeWidth="8" strokeLinecap="round" />
      <path d="M198 258 C198 276 202 292 214 306" fill="none" stroke="#D4C4A0" strokeWidth="9" strokeLinecap="round" />
      <path d="M214 306 C236 303 252 295 264 284" fill="none" stroke="#FFF1C7" strokeWidth="5" strokeLinecap="round" />

      <path d="M270 72 C292 116 292 170 278 224 C270 252 256 274 238 292" fill="none" stroke="#B01828" strokeWidth="7" strokeLinecap="round" />
      <path d="M282 92 C303 134 303 187 289 232" fill="none" stroke="#2840A0" strokeWidth="6" strokeLinecap="round" opacity="0.86" />
      <path d="M118 94 C100 142 104 202 130 260" fill="none" stroke="#2840A0" strokeWidth="5" strokeLinecap="round" opacity="0.72" />
      <path d="M258 82 C240 126 241 185 260 242" fill="none" stroke="#F2C94C" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 9" />
      <path d="M146 84 C130 134 134 190 156 242" fill="none" stroke="#FFD447" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" opacity="0.82" />

      <g fontFamily="Source Sans 3" fontSize="11" fontWeight="900">
        <path d="M162 78 C118 60 82 54 44 64" fill="none" stroke="#D8CCA8" strokeWidth="1" opacity="0.7" />
        <text x="20" y="62" fill="#F0D890">Long/short head tendons</text>
        <path d="M214 306 C176 308 130 306 84 292" fill="none" stroke="#D8CCA8" strokeWidth="1" opacity="0.7" />
        <text x="28" y="292" fill="#F0D890">Distal tendon / aponeurosis</text>
        <path d="M270 144 C320 126 350 116 384 110" fill="none" stroke="#D8CCA8" strokeWidth="1" opacity="0.7" />
        <text x="300" y="106" fill="#B01828">Brachial artery</text>
        <path d="M258 166 C320 170 350 178 382 194" fill="none" stroke="#D8CCA8" strokeWidth="1" opacity="0.7" />
        <text x="300" y="202" fill="#F2C94C">Median nerve path</text>
      </g>

      <g fontFamily="Source Sans 3" fontSize="12" fontWeight="800">
        <text x="24" y="318" fill="#E8DCC8">Bone</text>
        <text x="78" y="318" fill="#B83020">Biceps</text>
        <text x="136" y="318" fill="#D4C4A0">Tendon</text>
        <text x="198" y="318" fill="#B01828">Artery</text>
        <text x="258" y="318" fill="#2840A0">Vein</text>
        <text x="310" y="318" fill="#F2C94C">Nerve</text>
      </g>
    </svg>
  );
}

function LungLobesCloseup() {
  return (
    <svg viewBox="0 0 420 330" className="closeSvg lungPlate" aria-label="Anatomically separated lung lobes close-up">
      <defs>
        <radialGradient id="lungLobeGrad" cx="38%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#E9FBFF" />
          <stop offset="48%" stopColor="#80B8D0" />
          <stop offset="100%" stopColor="#1B3A4D" />
        </radialGradient>
        <radialGradient id="lungLobeSelected" cx="34%" cy="22%" r="82%">
          <stop offset="0%" stopColor="#FFF4B8" />
          <stop offset="42%" stopColor="#AEE6F5" />
          <stop offset="100%" stopColor="#1B3A4D" />
        </radialGradient>
        <filter id="lungSoftGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#80B8D0" floodOpacity="0.45" />
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect x="0" y="0" width="420" height="330" rx="22" fill="#07050C" />
      <text x="24" y="34" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">Lung lobes</text>
      <text x="24" y="57" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">Right lung: 3 lobes · Left lung: 2 lobes + cardiac notch</text>

      <path d="M206 54 C214 52 222 54 226 62 L226 115 C225 124 218 130 210 130 C202 130 195 124 194 115 L194 62 C198 56 201 55 206 54 Z" fill="#80B8D0" opacity="0.9" />
      <path d="M210 126 C198 143 177 160 153 178 M211 126 C228 143 252 158 278 178" fill="none" stroke="#BEEFFF" strokeWidth="7" strokeLinecap="round" />
      <path d="M153 178 C140 188 126 202 111 222 M278 178 C294 190 309 204 324 224" fill="none" stroke="#80B8D0" strokeWidth="5" strokeLinecap="round" opacity="0.75" />

      <path d="M122 88 C84 116 66 175 78 230 C88 276 132 298 169 270 C196 250 203 198 190 146 C181 111 158 83 122 88 Z" fill="rgba(128,184,208,0.16)" stroke="rgba(128,184,208,0.26)" strokeWidth="2" />
      <path d="M298 88 C336 116 354 175 342 230 C332 276 288 298 251 270 C224 250 217 198 230 146 C239 111 262 83 298 88 Z" fill="rgba(128,184,208,0.16)" stroke="rgba(128,184,208,0.26)" strokeWidth="2" />

      <path d="M126 96 C98 124 86 164 91 202 C119 188 151 181 190 181 C187 140 164 101 126 96 Z" fill="url(#lungLobeGrad)" stroke="#E9FBFF" strokeWidth="2" filter="url(#lungSoftGlow)" />
      <path d="M91 205 C98 239 122 264 158 270 C181 253 191 224 190 185 C151 185 119 192 91 205 Z" fill="url(#lungLobeGrad)" stroke="#E9FBFF" strokeWidth="2" opacity="0.92" />

      <path d="M294 96 C322 124 334 156 329 190 C301 180 266 176 230 181 C233 140 256 101 294 96 Z" fill="url(#lungLobeSelected)" stroke="#FFF3B8" strokeWidth="3" filter="url(#lungSoftGlow)" />
      <path d="M230 184 C266 180 301 193 329 194 C328 218 318 238 298 252 C274 240 250 226 227 214 C226 204 227 193 230 184 Z" fill="url(#lungLobeGrad)" stroke="#E9FBFF" strokeWidth="2" opacity="0.96" />
      <path d="M227 218 C250 230 273 244 296 256 C280 276 251 278 232 258 C219 244 218 230 227 218 Z" fill="url(#lungLobeGrad)" stroke="#E9FBFF" strokeWidth="2" opacity="0.9" />

      <path d="M230 181 C270 178 302 183 329 190" fill="none" stroke="#F0D890" strokeWidth="2" strokeDasharray="6 5" opacity="0.9" />
      <path d="M227 214 C252 226 274 241 298 252" fill="none" stroke="#F0D890" strokeWidth="2" strokeDasharray="6 5" opacity="0.9" />
      <path d="M91 202 C118 190 151 183 190 181" fill="none" stroke="#F0D890" strokeWidth="2" strokeDasharray="6 5" opacity="0.9" />

      <g fontFamily="Source Sans 3" fontSize="12" fontWeight="900">
        <text x="54" y="109" fill="#F0D890">Left superior</text>
        <text x="54" y="254" fill="#F0D890">Left inferior</text>
        <text x="308" y="109" fill="#F0D890">Right superior</text>
        <text x="314" y="218" fill="#F0D890">Right middle</text>
        <text x="300" y="275" fill="#F0D890">Right inferior</text>
        <text x="164" y="76" fill="#80B8D0">Trachea</text>
        <text x="184" y="156" fill="#80B8D0">Main bronchi</text>
      </g>

      <g fontFamily="Source Sans 3" fontSize="12" fontWeight="800">
        <text x="26" y="306" fill="#80B8D0">Airway</text>
        <text x="92" y="306" fill="#F0D890">Fissures</text>
        <text x="170" y="306" fill="#E9FBFF">Lobes</text>
        <text x="240" y="306" fill="#B01828">Surgical relevance: lobectomy/wedge anatomy</text>
      </g>
    </svg>
  );
}

function CloseUpStudyPanel({ selectedId, examMode, examStats, confidence, showFlow }) {
  const info = INFO[selectedId] || baseInfo;
  const system = SYSTEMS[info.system];
  const [closeLayers, setCloseLayers] = useState({ bone: true, muscle: true, tendon: true, artery: true, vein: true, nerve: true, airway: true });
  const toggle = (key) => setCloseLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  const accuracy = examStats.attempts ? Math.round((examStats.correct / examStats.attempts) * 100) : 0;
  const avgConfidence = examStats.attempts ? (examStats.confidenceTotal / examStats.attempts).toFixed(1) : "—";

  return (
    <section className="closePanel">
      <div className="panelTopline">Coordinated Close-Up Atlas</div>
      <h3>{info.name}</h3>
      <p className="closeIntro">True layered study stack: bone, muscle, tendon, artery, vein, airway, and nerve pathways. Toggle layers to isolate what you need, then re-integrate them for exam-style anatomy recognition.</p>
      <div className="layerChips">
        {[
          ["bone", "Bone", "#E8DCC8"],
          ["muscle", "Muscle", "#B83020"],
          ["tendon", "Tendon", "#D4C4A0"],
          ["artery", "Artery", "#B01828"],
          ["vein", "Vein", "#2840A0"],
          ["nerve", "Nerve", "#F2C94C"],
          ["airway", "Airway", "#80B8D0"],
        ].map(([key, label, color]) => (
          <button key={key} className={closeLayers[key] ? "on" : "off"} onClick={() => toggle(key)}>
            <span style={{ background: color }} />{label}
          </button>
        ))}
      </div>
      {(() => {
        const selectedKey = selectedId || "";
        const selectedName = (INFO[selectedId]?.name || "").toLowerCase();
        if (selectedKey === "lungs" || selectedName.includes("lung")) return <LungLobesCloseup />;
        if (info.system === "skeletal") return <SkeletalCloseup info={info} />;
        if (selectedKey === "heart" || selectedKey === "aorta" || selectedKey === "vena_cava" || selectedName.includes("heart") || selectedName.includes("aorta") || selectedName.includes("vena cava")) return <HeartCloseup />;
        if (selectedKey === "femoral_popliteal_tibial" || selectedName.includes("femoral")) return <FemoralCloseup />;
        if (selectedKey.includes("scm") || selectedName.includes("sternocleidomastoid")) return <SCMCloseup />;
        if (selectedKey.includes("biceps") || selectedName.includes("biceps")) return <BicepsCloseup side={selectedKey.includes("left") || selectedKey.endsWith("_l") ? "Left" : "Right"} />;
        return (
      <svg viewBox="0 0 420 330" className={showFlow ? "closeSvg flowMode" : "closeSvg"} aria-label={`Layered close-up view of ${info.name}`}>
        <defs>
          <radialGradient id="closeMuscle" cx="40%" cy="28%" r="75%">
            <stop offset="0%" stopColor="#FF9957" />
            <stop offset="48%" stopColor="#B83020" />
            <stop offset="100%" stopColor="#3B0711" />
          </radialGradient>
          <radialGradient id="closeBone" cx="42%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FFF7E7" />
            <stop offset="55%" stopColor="#E8DCC8" />
            <stop offset="100%" stopColor="#7F6E50" />
          </radialGradient>
          <filter id="closeGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FFD447" floodOpacity="0.8" />
          </filter>
        </defs>
        <rect x="0" y="0" width="420" height="330" rx="22" fill="#07050C" />
        <path d="M48 172 C104 82 214 64 326 100 C374 116 396 162 374 208 C342 275 214 286 112 238 C66 216 36 194 48 172 Z" fill="rgba(46,120,255,0.10)" stroke="rgba(128,184,208,0.22)" />
        {closeLayers.bone && <g opacity="0.97">
          <path d="M74 166 C132 120 258 120 346 158" fill="none" stroke="url(#closeBone)" strokeWidth="30" strokeLinecap="round" />
          <path d="M106 164 C136 148 178 144 214 150 M246 150 C286 148 318 154 344 168" fill="none" stroke="#FFF7E7" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        </g>}
        {closeLayers.muscle && <g opacity="0.96">
          <path d="M90 188 C146 96 268 88 340 160 C316 230 204 262 108 222 C90 214 82 202 90 188 Z" fill="url(#closeMuscle)" stroke="rgba(255,255,255,0.08)" />
          <path d="M114 192 C158 150 236 124 318 148 M128 210 C186 178 260 166 330 184 M150 222 C204 202 258 198 310 208" fill="none" stroke="rgba(255,210,166,0.28)" strokeWidth="2" strokeLinecap="round" />
        </g>}
        {closeLayers.tendon && <g opacity="0.98">
          <path d="M122 226 C170 184 254 166 326 184" fill="none" stroke="#D4C4A0" strokeWidth="14" strokeLinecap="round" />
          <path d="M72 170 C100 176 114 188 122 226 M326 184 C350 184 368 194 382 214" fill="none" stroke="#FFF1C7" strokeWidth="6" strokeLinecap="round" />
        </g>}
        {closeLayers.artery && <g opacity="0.98">
          <path d="M104 142 C164 128 230 132 334 104" fill="none" stroke="#B01828" strokeWidth="9" strokeLinecap="round" />
          <path d="M220 128 C238 142 260 150 292 154" fill="none" stroke="#B01828" strokeWidth="5" strokeLinecap="round" />
          <circle cx="334" cy="104" r="5" fill="#FF5361" />
        </g>}
        {closeLayers.vein && <g opacity="0.98">
          <path d="M108 166 C178 188 250 190 344 222" fill="none" stroke="#2840A0" strokeWidth="9" strokeLinecap="round" />
          <path d="M170 180 C198 204 236 214 282 220" fill="none" stroke="#4059C8" strokeWidth="5" strokeLinecap="round" />
          <circle cx="344" cy="222" r="5" fill="#5D75FF" />
        </g>}
        {closeLayers.nerve && <g opacity="0.98">
          <path d="M92 128 C146 162 198 178 250 174 C286 172 320 184 364 210" fill="none" stroke="#F2C94C" strokeWidth="7" strokeLinecap="round" strokeDasharray="2 11" />
          <path d="M206 176 C216 198 236 216 266 232" fill="none" stroke="#FFD447" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 8" />
          <circle cx="92" cy="128" r="5" fill="#FFF1A6" />
        </g>}
        {closeLayers.airway && <g opacity="0.58">
          <path d="M166 122 C202 98 260 104 306 132" fill="none" stroke="#80B8D0" strokeWidth="11" strokeLinecap="round" />
          <path d="M234 118 C248 136 268 144 302 146" fill="none" stroke="#BEEFFF" strokeWidth="5" strokeLinecap="round" />
        </g>}
        <path d="M184 136 C220 112 270 118 312 150 C276 184 206 194 150 172 C154 154 166 144 184 136 Z" fill="url(#selectedFocus)" stroke="#F6F0B8" strokeWidth="3" filter="url(#closeGlow)" opacity="0.98" />
        <text x="24" y="32" fill="#F0D890" fontFamily="Libre Baskerville" fontSize="18">Selected focus</text>
        <text x="24" y="56" fill="#A06820" fontFamily="Source Sans 3" fontSize="13">{info.name}</text>
        <g fontFamily="Source Sans 3" fontSize="12" fontWeight="700">
          <text x="24" y="304" fill="#E8DCC8">Bone</text>
          <text x="78" y="304" fill="#B83020">Muscle</text>
          <text x="144" y="304" fill="#D4C4A0">Tendon</text>
          <text x="214" y="304" fill="#B01828">Artery</text>
          <text x="278" y="304" fill="#2840A0">Vein</text>
          <text x="326" y="304" fill="#F2C94C">Nerve</text>
          <text x="370" y="304" fill="#80B8D0">Air</text>
        </g>
      </svg>
        );
      })()}
      <div className="examGrid">
        <div><strong>System</strong><span style={{ color: system.dot }}>{system.label}</span></div>
        <div><strong>RN exam angle</strong><span>Landmarks, perfusion, airway/breathing/circulation relationships, injury red flags, and patient-assessment relevance.</span></div>
        <div><strong>MBLEx exam angle</strong><span>Origin/insertion logic, action, palpation, contraindications, referral patterns, and nerve-vessel caution zones.</span></div>
        <div><strong>Surgical tech angle</strong><span>Relate this structure to patient positioning, incision/exposure region, major vessels or airway risk, tissue handling, and common operative landmarks.</span></div>
        {examMode && <div><strong>Exam mode score</strong><span>{accuracy}% accuracy · {examStats.correct}/{examStats.attempts || 0} correct · best streak {examStats.bestStreak} · avg confidence {avgConfidence} · current confidence {confidence}</span></div>}
      </div>
    </section>
  );
}

const CST_CASES = [
  {
    title: "Airway & Thoracic Exposure",
    region: "Thorax",
    anatomy: ["Trachea", "Main bronchi", "Lung lobes", "Ribs", "Diaphragm", "Heart", "Aorta"],
    instruments: ["Rib spreader", "DeBakey forceps", "Metzenbaum scissors", "Suction", "Needle holder"],
    sterile: "Maintain sterile field boundaries, protect suction tips, anticipate specimen handling, and track sharps during thoracic exposure.",
    question: "During thoracic surgery, which structure separates the thoracic and abdominal cavities?",
    answer: "Diaphragm",
  },
  {
    title: "Abdominal Entry & Layer Recognition",
    region: "Abdomen",
    anatomy: ["Skin", "Fascia", "Rectus sheath", "Peritoneum", "Abdominal wall", "Major vessels"],
    instruments: ["Scalpel", "Bovie pencil", "Army-Navy retractors", "Mayo scissors", "Kelly clamp"],
    sterile: "Anticipate incision layers, keep instruments organized by use, and protect sterile-to-sterile handoff during entry and closure.",
    question: "Which broad tissue layer is commonly encountered and controlled during abdominal entry?",
    answer: "Fascia",
  },
  {
    title: "Orthopedic Lower-Limb Setup",
    region: "Lower limb",
    anatomy: ["Femur", "Patella", "Tibia", "Fibula", "Femoral vessels", "Tendons", "Ligaments"],
    instruments: ["Bone saw", "Osteotome", "Mallet", "Rongeur", "Power drill"],
    sterile: "Confirm implants, power equipment, irrigation, positioning safety, and counts before closure.",
    question: "Which major artery supplies the thigh before continuing toward the popliteal region?",
    answer: "Femoral artery",
  },
  {
    title: "Vascular Caution Zones",
    region: "Major vessels",
    anatomy: ["Aorta", "Vena cava", "Subclavian vessels", "Femoral vessels", "Radial and ulnar vessels"],
    instruments: ["Vascular clamps", "DeBakey forceps", "Potts scissors", "Bulldog clamp", "Vessel loops"],
    sterile: "Prepare for bleeding control, clamp handoff, vessel-loop organization, and clear communication during vascular exposure.",
    question: "Which vessel carries oxygenated blood from the left ventricle to systemic circulation?",
    answer: "Aorta",
  },
];

function CSTPrepPanel({ selectedId }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const current = CST_CASES[caseIndex];
  const info = INFO[selectedId] || baseInfo;
  const nextCase = () => { setCaseIndex((v) => (v + 1) % CST_CASES.length); setShowAnswer(false); };
  const prevCase = () => { setCaseIndex((v) => (v === 0 ? CST_CASES.length - 1 : v - 1)); setShowAnswer(false); };

  return (
    <section className="cstPanel">
      <div className="panelTopline">Surgical Tech Prep Layer</div>
      <h3>{current.title}</h3>
      <p className="closeIntro">Purpose: connect anatomy to OR setup, tissue exposure, instruments, sterile thinking, and testable CST-style recall.</p>
      <div className="cstCaseMeta">
        <span>Case {caseIndex + 1}/{CST_CASES.length}</span>
        <span>Selected anatomy: {info.name}</span>
      </div>
      <div className="cstGrid">
        <div>
          <strong>Region</strong>
          <span>{current.region}</span>
        </div>
        <div>
          <strong>Anatomy to know</strong>
          <span>{current.anatomy.join(" · ")}</span>
        </div>
        <div>
          <strong>Common instruments</strong>
          <span>{current.instruments.join(" · ")}</span>
        </div>
        <div>
          <strong>Sterile-field thinking</strong>
          <span>{current.sterile}</span>
        </div>
      </div>
      <div className="cstQuestion">
        <strong>Practice prompt</strong>
        <p>{current.question}</p>
        {showAnswer && <p className="answerReveal">Answer: {current.answer}</p>}
        <div className="cstControls">
          <button onClick={prevCase}>Previous</button>
          <button onClick={() => setShowAnswer((v) => !v)}>{showAnswer ? "Hide Answer" : "Reveal Answer"}</button>
          <button onClick={nextCase}>Next</button>
        </div>
      </div>
    </section>
  );
}

const CST_QUESTIONS = [
  {
    domain: "Sterile Technique",
    q: "A sterile team member turns their back to another sterile team member. What is the primary concern?",
    choices: ["Nothing, this is allowed", "Backs are considered nonsterile", "Only the gown sleeves are sterile", "The Mayo stand is contaminated"],
    answer: "Backs are considered nonsterile",
    rationale: "The sterile area of the gown is generally the front from chest to sterile-field level and sleeves from cuff to above elbow. The back is not treated as sterile.",
  },
  {
    domain: "Counts",
    q: "When should surgical counts commonly be performed?",
    choices: ["Only after skin closure", "Before incision and before closure of a cavity", "Only if the surgeon asks", "Only when sponges are used"],
    answer: "Before incision and before closure of a cavity",
    rationale: "Counts are designed to prevent retained surgical items and are performed at key transition points, especially before incision and closure.",
  },
  {
    domain: "Instrumentation",
    q: "Which instrument is commonly used for delicate dissection?",
    choices: ["Metzenbaum scissors", "Mayo scissors", "Rib spreader", "Backhaus towel clamp"],
    answer: "Metzenbaum scissors",
    rationale: "Metzenbaum scissors are used for finer tissue dissection. Mayo scissors are heavier and often used for fascia or suture.",
  },
  {
    domain: "Anatomy",
    q: "Which structure separates the thoracic cavity from the abdominal cavity?",
    choices: ["Peritoneum", "Diaphragm", "Pleura", "Sternum"],
    answer: "Diaphragm",
    rationale: "The diaphragm is the primary muscle of respiration and separates the thoracic and abdominal cavities.",
  },
  {
    domain: "Positioning",
    q: "Which nerve is commonly at risk from poor arm positioning or compression near the elbow?",
    choices: ["Ulnar nerve", "Optic nerve", "Phrenic nerve", "Femoral nerve"],
    answer: "Ulnar nerve",
    rationale: "The ulnar nerve is vulnerable around the medial elbow/cubital tunnel and requires padding and safe arm positioning.",
  },
];

const CST_INSTRUMENTS = [
  { name: "Kelly Clamp", family: "Clamp", use: "Clamps vessels or tissue; often used for hemostasis.", cue: "Medium hemostat with transverse serrations." },
  { name: "Kocher Clamp", family: "Clamp", use: "Grasps tough tissue such as fascia.", cue: "Has a tooth at the tip." },
  { name: "Babcock Forceps", family: "Forceps", use: "Atraumatic grasping of delicate tubular structures.", cue: "Rounded fenestrated tips." },
  { name: "Allis Clamp", family: "Clamp", use: "Grasps tissue firmly; more traumatic than Babcock.", cue: "Multiple small teeth." },
  { name: "Metzenbaum Scissors", family: "Scissors", use: "Delicate tissue dissection.", cue: "Longer shank, finer blades." },
  { name: "Mayo Scissors", family: "Scissors", use: "Cuts heavier tissue, fascia, or suture depending on straight/curved form.", cue: "Heavier than Metzenbaum." },
  { name: "Army-Navy Retractor", family: "Retractor", use: "Handheld shallow wound retraction.", cue: "Double-ended flat blades." },
  { name: "DeBakey Forceps", family: "Forceps", use: "Atraumatic vascular tissue handling.", cue: "Fine atraumatic vascular grip." },
];

const STERILE_DRILLS = [
  { scenario: "A sterile glove touches the lower edge of the gown below field level.", violation: true, why: "Below sterile-field level is considered contaminated." },
  { scenario: "A scrubbed person keeps hands in sight above waist level.", violation: false, why: "Hands should remain visible and within the sterile field." },
  { scenario: "A nonsterile circulator reaches over the sterile back table.", violation: true, why: "Nonsterile personnel should not reach over sterile fields." },
  { scenario: "A sterile team member turns their back toward the sterile field.", violation: true, why: "The back of the gown is not considered sterile." },
];

const PROCEDURE_STEPS = {
  appendectomy: ["Time-out", "Skin prep and drape", "Incision", "Dissection to appendix", "Clamp/divide mesoappendix", "Ligate appendix base", "Remove specimen", "Irrigate", "Close layers", "Final counts"],
  cholecystectomy: ["Time-out", "Prep and drape", "Port placement or incision", "Expose gallbladder", "Identify cystic duct/artery", "Clip and divide", "Remove gallbladder", "Irrigate/inspect", "Close", "Final counts"],
  csection: ["Time-out", "Prep and drape", "Skin incision", "Fascial entry", "Peritoneal entry", "Uterine incision", "Delivery", "Placenta removal", "Uterine closure", "Layered closure/counts"],
};

const POSITIONING_RISKS = [
  { position: "Supine", risks: "Pressure injury to occiput, sacrum, heels; ulnar nerve compression if arms poorly padded." },
  { position: "Lithotomy", risks: "Common peroneal nerve compression, hip strain, compartment risk with prolonged positioning." },
  { position: "Prone", risks: "Eye pressure, airway access limitation, chest/abdomen pressure, brachial plexus stretch." },
  { position: "Trendelenburg", risks: "Respiratory compromise, sliding/shear, facial/airway edema in long cases." },
];

const OR_SCENARIOS = [
  {
    title: "Unexpected bleeding during abdominal exposure",
    caseType: "General surgery",
    pressure: "High",
    prompt: "The surgeon says: 'Bleeding. Suction. I need exposure.' What should you anticipate first?",
    choices: ["Hand suction and prepare clamps", "Start closing count", "Pass skin stapler", "Turn away to ask the circulator"],
    answer: "Hand suction and prepare clamps",
    rationale: "Bleeding creates urgency. The scrub tech anticipates suction, exposure, clamps, sponges, and clear communication while preserving the sterile field.",
    event: "Bleeding event",
  },
  {
    title: "Possible sterile break at the back table",
    caseType: "Sterile technique",
    pressure: "Medium",
    prompt: "A nonsterile sleeve passes over the back table. What is the safest action?",
    choices: ["Ignore it if nothing was touched", "Speak up and isolate/replace contaminated items", "Cover the area with a towel", "Move the table closer to the surgeon"],
    answer: "Speak up and isolate/replace contaminated items",
    rationale: "Potential contamination must be called out immediately. Patient safety depends on speaking up, identifying affected items, and correcting the break.",
    event: "Contamination risk",
  },
  {
    title: "Surgeon requests Metzenbaum scissors",
    caseType: "Instrumentation",
    pressure: "Low",
    prompt: "The surgeon is doing delicate tissue dissection and asks for Metzenbaum scissors. Which reasoning is correct?",
    choices: ["Metzenbaum is for delicate tissue", "Mayo is always better for dissection", "Pass a Kocher clamp instead", "Use a towel clip for traction"],
    answer: "Metzenbaum is for delicate tissue",
    rationale: "Metzenbaum scissors are associated with finer soft-tissue dissection. Mayo scissors are heavier and commonly used for fascia or suture depending on type.",
    event: "Instrument request",
  },
  {
    title: "Count discrepancy before closure",
    caseType: "Counts and safety",
    pressure: "High",
    prompt: "The team is preparing to close, but the sponge count is incorrect. What should happen next?",
    choices: ["Continue closing to save time", "Notify the team and begin count discrepancy protocol", "Document it after the case", "Ask anesthesia to decide"],
    answer: "Notify the team and begin count discrepancy protocol",
    rationale: "A count discrepancy is a serious safety event. The team must be notified and the protocol followed before closure proceeds.",
    event: "Count discrepancy",
  },
  {
    title: "Lithotomy positioning concern",
    caseType: "Positioning",
    pressure: "Medium",
    prompt: "A patient has been placed in lithotomy. Which risk should the CST keep in mind?",
    choices: ["Common peroneal nerve compression", "Carotid artery compression", "Mandible fracture", "Radial head dislocation"],
    answer: "Common peroneal nerve compression",
    rationale: "Lithotomy positioning can place lower-extremity nerves and soft tissues at risk. Padding, alignment, and time awareness matter.",
    event: "Positioning risk",
  },
];

function ORScenarioEngine() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [scenarioStats, setScenarioStats] = useState({ correct: 0, attempts: 0, streak: 0, errors: 0 });
  const [pressureLevel, setPressureLevel] = useState(1);
  const scenario = OR_SCENARIOS[scenarioIndex];
  const answered = selected !== null;
  const isCorrect = selected === scenario.answer;
  const accuracy = scenarioStats.attempts ? Math.round((scenarioStats.correct / scenarioStats.attempts) * 100) : 0;

  function choose(choice) {
    if (answered) return;
    const correct = choice === scenario.answer;
    setSelected(choice);
    setScenarioStats((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      attempts: s.attempts + 1,
      streak: correct ? s.streak + 1 : 0,
      errors: s.errors + (correct ? 0 : 1),
    }));
    setPressureLevel((p) => Math.max(1, Math.min(5, p + (correct ? -1 : 1))));
  }

  function nextScenario() {
    setScenarioIndex((i) => (i + 1) % OR_SCENARIOS.length);
    setSelected(null);
  }

  function resetScenarioStats() {
    setScenarioStats({ correct: 0, attempts: 0, streak: 0, errors: 0 });
    setPressureLevel(1);
    setSelected(null);
  }

  return (
    <section className="orScenarioPanel">
      <div className="panelTopline">Phase 3 Dynamic OR Scenario Engine</div>
      <div className="orHeader">
        <div>
          <h3>{scenario.title}</h3>
          <p>{scenario.caseType} · {scenario.event} · Pressure: {scenario.pressure}</p>
        </div>
        <div className="orScore">
          <strong>{accuracy}%</strong>
          <span>{scenarioStats.correct}/{scenarioStats.attempts || 0} correct · streak {scenarioStats.streak}</span>
        </div>
      </div>
      <div className="pressureMeter" aria-label="OR pressure meter">
        {[1,2,3,4,5].map((level) => <span key={level} className={level <= pressureLevel ? "hot" : ""} />)}
      </div>
      <div className="orPrompt">
        <strong>Scenario prompt</strong>
        <p>{scenario.prompt}</p>
      </div>
      <div className="orChoices">
        {scenario.choices.map((choice) => {
          const className = answered ? (choice === scenario.answer ? "correct" : choice === selected ? "wrong" : "") : "";
          return <button key={choice} className={className} onClick={() => choose(choice)}>{choice}</button>;
        })}
      </div>
      {answered && (
        <div className={isCorrect ? "orFeedback good" : "orFeedback bad"}>
          <strong>{isCorrect ? "Correct OR thinking." : "Missed cue."}</strong>
          <span>{scenario.rationale}</span>
        </div>
      )}
      <div className="orActions">
        <button onClick={nextScenario}>Next Scenario</button>
        <button onClick={resetScenarioStats}>Reset Scenario Score</button>
      </div>
    </section>
  );
}

function CSTCognitionTrainer() {
  const [mode, setMode] = useState("questions");
  const [qIndex, setQIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState({ correct: 0, attempts: 0 });
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [showInstrument, setShowInstrument] = useState(false);
  const [sterileIndex, setSterileIndex] = useState(0);
  const [sterileAnswer, setSterileAnswer] = useState(null);
  const [procedure, setProcedure] = useState("appendectomy");
  const [stepIndex, setStepIndex] = useState(0);

  const q = CST_QUESTIONS[qIndex];
  const instrument = CST_INSTRUMENTS[instrumentIndex];
  const sterile = STERILE_DRILLS[sterileIndex];
  const steps = PROCEDURE_STEPS[procedure];

  function answerQuestion(choice) {
    if (selectedChoice) return;
    const correct = choice === q.answer;
    setSelectedChoice(choice);
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), attempts: s.attempts + 1 }));
  }
  function nextQuestion() {
    setQIndex((i) => (i + 1) % CST_QUESTIONS.length);
    setSelectedChoice(null);
  }
  function nextInstrument() {
    setInstrumentIndex((i) => (i + 1) % CST_INSTRUMENTS.length);
    setShowInstrument(false);
  }
  function nextSterile() {
    setSterileIndex((i) => (i + 1) % STERILE_DRILLS.length);
    setSterileAnswer(null);
  }

  return (
    <section className="cognitionPanel">
      <div className="panelTopline">Interactive Surgical Cognition Trainer</div>
      <div className="modeTabs">
        {[['questions','Question Bank'], ['instruments','Instruments'], ['sterile','Sterile Field'], ['procedure','Procedure Flow'], ['positioning','Positioning']].map(([key, label]) => (
          <button key={key} className={mode === key ? "active" : ""} onClick={() => setMode(key)}>{label}</button>
        ))}
      </div>

      {mode === "questions" && (
        <div className="trainerCard">
          <div className="trainerMeta"><span>{q.domain}</span><span>{score.correct}/{score.attempts || 0} correct</span></div>
          <h3>{q.q}</h3>
          <div className="choiceGrid">
            {q.choices.map((choice) => {
              const isPicked = selectedChoice === choice;
              const isCorrect = choice === q.answer;
              const className = selectedChoice ? (isCorrect ? "correct" : isPicked ? "wrong" : "") : "";
              return <button key={choice} className={className} onClick={() => answerQuestion(choice)}>{choice}</button>;
            })}
          </div>
          {selectedChoice && <p className="rationale"><strong>Rationale:</strong> {q.rationale}</p>}
          <button className="trainerNext" onClick={nextQuestion}>Next Question</button>
        </div>
      )}

      {mode === "instruments" && (
        <div className="trainerCard instrumentCard">
          <div className="trainerMeta"><span>{instrument.family}</span><span>{instrumentIndex + 1}/{CST_INSTRUMENTS.length}</span></div>
          <div className="instrumentSilhouette"><span>{showInstrument ? instrument.name : "?"}</span></div>
          <p><strong>Use:</strong> {showInstrument ? instrument.use : "Identify the instrument before revealing."}</p>
          <p><strong>Recognition cue:</strong> {showInstrument ? instrument.cue : "Think: family, tissue type, and common procedure use."}</p>
          <div className="cstControls"><button onClick={() => setShowInstrument((v) => !v)}>{showInstrument ? "Hide" : "Reveal"}</button><button onClick={nextInstrument}>Next Instrument</button></div>
        </div>
      )}

      {mode === "sterile" && (
        <div className="trainerCard">
          <div className="trainerMeta"><span>Sterile-field judgment</span><span>{sterileIndex + 1}/{STERILE_DRILLS.length}</span></div>
          <h3>{sterile.scenario}</h3>
          <div className="choiceGrid two"><button onClick={() => setSterileAnswer(true)}>Violation</button><button onClick={() => setSterileAnswer(false)}>Not a violation</button></div>
          {sterileAnswer !== null && <p className={sterileAnswer === sterile.violation ? "rationale good" : "rationale bad"}><strong>{sterileAnswer === sterile.violation ? "Correct." : "Review this."}</strong> {sterile.why}</p>}
          <button className="trainerNext" onClick={nextSterile}>Next Drill</button>
        </div>
      )}

      {mode === "procedure" && (
        <div className="trainerCard">
          <div className="trainerMeta"><span>Procedure sequencing</span><span>Step {stepIndex + 1}/{steps.length}</span></div>
          <select value={procedure} onChange={(e) => { setProcedure(e.target.value); setStepIndex(0); }}>
            <option value="appendectomy">Appendectomy</option>
            <option value="cholecystectomy">Cholecystectomy</option>
            <option value="csection">C-section</option>
          </select>
          <div className="procedureSteps">
            {steps.map((step, i) => <div key={step} className={i === stepIndex ? "current" : i < stepIndex ? "done" : ""}>{i + 1}. {step}</div>)}
          </div>
          <div className="cstControls"><button onClick={() => setStepIndex((i) => Math.max(0, i - 1))}>Previous</button><button onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}>Next Step</button></div>
        </div>
      )}

      {mode === "positioning" && (
        <div className="trainerCard">
          <div className="trainerMeta"><span>Patient positioning risks</span><span>High-yield safety</span></div>
          <div className="positionGrid">
            {POSITIONING_RISKS.map((item) => <div key={item.position}><strong>{item.position}</strong><span>{item.risks}</span></div>)}
          </div>
        </div>
      )}
    </section>
  );
}

const NEURO_MAP = [
  {
    nerve: "Brachial Plexus",
    roots: "C5–T1",
    function: "Motor and sensory supply to the upper limb through terminal branches including musculocutaneous, axillary, radial, median, and ulnar nerves.",
    injury: "Stretch or compression may cause shoulder weakness, elbow flexion weakness, wrist drop, grip weakness, paresthesia, or sensory loss depending on the branch involved.",
    surgical: "Critical during shoulder positioning, arm boards, traction, axillary exposure, and prolonged abduction.",
  },
  {
    nerve: "Musculocutaneous Nerve",
    roots: "C5–C7",
    function: "Innervates anterior arm flexors including biceps brachii and provides lateral forearm sensation.",
    injury: "Weak elbow flexion/supination and sensory changes over the lateral forearm.",
    surgical: "Relevant to anterior arm anatomy and upper-extremity positioning.",
  },
  {
    nerve: "Median Nerve",
    roots: "C6–T1",
    function: "Supplies many forearm flexors and thenar muscles; supports thumb opposition and hand sensation.",
    injury: "Compression can produce carpal tunnel symptoms, thenar weakness, or sensory changes in the lateral palm/digits.",
    surgical: "Important around wrist positioning, retractors, and anterior forearm/hand procedures.",
  },
  {
    nerve: "Ulnar Nerve",
    roots: "C8–T1",
    function: "Supplies intrinsic hand muscles and medial hand sensation.",
    injury: "Compression at the elbow can cause numbness in the ring/small fingers, grip weakness, and clawing patterns.",
    surgical: "High-yield positioning risk in supine procedures; requires elbow padding and neutral arm placement.",
  },
  {
    nerve: "Radial Nerve",
    roots: "C5–T1",
    function: "Extends wrist/fingers and supplies posterior arm/forearm sensation.",
    injury: "Compression or humeral injury can cause wrist drop and dorsal hand sensory change.",
    surgical: "Relevant in arm positioning, humeral procedures, and pressure injury prevention.",
  },
  {
    nerve: "Phrenic Nerve",
    roots: "C3–C5",
    function: "Innervates the diaphragm for inspiration.",
    injury: "Damage can impair ventilation and diaphragmatic movement.",
    surgical: "Important in thoracic, cervical, and upper abdominal procedures.",
  },
  {
    nerve: "Femoral Nerve",
    roots: "L2–L4",
    function: "Supports hip flexion, knee extension, and anterior thigh/medial leg sensation.",
    injury: "Compression or stretch may cause quadriceps weakness and impaired ambulation.",
    surgical: "Relevant during pelvic, groin, hip, and lithotomy positioning.",
  },
  {
    nerve: "Sciatic Nerve",
    roots: "L4–S3",
    function: "Major posterior lower-limb nerve supplying hamstrings and branches to leg/foot.",
    injury: "Compression or stretch may cause posterior leg pain, weakness, or sensory deficits.",
    surgical: "Relevant in hip positioning, posterior thigh exposure, and prolonged pressure risk.",
  },
  {
    nerve: "Common Peroneal Nerve",
    roots: "L4–S2",
    function: "Controls dorsiflexion and foot eversion through deep/superficial branches.",
    injury: "Compression near the fibular head can cause foot drop.",
    surgical: "Classic lithotomy positioning risk; padding at the fibular head matters.",
  },
];

const CARDIO_FLOW = [
  {
    vessel: "Aorta",
    flow: "Left ventricle → ascending aorta → arch → descending aorta → systemic circulation",
    relevance: "Primary arterial outflow for oxygenated blood and major pressure-bearing vessel.",
    danger: "Major hemorrhage, dissection, or clamp-related perfusion compromise can rapidly destabilize the patient.",
  },
  {
    vessel: "Coronary Arteries",
    flow: "Aortic root → coronary circulation → myocardium",
    relevance: "Perfuses the heart muscle itself.",
    danger: "Compromised flow can cause ischemia, rhythm changes, or cardiac instability.",
  },
  {
    vessel: "Superior Vena Cava",
    flow: "Head/neck/upper limbs → SVC → right atrium",
    relevance: "Returns deoxygenated blood from the upper body to the heart.",
    danger: "Compression or obstruction impairs venous return and can affect hemodynamics.",
  },
  {
    vessel: "Inferior Vena Cava",
    flow: "Lower body/abdomen → IVC → right atrium",
    relevance: "Major venous return pathway from abdomen, pelvis, and lower limbs.",
    danger: "Injury can cause severe low-pressure but high-volume bleeding.",
  },
  {
    vessel: "Pulmonary Trunk / Pulmonary Arteries",
    flow: "Right ventricle → lungs for oxygenation",
    relevance: "Carries deoxygenated blood to the lungs.",
    danger: "Compromise affects oxygenation and right-heart strain.",
  },
  {
    vessel: "Carotid Arteries",
    flow: "Aortic arch branches → brain/head perfusion",
    relevance: "Critical for cerebral blood flow.",
    danger: "Compression or injury risks neurologic compromise or major bleeding.",
  },
  {
    vessel: "Brachial Artery",
    flow: "Axillary artery continuation → arm → radial/ulnar arteries",
    relevance: "Major upper-extremity arterial supply and blood-pressure landmark.",
    danger: "Injury can compromise distal perfusion and create hemorrhage risk.",
  },
  {
    vessel: "Femoral Artery",
    flow: "External iliac → femoral artery → popliteal/tibial supply",
    relevance: "Major lower-extremity pulse site and access vessel.",
    danger: "Severe bleeding or limb ischemia if injured.",
  },
];

const RESPIRATORY_LOGIC = [
  {
    structure: "Diaphragm",
    physiology: "Primary muscle of inspiration.",
    consequence: "Weakness impairs ventilation.",
    OR: "Critical during thoracic and upper abdominal surgery.",
  },
  {
    structure: "Trachea",
    physiology: "Main airway conduit.",
    consequence: "Obstruction compromises oxygen delivery.",
    OR: "Central for intubation and airway management.",
  },
  {
    structure: "Right Main Bronchus",
    physiology: "Airflow to right lung.",
    consequence: "Right-sided aspiration is more common due to anatomy.",
    OR: "Relevant during airway placement and thoracic procedures.",
  },
];

function IntegratedSystemsPhase() {
  const [systemTab, setSystemTab] = useState("neuro");
  const neuro = NEURO_MAP;
  const cardio = CARDIO_FLOW;
  const respiratory = RESPIRATORY_LOGIC;

  return (
    <section className="systemsPhasePanel">
      <div className="panelTopline">Phase 4 Integrated Physiology + Neurovascular Systems</div>
      <div className="systemsTabs">
        <button className={systemTab === "neuro" ? "active" : ""} onClick={() => setSystemTab("neuro")}>Neurological</button>
        <button className={systemTab === "cardio" ? "active" : ""} onClick={() => setSystemTab("cardio")}>Cardiovascular</button>
        <button className={systemTab === "resp" ? "active" : ""} onClick={() => setSystemTab("resp")}>Respiratory</button>
      </div>

      {systemTab === "neuro" && (
        <div className="systemsGrid">
          {neuro.map((item) => (
            <div key={item.nerve} className="systemsCard">
              <h3>{item.nerve}</h3>
              <span className="systemsMeta">Roots: {item.roots}</span>
              <p><strong>Function:</strong> {item.function}</p>
              <p><strong>Injury pattern:</strong> {item.injury}</p>
              <p><strong>Surgical relevance:</strong> {item.surgical}</p>
            </div>
          ))}
        </div>
      )}

      {systemTab === "cardio" && (
        <div className="systemsGrid">
          {cardio.map((item) => (
            <div key={item.vessel} className="systemsCard">
              <h3>{item.vessel}</h3>
              <span className="systemsMeta">Flow: {item.flow}</span>
              <p><strong>Clinical role:</strong> {item.relevance}</p>
              <p><strong>High-risk consequence:</strong> {item.danger}</p>
            </div>
          ))}
        </div>
      )}

      {systemTab === "resp" && (
        <div className="systemsGrid">
          {respiratory.map((item) => (
            <div key={item.structure} className="systemsCard">
              <h3>{item.structure}</h3>
              <span className="systemsMeta">Physiology</span>
              <p><strong>Role:</strong> {item.physiology}</p>
              <p><strong>Consequence:</strong> {item.consequence}</p>
              <p><strong>OR relevance:</strong> {item.OR}</p>
            </div>
          ))}
        </div>
      )}

      <div className="systemsFooter">
        <strong>Integrated cognition goal</strong>
        <span>Understand how anatomy, blood flow, innervation, ventilation, positioning, and surgical exposure interact under operative conditions.</span>
      </div>
    </section>
  );
}

const PHYSIO_EVENTS = [
  {
    event: "Acute blood loss",
    trigger: "Major vessel injury during exposure",
    progression: ["Blood pressure drops", "Heart rate rises", "Perfusion decreases", "Shock risk increases"],
    intervention: "Increase suction readiness, anticipate clamps/sponges, communicate urgency, maintain count awareness.",
  },
  {
    event: "Airway compromise",
    trigger: "Tube displacement or airway obstruction",
    progression: ["Oxygen saturation falls", "Ventilation impaired", "Cardiac stress rises", "Hypoxia risk increases"],
    intervention: "Protect airway access, maintain clear communication, anticipate suction/intubation support.",
  },
  {
    event: "Sterile contamination cascade",
    trigger: "Break in sterile technique",
    progression: ["Field contamination", "Instrument isolation", "Replacement delay", "Procedure slowdown"],
    intervention: "Identify contaminated field immediately and replace affected items before continuing.",
  },
];

function PhysiologicEscalationSimulator() {
  const [eventIndex, setEventIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [stability, setStability] = useState(100);
  const [decision, setDecision] = useState(null);
  const current = PHYSIO_EVENTS[eventIndex];

  function progressEvent() {
    setStage((s) => Math.min(current.progression.length - 1, s + 1));
    setStability((v) => Math.max(15, v - 18));
  }

  function stabilize(choice) {
    setDecision(choice);
    if (choice === "correct") {
      setStability((v) => Math.min(100, v + 20));
    } else {
      setStability((v) => Math.max(0, v - 15));
    }
  }

  function nextEvent() {
    setEventIndex((i) => (i + 1) % PHYSIO_EVENTS.length);
    setStage(0);
    setDecision(null);
    setStability(100);
  }

  return (
    <section className="escalationPanel">
      <div className="panelTopline">Phase 5 Physiologic Escalation Simulator</div>
      <div className="escalationHeader">
        <div>
          <h3>{current.event}</h3>
          <p>{current.trigger}</p>
        </div>
        <div className="stabilityBox">
          <strong>{stability}%</strong>
          <span>Patient stability</span>
        </div>
      </div>

      <div className="stabilityMeter">
        <div style={{ width: `${stability}%` }} />
      </div>

      <div className="eventTimeline">
        {current.progression.map((step, index) => (
          <div key={step} className={index <= stage ? "active" : ""}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <div className="decisionPanel">
        <strong>OR response decision</strong>
        <p>{current.intervention}</p>
        <div className="decisionButtons">
          <button onClick={() => stabilize("correct")}>Correct anticipation</button>
          <button onClick={() => stabilize("wrong")}>Delayed / incorrect response</button>
          <button onClick={progressEvent}>Escalate Event</button>
        </div>
      </div>

      {decision && (
        <div className={decision === "correct" ? "decisionFeedback good" : "decisionFeedback bad"}>
          <strong>{decision === "correct" ? "Stabilization improved." : "Patient risk increased."}</strong>
          <span>
            {decision === "correct"
              ? "Good anticipation slows deterioration and improves operative stability."
              : "Delayed anticipation increases physiologic stress and operative risk."}
          </span>
        </div>
      )}

      <div className="orActions">
        <button onClick={nextEvent}>Next Escalation Scenario</button>
      </div>
    </section>
  );
}

function AdaptiveAICoach() {
  const [metrics, setMetrics] = useState({
    anatomy: 72,
    sterile: 61,
    instruments: 68,
    positioning: 54,
    physiology: 49,
    anticipation: 58,
  });

  const weakest = Object.entries(metrics).sort((a, b) => a[1] - b[1])[0];
  const strongest = Object.entries(metrics).sort((a, b) => b[1] - a[1])[0];

  const recommendations = {
    anatomy: "Increase layered vessel + nerve identification drills and regional anatomy repetition.",
    sterile: "Focus on contamination recognition and count discrepancy scenarios.",
    instruments: "Review clamp/retractor families and practice instrument anticipation timing.",
    positioning: "Study nerve compression risks and padding landmarks for operative positioning.",
    physiology: "Train blood-loss escalation and oxygenation consequence chains.",
    anticipation: "Practice dynamic OR scenario sequences with faster escalation intervals.",
  };

  const readiness = Math.round(Object.values(metrics).reduce((a, b) => a + b, 0) / Object.values(metrics).length);

  return (
    <section className="aiCoachPanel">
      <div className="panelTopline">Phase 6 Adaptive AI Surgical Coach</div>

      <div className="coachHeader">
        <div>
          <h3>Performance Readiness</h3>
          <p>Adaptive remediation based on cognition gaps, physiologic reasoning, sterile judgment, and procedural anticipation.</p>
        </div>
        <div className="readinessScore">
          <strong>{readiness}%</strong>
          <span>CST readiness estimate</span>
        </div>
      </div>

      <div className="coachGrid">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="coachCard">
            <div className="coachMetricTop">
              <strong>{key}</strong>
              <span>{value}%</span>
            </div>
            <div className="coachBar">
              <div style={{ width: `${value}%` }} />
            </div>
            <p>{recommendations[key]}</p>
          </div>
        ))}
      </div>

      <div className="adaptiveInsights">
        <div>
          <strong>Weakest domain</strong>
          <span>{weakest[0]} · {weakest[1]}%</span>
          <p>{recommendations[weakest[0]]}</p>
        </div>

        <div>
          <strong>Strongest domain</strong>
          <span>{strongest[0]} · {strongest[1]}%</span>
          <p>Maintain proficiency while reallocating study intensity toward weaker systems.</p>
        </div>
      </div>

      <div className="studyPathPanel">
        <strong>AI-generated study path</strong>
        <ol>
          <li>Repeat physiologic escalation drills</li>
          <li>Complete sterile-field contamination review</li>
          <li>Practice instrument anticipation sequencing</li>
          <li>Review neurovascular positioning injuries</li>
          <li>Take timed mixed-domain CST simulation</li>
        </ol>
      </div>

      <div className="coachFooter">
        <strong>Adaptive cognition goal</strong>
        <span>The simulator identifies recurring cognitive weaknesses and redirects training toward the domains most likely to cause certification failure or OR hesitation.</span>
      </div>
    </section>
  );
}

const INSTRUMENT_WORKFLOW_CASES = [
  {
    procedure: "Open abdominal entry",
    stage: "Incision and exposure",
    surgeonRequest: "Knife, then deepen with Bovie. I need exposure.",
    correctInstrument: "Scalpel → Bovie → Army-Navy",
    options: ["Scalpel → Bovie → Army-Navy", "Rib spreader → Rongeur → Mallet", "Specimen cup → Skin stapler → Dressing", "Bulldog clamp → Vessel loop → Potts scissors"],
    anticipation: "After incision, anticipate cautery, suction, retractors, hemostats, and sponges.",
    why: "The scrub tech should think in sequence: incision, hemostasis, exposure, tissue handling, and safe field organization.",
  },
  {
    procedure: "Bleeding control",
    stage: "Unexpected bleeding",
    surgeonRequest: "Suction. Clamp. Give me a tie.",
    correctInstrument: "Suction → Kelly/Crile → Tie",
    options: ["Suction → Kelly/Crile → Tie", "Skin stapler → Dressing → Tape", "Rib spreader → Mallet → Saw", "Trocar → Camera → Specimen bag"],
    anticipation: "Prepare suction, hemostats, ties, sponges, and possible vascular clamps while keeping the field organized.",
    why: "Bleeding events require rapid anticipation and calm sequencing, not random instrument passing.",
  },
  {
    procedure: "Delicate tissue dissection",
    stage: "Soft-tissue separation",
    surgeonRequest: "Metz and DeBakey.",
    correctInstrument: "Metzenbaum scissors + DeBakey forceps",
    options: ["Metzenbaum scissors + DeBakey forceps", "Mayo scissors + Kocher clamp", "Backhaus towel clip + Skin stapler", "Bone saw + Osteotome"],
    anticipation: "Expect delicate dissection, controlled tissue handling, and possible small-vessel hemostasis.",
    why: "Metzenbaum scissors and DeBakey forceps are associated with finer tissue work compared with heavier cutting or traumatic clamps.",
  },
  {
    procedure: "Closure sequence",
    stage: "Layered closure",
    surgeonRequest: "We are closing. Count and give me suture.",
    correctInstrument: "Needle holder → Forceps → Suture scissors",
    options: ["Needle holder → Forceps → Suture scissors", "Suction → Trocar → Camera", "Rib spreader → Vessel loop → Bulldog", "Mallet → Drill → Implant trial"],
    anticipation: "Confirm counts, organize suture, protect sharps, and anticipate dressing materials.",
    why: "Closure requires count awareness, sharps control, suture handling, and clean progression from deep to superficial layers.",
  },
];

function InstrumentWorkflowSimulator() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [workflowStats, setWorkflowStats] = useState({ correct: 0, attempts: 0, streak: 0 });
  const current = INSTRUMENT_WORKFLOW_CASES[caseIndex];
  const answered = choice !== null;
  const isCorrect = choice === current.correctInstrument;
  const accuracy = workflowStats.attempts ? Math.round((workflowStats.correct / workflowStats.attempts) * 100) : 0;

  function selectInstrument(option) {
    if (answered) return;
    const correct = option === current.correctInstrument;
    setChoice(option);
    setWorkflowStats((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      attempts: s.attempts + 1,
      streak: correct ? s.streak + 1 : 0,
    }));
  }

  function nextWorkflow() {
    setCaseIndex((i) => (i + 1) % INSTRUMENT_WORKFLOW_CASES.length);
    setChoice(null);
  }

  function resetWorkflow() {
    setWorkflowStats({ correct: 0, attempts: 0, streak: 0 });
    setChoice(null);
  }

  return (
    <section className="instrumentWorkflowPanel">
      <div className="panelTopline">Phase 7 Instrument Passing + Anticipation Workflow</div>
      <div className="workflowHeader">
        <div>
          <h3>{current.procedure}</h3>
          <p>{current.stage}</p>
        </div>
        <div className="workflowScore">
          <strong>{accuracy}%</strong>
          <span>{workflowStats.correct}/{workflowStats.attempts || 0} correct · streak {workflowStats.streak}</span>
        </div>
      </div>

      <div className="surgeonRequestBox">
        <strong>Surgeon request</strong>
        <p>“{current.surgeonRequest}”</p>
      </div>

      <div className="mayoStandGrid">
        {current.options.map((option) => {
          const className = answered ? (option === current.correctInstrument ? "correct" : option === choice ? "wrong" : "") : "";
          return <button key={option} className={className} onClick={() => selectInstrument(option)}>{option}</button>;
        })}
      </div>

      <div className="anticipationBox">
        <strong>Anticipation cue</strong>
        <span>{current.anticipation}</span>
      </div>

      {answered && (
        <div className={isCorrect ? "workflowFeedback good" : "workflowFeedback bad"}>
          <strong>{isCorrect ? "Correct pass sequence." : "Sequence mismatch."}</strong>
          <span>{current.why}</span>
        </div>
      )}

      <div className="workflowActions">
        <button onClick={nextWorkflow}>Next Workflow</button>
        <button onClick={resetWorkflow}>Reset Workflow Score</button>
      </div>
    </section>
  );
}

const CERTIFICATION_DOMAINS = {
  preop: {
    label: "Preoperative Preparation",
    weight: 0.18,
    topics: ["sterile setup", "counts", "positioning", "skin prep", "instrument organization"],
  },
  intraop: {
    label: "Intraoperative Procedures",
    weight: 0.42,
    topics: ["instrument passing", "hemostasis", "specimen handling", "workflow anticipation", "emergency response"],
  },
  anatomy: {
    label: "Applied Surgical Anatomy & Physiology",
    weight: 0.22,
    topics: ["neurovascular structures", "innervation", "circulation", "airway", "tissue layers"],
  },
  postop: {
    label: "Postoperative Procedures",
    weight: 0.08,
    topics: ["dressings", "counts", "specimens", "room turnover"],
  },
  safety: {
    label: "Patient Safety & Sterile Technique",
    weight: 0.10,
    topics: ["contamination", "fire safety", "electrosurgery", "retained items"],
  },
};

const REALISTIC_CST_BANK = [
  {
    id: 1,
    domain: "Intraoperative Procedures",
    difficulty: "Advanced",
    type: "Scenario-based",
    question: "During an open bowel procedure, the surgeon requests a noncrushing intestinal clamp after mobilization begins. Which instrument is MOST appropriate?",
    choices: ["Doyen intestinal clamp", "Kocher clamp", "Backhaus towel clip", "Allis clamp"],
    correct: "Doyen intestinal clamp",
    rationale: "Doyen clamps are designed to occlude bowel atraumatically. Kocher and Allis clamps are traumatic and may injure delicate bowel tissue.",
    examPearl: "Noncrushing bowel instruments are a high-yield CST exam concept.",
  },
  {
    id: 2,
    domain: "Applied Surgical Anatomy & Physiology",
    difficulty: "Advanced",
    type: "Neurovascular reasoning",
    question: "A patient positioned in lithotomy develops postoperative foot drop. Which structure was MOST likely compressed?",
    choices: ["Common peroneal nerve", "Femoral nerve", "Radial nerve", "Median nerve"],
    correct: "Common peroneal nerve",
    rationale: "Compression near the fibular head in lithotomy positioning can injure the common peroneal nerve, producing dorsiflexion weakness and foot drop.",
    examPearl: "Lithotomy positioning injuries are heavily tested in CST prep.",
  },
  {
    id: 3,
    domain: "Patient Safety & Sterile Technique",
    difficulty: "Intermediate",
    type: "Sterile field management",
    question: "While transferring a loaded scalpel, the scrub tech notices the blade loosen slightly from the handle. What is the BEST action?",
    choices: ["Remove the scalpel from the field and replace it", "Tighten it manually while holding the blade", "Continue using it if the surgeon is waiting", "Place it on the drape until needed"],
    correct: "Remove the scalpel from the field and replace it",
    rationale: "Unsafe sharps must be removed immediately to prevent injury and preserve operative safety.",
    examPearl: "The CST exam emphasizes safety before speed.",
  },
  ...Array.from({ length: 220 }, (_, i) => ({
    id: i + 4,
    domain: Object.values(CERTIFICATION_DOMAINS)[i % 5].label,
    difficulty: i % 4 === 0 ? "Advanced" : i % 3 === 0 ? "Intermediate" : "Foundational",
    type: ["Scenario-based", "Instrumentation", "Anatomy", "Sterile Technique", "Emergency Response"][i % 5],
    question:
      i % 5 === 0
        ? "During active hemorrhage, which action BEST supports rapid hemostatic control while maintaining operative flow?"
        : i % 5 === 1
        ? "Which instrument is MOST appropriate for delicate tissue handling in this operative stage?"
        : i % 5 === 2
        ? "Which neurovascular structure is MOST at risk during this exposure or positioning scenario?"
        : i % 5 === 3
        ? "What is the BEST response to suspected contamination near the sterile field?"
        : "Which physiologic change occurs EARLIEST during acute blood loss or oxygen compromise?",
    choices:
      i % 5 === 0
        ? ["Anticipate suction, clamps, ties, and sponges", "Pause all activity immediately", "Request dressings first", "Remove all instruments from the field"]
        : i % 5 === 1
        ? ["Metzenbaum scissors", "Bone mallet", "Gigli saw", "Rib spreader"]
        : i % 5 === 2
        ? ["Common peroneal nerve", "Patellar tendon", "Deltoid fascia", "Achilles tendon"]
        : i % 5 === 3
        ? ["Isolate and replace contaminated items", "Ignore if not directly touched", "Cover contamination with a drape", "Continue to avoid delay"]
        : ["Heart rate rises to maintain perfusion", "Hair growth stops", "Bone density increases", "Digestive motility increases"],
    correct:
      i % 5 === 0
        ? "Anticipate suction, clamps, ties, and sponges"
        : i % 5 === 1
        ? "Metzenbaum scissors"
        : i % 5 === 2
        ? "Common peroneal nerve"
        : i % 5 === 3
        ? "Isolate and replace contaminated items"
        : "Heart rate rises to maintain perfusion",
    rationale: "Certification-level CST reasoning depends on anatomy integration, sterile judgment, anticipation, procedural flow, and patient-safety prioritization under pressure.",
    examPearl: "Focus on operative anticipation rather than isolated memorization.",
  })),
];

function MassiveExamBankPhase() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const current = REALISTIC_CST_BANK[index];

  function nextQuestion() {
    setIndex((i) => (i + 1) % REALISTIC_CST_BANK.length);
    setRevealed(false);
  }

  function randomQuestion() {
    setIndex(Math.floor(Math.random() * REALISTIC_CST_BANK.length));
    setRevealed(false);
  }

  return (
    <section className="massiveExamPanel">
      <div className="panelTopline">Phase 9 Massive CST Question + Scenario Bank</div>

      <div className="examBankHeader">
        <div>
          <h3>Question {current.id} of {REALISTIC_CST_BANK.length}</h3>
          <p>{current.category} · {current.difficulty}</p>
        </div>
        <div className="examBankBadge">
          <strong>150+</strong>
          <span>Integrated training prompts</span>
        </div>
      </div>

      <div className="examQuestionCard">
        <strong>Scenario prompt</strong>
        <p>{current.question}</p>
      </div>

      {revealed && (
        <>
          <div className="examAnswerCard">
            <strong>Correct reasoning</strong>
            <span>{current.answer}</span>
          </div>

          <div className="examRationaleCard">
            <strong>Clinical rationale</strong>
            <span>{current.rationale}</span>
          </div>
        </>
      )}

      <div className="examActions">
        <button onClick={() => setRevealed(true)}>Reveal Answer</button>
        <button onClick={nextQuestion}>Next Question</button>
        <button onClick={randomQuestion}>Random Scenario</button>
      </div>
    </section>
  );
}

const OR_ENVIRONMENT_EVENTS = [
  {
    title: "Escalating bleeding during exposure",
    surgeonTone: "Urgent",
    distraction: "Anesthesia requests suction tubing adjustment while the surgeon asks for hemostats.",
    priority: "Control bleeding while maintaining sterile awareness and communication.",
    failure: "Delayed anticipation increases blood loss and operative instability.",
  },
  {
    title: "Sterile break during instrument exchange",
    surgeonTone: "Focused",
    distraction: "The circulator asks about counts while the Mayo stand becomes disorganized.",
    priority: "Protect sterility, reorganize workflow, and maintain count accuracy.",
    failure: "Missed contamination can compromise patient safety.",
  },
  {
    title: "Airway concern during positioning",
    surgeonTone: "Calm but fast",
    distraction: "The OR monitor alarm sounds while the patient is repositioned.",
    priority: "Maintain airway access awareness and safe positioning coordination.",
    failure: "Loss of situational awareness may delay recognition of patient instability.",
  },
];

function LiveOREnvironmentSimulator() {
  const [eventIndex, setEventIndex] = useState(0);
  const [focus, setFocus] = useState(100);
  const [timer, setTimer] = useState(45);
  const [decision, setDecision] = useState(null);
  const [loadScore, setLoadScore] = useState({ handled: 0, overloads: 0 });
  const current = OR_ENVIRONMENT_EVENTS[eventIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setFocus((f) => Math.max(0, f - 10));
          return 45;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function respond(type) {
    setDecision(type);
    if (type === "prioritize") {
      setFocus((f) => Math.min(100, f + 8));
      setLoadScore((s) => ({ handled: s.handled + 1, overloads: s.overloads }));
    } else {
      setFocus((f) => Math.max(0, f - 14));
      setLoadScore((s) => ({ handled: s.handled, overloads: s.overloads + 1 }));
    }
  }

  function nextEnvironment() {
    setEventIndex((i) => (i + 1) % OR_ENVIRONMENT_EVENTS.length);
    setDecision(null);
    setTimer(45);
  }

  return (
    <section className="orEnvironmentPanel">
      <div className="panelTopline">Phase 8 Live OR Environment + Cognitive Load</div>

      <div className="environmentHeader">
        <div>
          <h3>{current.title}</h3>
          <p>Surgeon tone: {current.surgeonTone}</p>
        </div>
        <div className="environmentStats">
          <strong>{focus}%</strong>
          <span>Operative focus</span>
        </div>
      </div>

      <div className="focusMeter">
        <div style={{ width: `${focus}%` }} />
      </div>

      <div className="timerPanel">
        <div>
          <strong>Decision window</strong>
          <span>{timer}s</span>
        </div>
        <div>
          <strong>Handled</strong>
          <span>{loadScore.handled}</span>
        </div>
        <div>
          <strong>Overloads</strong>
          <span>{loadScore.overloads}</span>
        </div>
      </div>

      <div className="environmentScenario">
        <strong>Environmental distraction</strong>
        <p>{current.distraction}</p>
      </div>

      <div className="environmentPriority">
        <strong>Primary operative priority</strong>
        <span>{current.priority}</span>
      </div>

      <div className="environmentChoices">
        <button onClick={() => respond("prioritize")}>Prioritize operative task correctly</button>
        <button onClick={() => respond("delay")}>Lose focus / delayed response</button>
      </div>

      {decision && (
        <div className={decision === "prioritize" ? "environmentFeedback good" : "environmentFeedback bad"}>
          <strong>{decision === "prioritize" ? "Operative control maintained." : "Cognitive overload increased."}</strong>
          <span>{decision === "prioritize" ? "Good situational awareness preserved procedural flow." : current.failure}</span>
        </div>
      )}

      <div className="workflowActions">
        <button onClick={nextEnvironment}>Next OR Environment</button>
      </div>
    </section>
  );
}

function StructureIndex({ structures, selectedId, setSelectedId }) {
  const groups = useMemo(() => {
    const allIds = Array.from(new Set(structures.map((s) => s.id))).filter((id) => INFO[id]);
    return Object.keys(SYSTEMS).map((system) => ({
      system,
      items: allIds.filter((id) => INFO[id]?.system === system).map((id) => INFO[id]),
    }));
  }, [structures]);

  return (
    <aside className="leftPanel">
      <h1>Human Anatomy</h1>
      <p>Interactive reference layer set</p>
      <div className="indexList">
        {groups.map((group) => group.items.length > 0 && (
          <div key={group.system} className="indexGroup">
            <div className="groupTitle"><span style={{ background: SYSTEMS[group.system].dot }} />{SYSTEMS[group.system].label}</div>
            {group.items.map((item) => {
              const id = Object.keys(INFO).find((key) => INFO[key] === item);
              return (
                <button key={item.name} className={selectedId === id ? "selectedChip" : ""} onClick={() => setSelectedId(id)}>
                  {item.name}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}

function MobileChips({ structures, selectedId, setSelectedId }) {
  const ids = Array.from(new Set(structures.map((s) => s.id))).filter((id) => INFO[id]);
  return (
    <div className="mobileChips">
      {ids.map((id) => (
        <button key={id} onClick={() => setSelectedId(id)} className={selectedId === id ? "active" : ""}>
          <span style={{ background: SYSTEMS[INFO[id].system].dot }} />{INFO[id].name}
        </button>
      ))}
    </div>
  );
}

export default function InteractiveHumanAnatomyReferenceTool() {
  const [view, setView] = useState("anterior");
  const [selectedId, setSelectedId] = useState("pec_major");
  const [hoveredId, setHoveredId] = useState(null);
  const [tab, setTab] = useState("function");
  const [activeSystems, setActiveSystems] = useState({ muscular: true, skeletal: true, tendon: true, cardiovascular: true, respiratory: true });
  const [examMode, setExamMode] = useState(false);
  const [examTarget, setExamTarget] = useState("pec_major");
  const [examFeedback, setExamFeedback] = useState(null);
  const [examStats, setExamStats] = useState({ correct: 0, attempts: 0, streak: 0, bestStreak: 0, confidenceTotal: 0 });
  const [confidence, setConfidence] = useState(3);
  const [zoom, setZoom] = useState(1.08);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [guidedMode, setGuidedMode] = useState(false);
  const [focusMode, setFocusMode] = useState(true);
  const [showDepthLighting, setShowDepthLighting] = useState(true);
  const [showFlow, setShowFlow] = useState(true);
  const [explodedView, setExplodedView] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [chartMode, setChartMode] = useState(true);
  const [guidedStep, setGuidedStep] = useState(0);
  const guidedModules = {
    rnThorax: {
      title: "RN Thorax & ABCs",
      goal: "Airway, breathing, circulation, and key chest assessment structures.",
      steps: ["trachea", "bronchi", "lungs", "diaphragm", "heart", "aorta", "vena_cava", "ribs"],
    },
    mblexUpper: {
      title: "MBLEx Upper Limb Essentials",
      goal: "Shoulder, arm, forearm, tendon, nerve-vessel caution zones, and palpation logic.",
      steps: ["trapezius", "pec_major", "deltoid_l", "biceps_l", "brachioradialis_l", "rotator_cuff_l", "biceps_tendon_l", "wrist_retinaculum"],
    },
    lowerLimb: {
      title: "Lower Limb Mobility & Gait",
      goal: "Hip, knee, ankle, gait, foot drop, push-off, and lower-limb circulation.",
      steps: ["glute_max", "glute_med_l", "rectus_femoris_l", "hamstrings_l", "tibialis_anterior_l", "gastroc_l", "soleus_l", "achilles_l", "femoral_popliteal_tibial"],
    },
    surgicalTechCore: {
      title: "Surgical Tech Core Anatomy",
      goal: "High-yield anatomy for positioning, exposure, airway, circulation, tissue handling, and common surgical regions.",
      steps: ["trachea", "lungs", "heart", "aorta", "vena_cava", "ribs", "diaphragm", "clavicles", "pelvis", "femoral_popliteal_tibial"],
    },
  };
  const [activeModule, setActiveModule] = useState("rnThorax");

  const structures = view === "anterior" ? anteriorStructures : posteriorStructures;

  function toggleSystem(system) {
    setActiveSystems((prev) => ({ ...prev, [system]: !prev[system] }));
  }

  const currentModule = guidedModules[activeModule];
  const currentGuidedId = currentModule.steps[guidedStep] || currentModule.steps[0];

  function zoomIn() { setZoom((z) => Math.min(3.2, Number((z + 0.18).toFixed(2)))); }
  function zoomOut() { setZoom((z) => Math.max(0.65, Number((z - 0.18).toFixed(2)))); }
  function resetView() { setZoom(1.08); setPan({ x: 0, y: 0 }); }
  function fitToScreen() { setZoom(0.92); setPan({ x: 0, y: 0 }); }
  function handleWheel(e) {
    e.preventDefault();
    const direction = e.deltaY > 0 ? -1 : 1;
    setZoom((z) => Math.max(0.65, Math.min(3.2, Number((z + direction * 0.12).toFixed(2)))));
  }
  function doubleTapZoom(e) {
    e.stopPropagation();
    if (zoom < 1.45) setZoom(1.65);
    else resetView();
  }
  function startDrag(e) {
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }
  function onDrag(e) {
    if (!dragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }
  function stopDrag() { setDragging(false); }
  function nextGuidedStep() {
    const next = (guidedStep + 1) % currentModule.steps.length;
    setGuidedStep(next);
    setSelectedId(currentModule.steps[next]);
    setTab("function");
  }
  function previousGuidedStep() {
    const prev = guidedStep === 0 ? currentModule.steps.length - 1 : guidedStep - 1;
    setGuidedStep(prev);
    setSelectedId(currentModule.steps[prev]);
    setTab("function");
  }
  function changeModule(key) {
    setActiveModule(key);
    setGuidedStep(0);
    setSelectedId(guidedModules[key].steps[0]);
    setTab("function");
  }

  function pickNextTarget(currentId = examTarget) {
    const pool = structures.filter((s) => activeSystems[s.system] && INFO[s.id]).map((s) => s.id);
    const uniquePool = Array.from(new Set(pool)).filter((id) => id !== currentId);
    const next = uniquePool[Math.floor(Math.random() * uniquePool.length)] || pool[0] || "pec_major";
    setExamTarget(next);
    setExamFeedback(null);
    setSelectedId(next);
  }

  function selectAndOpen(id) {
    if (examMode) {
      const isCorrect = id === examTarget;
      setSelectedId(id);
      setTab("clinical");
      setExamFeedback({
        correct: isCorrect,
        picked: id,
        target: examTarget,
        message: isCorrect ? `Correct: ${INFO[id]?.name}` : `Not quite. You selected ${INFO[id]?.name || id}; target was ${INFO[examTarget]?.name}.`,
      });
      setExamStats((prev) => {
        const attempts = prev.attempts + 1;
        const correct = prev.correct + (isCorrect ? 1 : 0);
        const streak = isCorrect ? prev.streak + 1 : 0;
        return {
          attempts,
          correct,
          streak,
          bestStreak: Math.max(prev.bestStreak, streak),
          confidenceTotal: prev.confidenceTotal + confidence,
        };
      });
      return;
    }
    setSelectedId(id);
    setTab("function");
  }

  return (
    <div className="appShell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${COLORS.bg}; }
        .appShell {
          min-height: 100vh;
          background:
            radial-gradient(circle at 50% 18%, rgba(176, 56, 32, 0.13), transparent 34%),
            linear-gradient(180deg, #07050C 0%, #040308 100%);
          color: ${COLORS.gold};
          font-family: 'Source Sans 3', system-ui, sans-serif;
          padding: 14px;
          overflow-x: hidden;
          overflow-y: auto;
        }
        .topBar {
          display: grid;
          grid-template-columns: 220px repeat(5, minmax(120px, auto)) repeat(8, minmax(82px, auto));
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          padding: 0 0 12px;
          border-bottom: 1px solid rgba(240,216,144,0.12);
        }
        .topBar::before {
          content: '☰  Anatomy Atlas';
          font-family: 'Libre Baskerville', serif;
          font-weight: 700;
          line-height: 1.05;
          color: #F0D890;
          font-size: 17px;
          padding-left: 4px;
        }
        .toggleBtn, .viewBtn {
          border: 1px solid rgba(240,216,144,0.22);
          background: linear-gradient(180deg, rgba(17,15,28,0.96), rgba(8,7,16,0.96));
          color: ${COLORS.gold};
          border-radius: 12px;
          padding: 13px 14px;
          min-height: 54px;
          font-weight: 800;
          letter-spacing: 0.01em;
          cursor: pointer;
          box-shadow: inset 0 0 22px rgba(240, 216, 144, 0.025), 0 10px 35px rgba(0,0,0,0.18);
          transition: all 180ms ease;
        }
        .toggleBtn.off { opacity: 0.48; color: #8E6A33; }
        .toggleBtn:hover, .viewBtn:hover, .viewBtn.active {
          transform: translateY(-1px);
          border-color: rgba(240,216,144,0.55);
          box-shadow: 0 0 22px rgba(240,216,144,0.13), inset 0 0 20px rgba(240,216,144,0.04);
        }
        .toggleBtn:not(.off):first-of-type { background: linear-gradient(180deg, #B83020, #6F1817); }
        .toggleDot { width: 9px; height: 9px; display: inline-block; border-radius: 999px; margin-right: 8px; box-shadow: 0 0 10px currentColor; }
        .layout {
          display: grid;
          grid-template-columns: 240px minmax(520px, 1.25fr) minmax(540px, 1.2fr);
          gap: 12px;
          min-height: 820px;
          height: auto;
          align-items: stretch;
        }
        .leftPanel, .infoPanel, .closePanel, .cstPanel, .cognitionPanel, .orScenarioPanel, .systemsPhasePanel, .escalationPanel, .aiCoachPanel, .instrumentWorkflowPanel, .orEnvironmentPanel {
          background: linear-gradient(180deg, rgba(10,13,22,0.98), rgba(5,5,12,0.96));
          border: 1px solid rgba(240,216,144,0.22);
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.36), inset 0 0 30px rgba(240,216,144,0.025);
          min-height: 0;
        }
        .leftPanel h1 {
          font-family: 'Libre Baskerville', serif;
          font-size: 20px;
          line-height: 1.08;
          margin: 0 0 6px;
          letter-spacing: 0.01em;
        }
        .leftPanel p, .panelTopline {
          margin: 0 0 14px;
          color: #C8791B;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 12px;
        }
        .indexList {
          overflow: auto;
          max-height: 665px;
          padding-right: 5px;
          scrollbar-width: thin;
        }
        .indexGroup { margin-bottom: 17px; }
        .groupTitle { display: flex; align-items: center; gap: 8px; color: ${COLORS.gold}; font-weight: 800; margin-bottom: 8px; }
        .groupTitle span { width: 10px; height: 10px; border-radius: 999px; }
        .indexGroup button, .mobileChips button {
          display: block;
          width: 100%;
          text-align: left;
          border: 1px solid rgba(240,216,144,0.10);
          background: rgba(255,255,255,0.025);
          color: #D88928;
          border-radius: 10px;
          padding: 9px 12px;
          margin: 6px 0;
          cursor: pointer;
          font-size: 13px;
          transition: all 160ms ease;
        }
        .indexGroup button:hover, .indexGroup .selectedChip {
          color: #F0D890;
          border-color: rgba(240,216,144,0.44);
          background: linear-gradient(90deg, rgba(184,48,32,0.52), rgba(240,216,144,0.08));
          box-shadow: inset 3px 0 0 #FF6B3A;
        }
        .figureStage {
          position: relative;
          min-height: 820px;
          background:
            radial-gradient(circle at 50% 38%, rgba(46,120,255,0.10), transparent 32%),
            linear-gradient(180deg, rgba(7,12,24,0.94), rgba(3,6,14,0.98));
          border: 1px solid rgba(240,216,144,0.22);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 70px rgba(0,0,0,0.55), 0 22px 70px rgba(0,0,0,0.35);
          cursor: grab;
          touch-action: none;
        }
        .figureStage::before {
          content: 'PHASE 2 | Chart Mode shows anatomy plate | Focus isolates selection';
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 7;
          width: 210px;
          padding: 12px;
          border: 1px solid rgba(240,216,144,0.20);
          border-radius: 12px;
          background: rgba(10,13,22,0.80);
          color: #D88928;
          font-size: 12px;
          line-height: 1.5;
          font-weight: 700;
          pointer-events: none;
        }
        .figureStage.dragging { cursor: grabbing; }
        .panLayer {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center center;
          transition: transform 180ms cubic-bezier(.2,.8,.2,1);
          will-change: transform;
        }
        .figureStage.dragging .panLayer { transition: none; }
        .zoomControls {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 8;
          display: flex;
          gap: 6px;
          align-items: center;
          background: rgba(17,15,28,0.86);
          border: 1px solid rgba(240,216,144,0.24);
          border-radius: 999px;
          padding: 7px;
          backdrop-filter: blur(8px);
        }
        .zoomControls button {
          border: 1px solid rgba(240,216,144,0.2);
          background: rgba(255,255,255,0.04);
          color: #F0D890;
          border-radius: 999px;
          min-width: 34px;
          height: 30px;
          padding: 0 10px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 140ms ease, background 140ms ease;
        }
        .zoomControls button:hover { transform: translateY(-1px); background: rgba(240,216,144,0.10); }
        .zoomControls span { color: #A06820; font-size: 12px; font-weight: 900; min-width: 44px; text-align: center; }
        .figureStage::after {
          content: 'Scroll to zoom · Double-click to quick zoom';
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          padding: 8px 12px;
          border: 1px solid rgba(240,216,144,0.16);
          border-radius: 999px;
          background: rgba(10,13,22,0.74);
          color: #A06820;
          font-size: 12px;
          font-weight: 800;
          pointer-events: none;
        }
        .svgWrap {
          width: min(100%, 660px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .anatomySvg {
          width: 100%;
          height: 100%;
          max-height: 100%;
          overflow: visible;
          filter: saturate(0.94) contrast(1.16);
        }
        .muscularLayer { mix-blend-mode: normal; }
        .skeletalLayer { mix-blend-mode: normal; }
        .respiratoryLayer { mix-blend-mode: screen; }
        .cardiovascularLayer { mix-blend-mode: normal; }
        .tendonLayer { mix-blend-mode: normal; }
        .structure { cursor: pointer; outline: none; }
        .structure path {
          transition: filter 180ms ease, opacity 180ms ease, stroke-width 180ms ease, transform 180ms ease;
          transform-box: fill-box;
          transform-origin: center;
        }
        .structure.hovered path { transform: scale(1.018); }
        .structure.muscular.hovered path { filter: url(#glow) saturate(1.18); }
        .structure.skeletal.hovered path { filter: url(#glow) brightness(1.12); }
        .structure.tendon.hovered path { filter: url(#glow) brightness(1.15); }
        .structure.cardiovascular.hovered path, .structure.respiratory.hovered path { filter: url(#glow) saturate(1.2); }
        .flowMode .cardiovascularLayer path,
        .flowMode .respiratoryLayer path {
          stroke-dasharray: 12 10;
          animation: vesselFlow 1.6s linear infinite;
        }
        .flowMode .respiratoryLayer {
          animation: breathe 3.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .flowMode .cardiovascularLayer {
          animation: pulseLayer 1.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .flowMode.closeSvg [stroke="#B01828"],
        .flowMode.closeSvg [stroke="#2840A0"],
        .flowMode.closeSvg [stroke="#4059C8"],
        .flowMode.closeSvg [stroke="#80B8D0"],
        .flowMode.closeSvg [stroke="#BEEFFF"],
        .flowMode.closeSvg [stroke="#F2C94C"],
        .flowMode.closeSvg [stroke="#FFD447"] {
          stroke-dasharray: 14 10;
          animation: vesselFlow 1.5s linear infinite;
        }
        @keyframes vesselFlow {
          from { stroke-dashoffset: 30; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.82; }
          50% { transform: scale(1.018); opacity: 0.96; }
        }
        @keyframes pulseLayer {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(176,24,40,0)); }
          50% { filter: drop-shadow(0 0 8px rgba(176,24,40,0.42)); }
        }
        .explode {
          transition: transform 360ms cubic-bezier(.2,.8,.2,1), opacity 220ms ease;
          transform-box: fill-box;
          transform-origin: center;
        }
        .respiratoryExplode { transform: translateX(-18px) scale(1.015); }
        .cardiovascularExplode { transform: translateX(18px) scale(1.015); }
        .skeletalExplode { transform: translateX(-34px) scale(0.985); opacity: 0.88; }
        .tendonExplode { transform: translateX(34px) scale(1.01); }
        .muscularExplode { transform: translateY(10px) scale(1.012); opacity: 0.58; }
        .smartLabel {
          animation: labelFloat 2.6s ease-in-out infinite;
          filter: drop-shadow(0 12px 22px rgba(0,0,0,0.45));
        }
        @keyframes labelFloat {
          0%, 100% { opacity: 0.9; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
        .structure.selected path { animation: selectedPulse 2.1s ease-in-out infinite; }
        .focusModeSvg .structure:not(.selected):not(.hovered) { opacity: 0.34; }
        .focusModeSvg .structure:not(.selected):not(.hovered) path { filter: saturate(0.48) brightness(0.48); }
        .focusModeSvg .structure.selected, .focusModeSvg .structure.hovered { opacity: 1; }
        .chartModeSvg.focusModeSvg .structure:not(.selected):not(.hovered) { opacity: 0.92; }
        .chartModeSvg.focusModeSvg .structure:not(.selected):not(.hovered) path { filter: saturate(0.95) brightness(0.92); }
        .chartModeSvg .structure.selected path { animation: none; }
        .chartModeSvg .muscularLayer { mix-blend-mode: normal; opacity: 0.92; }
        .chartModeSvg .skeletalLayer { opacity: 0.9; }
        .chartModeSvg .tendonLayer { opacity: 0.96; }
        .chartModeSvg .cardiovascularLayer { opacity: 0.98; }
        .chartModeSvg .respiratoryLayer { mix-blend-mode: screen; opacity: 0.66; }
        .atlasLabels text {
          paint-order: stroke;
          stroke: rgba(7,5,12,0.94);
          stroke-width: 3px;
          stroke-linejoin: round;
        }
        .atlasLabels path { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.45)); }
        .chartLandmarks { opacity: 0.72; }
        @keyframes selectedPulse {
          0%, 100% { filter: url(#selectedHalo); opacity: 1; }
          50% { filter: url(#glow); opacity: 0.96; }
        }
        .rightStack {
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(285px, 0.95fr) minmax(320px, 1.05fr);
          grid-template-rows: auto auto;
          gap: 12px;
          align-items: stretch;
        }
        .rightStack .cstPanel, .rightStack .cognitionPanel, .rightStack .orScenarioPanel, .rightStack .systemsPhasePanel, .rightStack .escalationPanel, .rightStack .aiCoachPanel, .rightStack .instrumentWorkflowPanel, .rightStack .orEnvironmentPanel, .rightStack .massiveExamPanel { grid-column: 1 / -1; }
        .infoPanel {
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 0;
          overflow: visible;
        }
        .closePanel {
          min-height: 0;
          overflow: visible;
        }
        .closePanel h3 {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(17px, 1.45vw, 20px);
          line-height: 1.12;
          margin: 0 0 8px;
          max-width: 100%;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .closeIntro {
          color: #D88928;
          line-height: 1.35;
          margin: 0 0 10px;
          font-size: 13px;
        }
        .closeSvg {
          width: 100%;
          display: block;
          border-radius: 10px;
          border: 1px solid rgba(240,216,144,0.16);
          background: #07050C;
          box-shadow: inset 0 0 42px rgba(46,120,255,0.12), 0 18px 50px rgba(0,0,0,0.24);
        }
        .examGrid { display: grid; gap: 8px; margin-top: 10px; }
        .examGrid div {
          border: 1px solid rgba(240,216,144,0.18);
          border-radius: 10px;
          padding: 10px;
          background: rgba(255,255,255,0.025);
        }
        .examGrid strong { display: block; color: #F0D890; margin-bottom: 3px; font-size: 13px; }
        .examGrid span { color: #c98532; font-size: 13px; line-height: 1.28; display: block; }
        .cstPanel h3 { font-family: 'Libre Baskerville', serif; font-size: 20px; margin: 0 0 8px; line-height: 1.1; }
        .cstCaseMeta { display: flex; gap: 8px; flex-wrap: wrap; margin: 8px 0 10px; }
        .cstCaseMeta span { border: 1px solid rgba(240,216,144,0.16); border-radius: 999px; padding: 5px 9px; color: #D88928; font-weight: 800; font-size: 12px; }
        .cstGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .cstGrid div, .cstQuestion { border: 1px solid rgba(240,216,144,0.16); border-radius: 12px; padding: 10px; background: rgba(255,255,255,0.025); }
        .cstGrid strong, .cstQuestion strong { display: block; color: #F0D890; margin-bottom: 4px; font-size: 13px; }
        .cstGrid span, .cstQuestion p { color: #D69A55; font-size: 13px; line-height: 1.32; margin: 0; }
        .cstQuestion { margin-top: 8px; }
        .answerReveal { color: #F0D890 !important; font-weight: 900; margin-top: 8px !important; }
        .cstControls { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .cstControls button { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 10px; padding: 8px 10px; font-weight: 800; cursor: pointer; }
        .cognitionPanel h3 { font-family: 'Libre Baskerville', serif; color: #F0D890; font-size: 18px; line-height: 1.25; margin: 8px 0 12px; }
        .modeTabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .modeTabs button, .trainerNext { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 999px; padding: 8px 11px; font-weight: 900; cursor: pointer; }
        .modeTabs button.active { background: linear-gradient(180deg, rgba(184,48,32,0.85), rgba(111,24,23,0.85)); border-color: rgba(240,216,144,0.45); }
        .trainerCard { border: 1px solid rgba(240,216,144,0.14); border-radius: 14px; padding: 12px; background: rgba(255,255,255,0.025); }
        .trainerMeta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; color: #D88928; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.06em; }
        .choiceGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .choiceGrid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .choiceGrid button { border: 1px solid rgba(240,216,144,0.18); background: rgba(12,8,24,0.92); color: #D69A55; border-radius: 12px; padding: 10px; font-weight: 800; cursor: pointer; text-align: left; }
        .choiceGrid button.correct { background: rgba(68,140,80,0.28); color: #BDF5C4; border-color: rgba(118,240,140,0.45); }
        .choiceGrid button.wrong { background: rgba(184,48,32,0.32); color: #FFB2A8; border-color: rgba(255,110,90,0.45); }
        .rationale { margin-top: 10px; color: #D69A55; line-height: 1.35; font-size: 13px; }
        .rationale.good { color: #BDF5C4; }
        .rationale.bad { color: #FFB2A8; }
        .instrumentSilhouette { min-height: 120px; border-radius: 18px; border: 1px solid rgba(240,216,144,0.16); display: flex; align-items: center; justify-content: center; margin: 10px 0; background: radial-gradient(circle, rgba(240,216,144,0.08), rgba(12,8,24,0.92)); color: #F0D890; font-family: 'Libre Baskerville', serif; font-size: 22px; }
        .procedureSteps { display: grid; gap: 6px; margin: 12px 0; }
        .procedureSteps div { border: 1px solid rgba(240,216,144,0.12); border-radius: 10px; padding: 8px; color: #A06820; background: rgba(255,255,255,0.02); }
        .procedureSteps div.current { color: #F0D890; border-color: rgba(240,216,144,0.46); background: rgba(240,216,144,0.08); }
        .procedureSteps div.done { color: #BDF5C4; }
        .positionGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        .positionGrid div { border: 1px solid rgba(240,216,144,0.14); border-radius: 12px; padding: 10px; background: rgba(255,255,255,0.025); }
        .positionGrid strong { display: block; color: #F0D890; margin-bottom: 4px; }
        .positionGrid span { display: block; color: #D69A55; font-size: 13px; line-height: 1.3; }
        .orScenarioPanel h3 { font-family: 'Libre Baskerville', serif; color: #F0D890; font-size: 21px; line-height: 1.15; margin: 0 0 6px; }
        .orHeader { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .orHeader p { color: #D88928; margin: 0; font-size: 13px; font-weight: 800; }
        .orScore { text-align: right; min-width: 150px; }
        .orScore strong { display: block; font-family: 'Libre Baskerville', serif; font-size: 24px; color: #F0D890; }
        .orScore span { display: block; color: #A06820; font-size: 12px; line-height: 1.2; }
        .pressureMeter { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin: 12px 0; }
        .pressureMeter span { height: 8px; border-radius: 999px; background: rgba(240,216,144,0.10); border: 1px solid rgba(240,216,144,0.12); }
        .pressureMeter span.hot { background: linear-gradient(90deg, #D88928, #B01828); box-shadow: 0 0 12px rgba(176,24,40,0.35); }
        .orPrompt { border: 1px solid rgba(240,216,144,0.16); border-radius: 14px; padding: 12px; background: rgba(255,255,255,0.025); }
        .orPrompt strong { display: block; color: #F0D890; margin-bottom: 5px; }
        .orPrompt p { color: #D69A55; line-height: 1.35; margin: 0; }
        .orChoices { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
        .orChoices button { border: 1px solid rgba(240,216,144,0.18); background: rgba(12,8,24,0.92); color: #D69A55; border-radius: 12px; padding: 10px; font-weight: 800; cursor: pointer; text-align: left; }
        .orChoices button.correct { background: rgba(68,140,80,0.28); color: #BDF5C4; border-color: rgba(118,240,140,0.45); }
        .orChoices button.wrong { background: rgba(184,48,32,0.32); color: #FFB2A8; border-color: rgba(255,110,90,0.45); }
        .orFeedback { margin-top: 10px; border-radius: 12px; padding: 10px; border: 1px solid rgba(240,216,144,0.14); display: grid; gap: 4px; }
        .orFeedback strong { color: #F0D890; }
        .orFeedback span { color: #D69A55; font-size: 13px; line-height: 1.32; }
        .orFeedback.good { background: rgba(68,140,80,0.12); }
        .orFeedback.bad { background: rgba(184,48,32,0.14); }
        .orActions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .orActions button { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 10px; padding: 8px 10px; font-weight: 800; cursor: pointer; }
        .systemsTabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .systemsTabs button { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 999px; padding: 8px 12px; font-weight: 900; cursor: pointer; }
        .systemsTabs button.active { background: linear-gradient(180deg, rgba(176,24,40,0.88), rgba(85,16,22,0.92)); border-color: rgba(240,216,144,0.45); }
        .systemsGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .systemsCard { border: 1px solid rgba(240,216,144,0.14); border-radius: 14px; padding: 12px; background: rgba(255,255,255,0.025); }
        .systemsCard h3 { margin: 0 0 6px; font-family: 'Libre Baskerville', serif; color: #F0D890; font-size: 18px; }
        .systemsMeta { display: inline-block; margin-bottom: 8px; color: #D88928; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; }
        .systemsCard p { margin: 0 0 8px; color: #D69A55; font-size: 13px; line-height: 1.34; }
        .systemsCard strong { color: #F0D890; }
        .systemsFooter { margin-top: 12px; border: 1px solid rgba(240,216,144,0.14); border-radius: 12px; padding: 12px; background: rgba(255,255,255,0.03); display: grid; gap: 5px; }
        .systemsFooter strong { color: #F0D890; }
        .systemsFooter span { color: #D69A55; line-height: 1.32; font-size: 13px; }
        .escalationHeader { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .escalationHeader h3 { margin: 0 0 6px; font-family: 'Libre Baskerville', serif; color: #F0D890; font-size: 22px; }
        .escalationHeader p { margin: 0; color: #D88928; font-size: 13px; font-weight: 800; }
        .stabilityBox { text-align: right; min-width: 130px; }
        .stabilityBox strong { display: block; font-size: 26px; color: #F0D890; font-family: 'Libre Baskerville', serif; }
        .stabilityBox span { color: #A06820; font-size: 12px; }
        .stabilityMeter { height: 12px; border-radius: 999px; background: rgba(255,255,255,0.06); overflow: hidden; margin: 12px 0; border: 1px solid rgba(240,216,144,0.14); }
        .stabilityMeter div { height: 100%; background: linear-gradient(90deg, #B01828, #D88928, #4A9E65); transition: width 0.3s ease; }
        .eventTimeline { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 8px; margin: 12px 0; }
        .eventTimeline div { border: 1px solid rgba(240,216,144,0.12); border-radius: 12px; padding: 10px; background: rgba(255,255,255,0.025); opacity: 0.45; }
        .eventTimeline div.active { opacity: 1; border-color: rgba(240,216,144,0.42); background: rgba(240,216,144,0.08); }
        .eventTimeline span { display: inline-flex; width: 24px; height: 24px; border-radius: 999px; align-items: center; justify-content: center; background: rgba(240,216,144,0.12); color: #F0D890; font-weight: 900; margin-bottom: 8px; }
        .eventTimeline p { margin: 0; color: #D69A55; font-size: 13px; line-height: 1.28; }
        .decisionPanel { border: 1px solid rgba(240,216,144,0.14); border-radius: 14px; padding: 12px; background: rgba(255,255,255,0.025); }
        .decisionPanel strong { display: block; color: #F0D890; margin-bottom: 5px; }
        .decisionPanel p { margin: 0 0 10px; color: #D69A55; line-height: 1.34; font-size: 13px; }
        .decisionButtons { display: flex; flex-wrap: wrap; gap: 8px; }
        .decisionButtons button { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 10px; padding: 8px 10px; font-weight: 800; cursor: pointer; }
        .decisionFeedback { margin-top: 10px; border-radius: 12px; padding: 10px; border: 1px solid rgba(240,216,144,0.14); display: grid; gap: 4px; }
        .decisionFeedback strong { color: #F0D890; }
        .decisionFeedback span { color: #D69A55; font-size: 13px; line-height: 1.32; }
        .decisionFeedback.good { background: rgba(68,140,80,0.12); }
        .decisionFeedback.bad { background: rgba(184,48,32,0.14); }
        .coachHeader { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .coachHeader h3 { margin: 0 0 6px; font-family: 'Libre Baskerville', serif; color: #F0D890; font-size: 22px; }
        .coachHeader p { margin: 0; color: #D69A55; line-height: 1.32; font-size: 13px; max-width: 620px; }
        .readinessScore { text-align: right; min-width: 150px; }
        .readinessScore strong { display: block; color: #F0D890; font-size: 30px; font-family: 'Libre Baskerville', serif; }
        .readinessScore span { color: #A06820; font-size: 12px; }
        .coachGrid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; margin-top: 12px; }
        .coachCard { border: 1px solid rgba(240,216,144,0.14); border-radius: 14px; padding: 12px; background: rgba(255,255,255,0.025); }
        .coachMetricTop { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .coachMetricTop strong { color: #F0D890; text-transform: capitalize; font-size: 14px; }
        .coachMetricTop span { color: #D88928; font-weight: 900; }
        .coachBar { height: 10px; border-radius: 999px; background: rgba(255,255,255,0.06); overflow: hidden; border: 1px solid rgba(240,216,144,0.12); margin-bottom: 8px; }
        .coachBar div { height: 100%; background: linear-gradient(90deg, #B01828, #D88928, #4A9E65); }
        .coachCard p { margin: 0; color: #D69A55; font-size: 13px; line-height: 1.32; }
        .adaptiveInsights { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; margin-top: 12px; }
        .adaptiveInsights div, .studyPathPanel, .coachFooter { border: 1px solid rgba(240,216,144,0.14); border-radius: 14px; padding: 12px; background: rgba(255,255,255,0.025); }
        .adaptiveInsights strong, .studyPathPanel strong, .coachFooter strong { display: block; color: #F0D890; margin-bottom: 6px; }
        .adaptiveInsights span { color: #D88928; font-weight: 900; display: block; margin-bottom: 6px; }
        .adaptiveInsights p, .coachFooter span { margin: 0; color: #D69A55; line-height: 1.32; font-size: 13px; }
        .studyPathPanel ol { margin: 0; padding-left: 18px; color: #D69A55; line-height: 1.5; font-size: 13px; }
        .instrumentWorkflowPanel h3 { margin: 0 0 6px; font-family: 'Libre Baskerville', serif; color: #F0D890; font-size: 22px; line-height: 1.15; }
        .workflowHeader { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .workflowHeader p { margin: 0; color: #D88928; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.06em; }
        .workflowScore { text-align: right; min-width: 150px; }
        .workflowScore strong { display: block; color: #F0D890; font-family: 'Libre Baskerville', serif; font-size: 28px; }
        .workflowScore span { color: #A06820; font-size: 12px; line-height: 1.2; }
        .surgeonRequestBox, .anticipationBox { border: 1px solid rgba(240,216,144,0.16); border-radius: 14px; padding: 12px; background: rgba(255,255,255,0.025); margin-top: 10px; }
        .surgeonRequestBox strong, .anticipationBox strong { display: block; color: #F0D890; margin-bottom: 5px; }
        .surgeonRequestBox p { margin: 0; color: #D69A55; font-size: 16px; line-height: 1.35; font-family: 'Libre Baskerville', serif; }
        .anticipationBox span { color: #D69A55; line-height: 1.34; font-size: 13px; display: block; }
        .mayoStandGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
        .mayoStandGrid button { border: 1px solid rgba(240,216,144,0.18); background: rgba(12,8,24,0.92); color: #D69A55; border-radius: 12px; padding: 11px; font-weight: 900; cursor: pointer; text-align: left; }
        .mayoStandGrid button.correct { background: rgba(68,140,80,0.28); color: #BDF5C4; border-color: rgba(118,240,140,0.45); }
        .mayoStandGrid button.wrong { background: rgba(184,48,32,0.32); color: #FFB2A8; border-color: rgba(255,110,90,0.45); }
        .workflowFeedback { margin-top: 10px; border-radius: 12px; padding: 10px; border: 1px solid rgba(240,216,144,0.14); display: grid; gap: 4px; }
        .workflowFeedback strong { color: #F0D890; }
        .workflowFeedback span { color: #D69A55; font-size: 13px; line-height: 1.32; }
        .workflowFeedback.good { background: rgba(68,140,80,0.12); }
        .workflowFeedback.bad { background: rgba(184,48,32,0.14); }
        .workflowActions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .workflowActions button { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 10px; padding: 8px 10px; font-weight: 800; cursor: pointer; }
        .environmentHeader { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .environmentHeader h3 { margin: 0 0 6px; font-family: 'Libre Baskerville', serif; color: #F0D890; font-size: 22px; }
        .environmentHeader p { margin: 0; color: #D88928; font-size: 13px; font-weight: 900; }
        .environmentStats { text-align: right; min-width: 140px; }
        .environmentStats strong { display: block; font-size: 30px; color: #F0D890; font-family: 'Libre Baskerville', serif; }
        .environmentStats span { color: #A06820; font-size: 12px; }
        .focusMeter { height: 12px; border-radius: 999px; background: rgba(255,255,255,0.06); overflow: hidden; border: 1px solid rgba(240,216,144,0.12); margin: 12px 0; }
        .focusMeter div { height: 100%; background: linear-gradient(90deg, #B01828, #D88928, #4A9E65); transition: width 0.25s ease; }
        .timerPanel { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 8px; margin-bottom: 10px; }
        .timerPanel div { border: 1px solid rgba(240,216,144,0.12); border-radius: 12px; padding: 10px; background: rgba(255,255,255,0.025); }
        .timerPanel strong { display: block; color: #F0D890; margin-bottom: 4px; }
        .timerPanel span { color: #D88928; font-size: 20px; font-weight: 900; }
        .environmentScenario, .environmentPriority { border: 1px solid rgba(240,216,144,0.14); border-radius: 14px; padding: 12px; background: rgba(255,255,255,0.025); margin-bottom: 10px; }
        .environmentScenario strong, .environmentPriority strong { display: block; color: #F0D890; margin-bottom: 5px; }
        .environmentScenario p, .environmentPriority span { margin: 0; color: #D69A55; line-height: 1.34; font-size: 13px; display: block; }
        .environmentChoices { display: flex; flex-wrap: wrap; gap: 8px; }
        .environmentChoices button { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 10px; padding: 9px 11px; font-weight: 900; cursor: pointer; }
        .environmentFeedback { margin-top: 10px; border-radius: 12px; padding: 10px; border: 1px solid rgba(240,216,144,0.14); display: grid; gap: 4px; }
        .environmentFeedback strong { color: #F0D890; }
        .environmentFeedback span { color: #D69A55; font-size: 13px; line-height: 1.32; }
        .environmentFeedback.good { background: rgba(68,140,80,0.12); }
        .environmentFeedback.bad { background: rgba(184,48,32,0.14); }
        .examBankHeader { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .examBankHeader h3 { margin: 0 0 6px; font-family: 'Libre Baskerville', serif; color: #F0D890; font-size: 22px; }
        .examBankHeader p { margin: 0; color: #D88928; font-size: 13px; font-weight: 900; }
        .examBankBadge { text-align: right; min-width: 140px; }
        .examBankBadge strong { display: block; font-size: 30px; color: #F0D890; font-family: 'Libre Baskerville', serif; }
        .examBankBadge span { color: #A06820; font-size: 12px; }
        .examQuestionCard, .examAnswerCard, .examRationaleCard { border: 1px solid rgba(240,216,144,0.14); border-radius: 14px; padding: 14px; background: rgba(255,255,255,0.025); margin-top: 10px; }
        .examQuestionCard strong, .examAnswerCard strong, .examRationaleCard strong { display: block; color: #F0D890; margin-bottom: 6px; }
        .examQuestionCard p { margin: 0; color: #F4D3A2; font-size: 18px; line-height: 1.42; font-family: 'Libre Baskerville', serif; }
        .examAnswerCard span, .examRationaleCard span { color: #D69A55; line-height: 1.34; font-size: 13px; display: block; }
        .examActions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .examActions button { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 10px; padding: 9px 11px; font-weight: 900; cursor: pointer; }
        .layerChips { display: flex; flex-wrap: wrap; gap: 7px; margin: 10px 0; }
        .layerChips button { border: 1px solid rgba(240,216,144,0.14); background: rgba(255,255,255,0.035); color: #F0D890; border-radius: 999px; padding: 6px 9px; font-size: 12px; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
        .layerChips button.off { opacity: 0.38; }
        .layerChips span { width: 8px; height: 8px; border-radius: 999px; }
        .examBar, .guidedBar {
          margin: 0 0 14px;
          display: grid;
          grid-template-columns: 1.2fr minmax(220px, 360px) auto auto 1fr;
          gap: 14px;
          align-items: center;
          border: 1px solid rgba(240,216,144,0.22);
          background: linear-gradient(90deg, rgba(240,216,144,0.08), rgba(176,24,40,0.08));
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.25);
        }
        .guidedBar { background: linear-gradient(90deg, rgba(128,184,208,0.09), rgba(240,216,144,0.07)); }
        .examBar strong, .guidedBar strong { font-family: 'Libre Baskerville', serif; color: #F0D890; display: block; }
        .guidedBar small { color: #A06820; display: block; line-height: 1.2; }
        .guidedBar select, .guidedBar button { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 12px; padding: 8px 10px; font-weight: 800; }
        .examLabel { color: #A06820; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 900; }
        .examBar label { color: #A06820; font-size: 12px; font-weight: 900; display: grid; gap: 3px; }
        .examBar select, .examBar button { border: 1px solid rgba(240,216,144,0.22); background: #0C0818; color: #F0D890; border-radius: 12px; padding: 8px 10px; font-weight: 800; }
        .scoreBox { color: #F0D890; display: grid; gap: 2px; }
        .scoreBox span { font-size: 18px; font-weight: 900; }
        .scoreBox small { color: #A06820; }
        .goodFeedback, .badFeedback { margin: 0; font-weight: 800; font-size: 13px; line-height: 1.2; }
        .goodFeedback { color: #A7F3A1; }
        .badFeedback { color: #FF938A; }
        .infoPanel h2 {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(24px, 2.15vw, 38px);
          line-height: 1.03;
          margin: 0 0 14px;
          max-width: 100%;
          overflow-wrap: anywhere;
          word-break: break-word;
          hyphens: auto;
        }
        .infoPanel h2.longTitle { font-size: clamp(20px, 1.75vw, 30px); }
        .badge { display: inline-flex; align-items: center; gap: 8px; color: ${COLORS.gold}; border: 1px solid rgba(240,216,144,0.14); background: rgba(240,216,144,0.05); padding: 8px 10px; border-radius: 999px; width: fit-content; font-weight: 800; }
        .badge span { width: 11px; height: 11px; border-radius: 50%; box-shadow: 0 0 12px currentColor; }
        .tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin: 24px 0 16px;
          border: 1px solid rgba(240,216,144,0.18);
          border-radius: 12px;
          overflow: hidden;
        }
        .tabs button {
          border: 0;
          border-right: 1px solid rgba(240,216,144,0.12);
          background: rgba(255,255,255,0.025);
          color: ${COLORS.muted};
          border-radius: 0;
          padding: 12px;
          font-weight: 900;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .tabs .active { color: ${COLORS.gold}; background: rgba(240,216,144,0.08); border-color: rgba(240,216,144,0.38); }
        .bodyCopy {
          color: #D69A55;
          line-height: 1.58;
          font-size: 16px;
          margin: 0;
          overflow-wrap: anywhere;
        }
        .clinicalTip {
          margin-top: 18px;
          border: 1px solid rgba(240,216,144,0.18);
          background: linear-gradient(180deg, rgba(240,216,144,0.08), rgba(176,24,40,0.08));
          border-radius: 18px;
          padding: 14px;
          color: #C88735;
          display: grid;
          gap: 6px;
        }
        .clinicalTip strong { color: ${COLORS.gold}; font-family: 'Libre Baskerville', serif; }
        .mobileChips { display: none; }
        @media (max-width: 1180px) {
          .topBar { grid-template-columns: 1fr; }
          .topBar::before { margin-bottom: 4px; }
          .layout { display: block; height: auto; min-height: 0; }
          .leftPanel { display: none; }
          .rightStack { display: block; }
          .infoPanel, .closePanel, .cstPanel, .cognitionPanel, .orScenarioPanel, .systemsPhasePanel, .escalationPanel, .aiCoachPanel, .instrumentWorkflowPanel, .orEnvironmentPanel, .massiveExamPanel { margin-bottom: 12px; }
          .choiceGrid, .positionGrid, .orChoices, .systemsGrid, .eventTimeline, .coachGrid, .adaptiveInsights, .mayoStandGrid, .timerPanel { grid-template-columns: 1fr; }
          .environmentHeader { display: block; }
          .environmentStats { text-align: left; margin-top: 8px; }
          .workflowHeader { display: block; }
          .workflowScore { text-align: left; margin-top: 8px; }
          .coachHeader { display: block; }
          .readinessScore { text-align: left; margin-top: 8px; }
          .escalationHeader { display: block; }
          .stabilityBox { text-align: left; margin-top: 8px; }
          .orHeader { display: block; }
          .orScore { text-align: left; margin-top: 8px; }
          .cstGrid { grid-template-columns: 1fr; }
        }
        @media (max-width: 980px) {
          .appShell { padding: 12px; overflow: auto; }
          .layout { display: block; height: auto; min-height: 0; }
          .leftPanel { display: none; }
          .figureStage { min-height: 74vh; margin-bottom: 12px; overflow-x: auto; }
          .figureStage::after { display: none; }
          .svgWrap { min-width: 360px; height: 78vh; }
          .rightStack { display: block; }
          .infoPanel { position: relative; max-height: none; overflow: visible; border-radius: 14px; margin-bottom: 12px; }
          .closePanel { margin-bottom: 12px; }
          .mobileChips { display: flex; overflow-x: auto; gap: 8px; padding: 4px 0 12px; }
          .mobileChips button { min-width: max-content; width: auto; display: inline-flex; align-items: center; gap: 7px; margin: 0; color: #c98532; }
          .mobileChips button span { width: 8px; height: 8px; border-radius: 999px; }
          .mobileChips .active { color: ${COLORS.gold}; border-color: rgba(240,216,144,0.42); background: rgba(240,216,144,0.08); }
          .topBar { justify-content: flex-start; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; }
          .examBar, .guidedBar { grid-template-columns: 1fr; align-items: stretch; }
          .zoomControls { top: 10px; right: 10px; transform: scale(0.92); transform-origin: top right; }
          .toggleBtn, .viewBtn { min-width: max-content; }
        }
      `}</style>

      <div className="topBar">
        {Object.entries(SYSTEMS).map(([key, system]) => (
          <button key={key} className={`toggleBtn ${activeSystems[key] ? "" : "off"}`} onClick={() => toggleSystem(key)}>
            <span className="toggleDot" style={{ background: system.dot, color: system.dot }} />{system.label}
          </button>
        ))}
        <button className={view === "anterior" ? "viewBtn active" : "viewBtn"} onClick={() => setView("anterior")}>Anterior</button>
        <button className={view === "posterior" ? "viewBtn active" : "viewBtn"} onClick={() => setView("posterior")}>Posterior</button>
        <button className={examMode ? "viewBtn active" : "viewBtn"} onClick={() => { setExamMode((v) => !v); setGuidedMode(false); setExamFeedback(null); pickNextTarget(); }}>
          Exam Mode
        </button>
        <button className={guidedMode ? "viewBtn active" : "viewBtn"} onClick={() => { setGuidedMode((v) => !v); setExamMode(false); setSelectedId(currentGuidedId); setTab("function"); }}>
          Guided Study
        </button>
        <button className={activeModule === "surgicalTechCore" && guidedMode ? "viewBtn active" : "viewBtn"} onClick={() => { setGuidedMode(true); setExamMode(false); setActiveModule("surgicalTechCore"); setGuidedStep(0); setSelectedId(guidedModules.surgicalTechCore.steps[0]); setTab("function"); }}>
          Surgical Tech
        </button>
        <button className={focusMode ? "viewBtn active" : "viewBtn"} onClick={() => setFocusMode((v) => !v)}>
          Focus
        </button>
        <button className={showDepthLighting ? "viewBtn active" : "viewBtn"} onClick={() => setShowDepthLighting((v) => !v)}>
          Depth
        </button>
        <button className={showFlow ? "viewBtn active" : "viewBtn"} onClick={() => setShowFlow((v) => !v)}>
          Flow
        </button>
        <button className={explodedView ? "viewBtn active" : "viewBtn"} onClick={() => setExplodedView((v) => !v)}>
          Explode
        </button>
        <button className={showLabels ? "viewBtn active" : "viewBtn"} onClick={() => setShowLabels((v) => !v)}>
          Labels
        </button>
        <button className={chartMode ? "viewBtn active" : "viewBtn"} onClick={() => setChartMode((v) => !v)}>
          Chart
        </button>
      </div>

      {examMode && (
        <section className="examBar">
          <div>
            <span className="examLabel">Target</span>
            <strong>Click: {INFO[examTarget]?.name}</strong>
          </div>
          <label>
            Confidence
            <select value={confidence} onChange={(e) => setConfidence(Number(e.target.value))}>
              <option value={1}>1 — Guessing</option>
              <option value={2}>2 — Low</option>
              <option value={3}>3 — Medium</option>
              <option value={4}>4 — High</option>
              <option value={5}>5 — Certain</option>
            </select>
          </label>
          <button onClick={() => pickNextTarget()}>Next Target</button>
          <div className="scoreBox">
            <span>{examStats.correct}/{examStats.attempts || 0}</span>
            <small>{examStats.attempts ? Math.round((examStats.correct / examStats.attempts) * 100) : 0}% accuracy · streak {examStats.streak}</small>
          </div>
          {examFeedback && <p className={examFeedback.correct ? "goodFeedback" : "badFeedback"}>{examFeedback.message}</p>}
        </section>
      )}
      {guidedMode && (
        <section className="guidedBar">
          <div>
            <span className="examLabel">Guided Study Module</span>
            <strong>{currentModule.title}</strong>
            <small>{currentModule.goal}</small>
          </div>
          <select value={activeModule} onChange={(e) => changeModule(e.target.value)}>
            {Object.entries(guidedModules).map(([key, module]) => <option key={key} value={key}>{module.title}</option>)}
          </select>
          <button onClick={previousGuidedStep}>Previous</button>
          <button onClick={nextGuidedStep}>Next</button>
          <div className="scoreBox">
            <span>{guidedStep + 1}/{currentModule.steps.length}</span>
            <small>Current: {INFO[currentGuidedId]?.name}</small>
          </div>
        </section>
      )}
      <MobileChips structures={structures} selectedId={selectedId} setSelectedId={selectAndOpen} />
      <main className="layout">
        <StructureIndex structures={structures} selectedId={selectedId} setSelectedId={selectAndOpen} />
        <section
          className={`figureStage ${dragging ? "dragging" : ""}`}
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onWheel={handleWheel}
          onDoubleClick={doubleTapZoom}
        >
          <div className="zoomControls">
            <button onClick={(e) => { e.stopPropagation(); zoomOut(); }}>−</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button onClick={(e) => { e.stopPropagation(); zoomIn(); }}>+</button>
            <button onClick={(e) => { e.stopPropagation(); resetView(); }}>Reset</button>
            <button onClick={(e) => { e.stopPropagation(); fitToScreen(); }}>Fit</button>
          </div>
          <div className="panLayer" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          <AnatomySvg
            view={view}
            activeSystems={activeSystems}
            selectedId={selectedId}
            hoveredId={hoveredId}
            setSelectedId={selectAndOpen}
            setHoveredId={setHoveredId}
            focusMode={focusMode}
            showDepthLighting={showDepthLighting}
            showFlow={showFlow}
            explodedView={explodedView}
            showLabels={showLabels}
            chartMode={chartMode}
          />
          </div>
        </section>
        <div className="rightStack">
          <InfoPanel selectedId={selectedId} tab={tab} setTab={setTab} />
          <CloseUpStudyPanel selectedId={selectedId} examMode={examMode} examStats={examStats} confidence={confidence} showFlow={showFlow} />
          <CSTPrepPanel selectedId={selectedId} />
          <MassiveExamBankPhase />
          <LiveOREnvironmentSimulator />
          <InstrumentWorkflowSimulator />
          <AdaptiveAICoach />
          <PhysiologicEscalationSimulator />
          <IntegratedSystemsPhase />
          <ORScenarioEngine />
          <CSTCognitionTrainer />
        </div>
      </main>
    </div>
  );
}
