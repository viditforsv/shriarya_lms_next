/**
 * Predefined list of subjects for question bank
 * This prevents multiple spellings and ensures consistency
 */

export const SUBJECTS = [
  "Mathematics",
  "IBDP Mathematics AA HL",
  "IBDP Mathematics AA SL",
  "IBDP Mathematics AI HL",
  "IBDP Mathematics AI SL",
  "CBSE Mathematics",
  "ICSE Mathematics",
  "IGCSE Mathematics",
  "Physics",
  "IBDP Physics HL",
  "IBDP Physics SL",
  "CBSE Physics",
  "ICSE Physics",
  "IGCSE Physics",
  "Chemistry",
  "IBDP Chemistry HL",
  "IBDP Chemistry SL",
  "CBSE Chemistry",
  "ICSE Chemistry",
  "IGCSE Chemistry",
  "Biology",
  "IBDP Biology HL",
  "IBDP Biology SL",
  "CBSE Biology",
  "ICSE Biology",
  "IGCSE Biology",
  "English",
  "IBDP English A",
  "IBDP English B",
  "CBSE English",
  "ICSE English",
  "IGCSE English",
  "Computer Science",
  "IBDP Computer Science HL",
  "IBDP Computer Science SL",
  "CBSE Computer Science",
  "ICSE Computer Science",
  "IGCSE Computer Science",
  "GRE Math",
] as const;

export type Subject = (typeof SUBJECTS)[number];

