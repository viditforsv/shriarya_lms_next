export interface Subsection {
  id: string;
  title: string;
  slug: string;
  duration?: string;
  isCompleted?: boolean;
  isPreview?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  subsections: Subsection[];
  isExpanded?: boolean;
  isCompleted?: boolean;
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  chapters: Chapter[];
  isExpanded?: boolean;
  isCompleted?: boolean;
}

export const CBSE_CLASS_9_MATHEMATICS_SYLLABUS: Section[] = [
  {
    id: "number-systems",
    title: "Number Systems",
    slug: "number-systems",
    isExpanded: true,
    chapters: [
      {
        id: "real-numbers",
        title: "Real Numbers",
        slug: "real-numbers",
        subsections: [
          {
            id: "irrational-numbers",
            title: "Irrational Numbers",
            slug: "irrational-numbers",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "real-numbers-properties",
            title: "Properties of Real Numbers",
            slug: "real-numbers-properties",
            duration: "35 min",
            isCompleted: false,
          },
          {
            id: "laws-exponents",
            title: "Laws of Exponents for Real Numbers",
            slug: "laws-exponents",
            duration: "45 min",
            isCompleted: false,
          },
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "polynomials",
    title: "Polynomials",
    slug: "polynomials",
    isExpanded: false,
    chapters: [
      {
        id: "polynomials-intro",
        title: "Polynomials in One Variable",
        slug: "polynomials-intro",
        subsections: [
          {
            id: "polynomials-definition",
            title: "Definition and Types of Polynomials",
            slug: "polynomials-definition",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "zeros-polynomials",
            title: "Zeros of Polynomials",
            slug: "zeros-polynomials",
            duration: "35 min",
            isCompleted: false,
          },
          {
            id: "remainder-theorem",
            title: "Remainder Theorem",
            slug: "remainder-theorem",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "factor-theorem",
            title: "Factor Theorem",
            slug: "factor-theorem",
            duration: "40 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "coordinate-geometry",
    title: "Coordinate Geometry",
    slug: "coordinate-geometry",
    isExpanded: false,
    chapters: [
      {
        id: "cartesian-system",
        title: "Cartesian System",
        slug: "cartesian-system",
        subsections: [
          {
            id: "coordinate-plane",
            title: "Coordinate Plane and Axes",
            slug: "coordinate-plane",
            duration: "35 min",
            isCompleted: false,
          },
          {
            id: "plotting-points",
            title: "Plotting Points in the Plane",
            slug: "plotting-points",
            duration: "40 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "linear-equations",
    title: "Linear Equations in Two Variables",
    slug: "linear-equations",
    isExpanded: false,
    chapters: [
      {
        id: "linear-equations-intro",
        title: "Linear Equations in Two Variables",
        slug: "linear-equations-intro",
        subsections: [
          {
            id: "linear-equations-definition",
            title: "Definition and Solutions",
            slug: "linear-equations-definition",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "graph-linear-equations",
            title: "Graph of Linear Equations",
            slug: "graph-linear-equations",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "equations-parallel-perpendicular",
            title: "Equations of Lines Parallel and Perpendicular",
            slug: "equations-parallel-perpendicular",
            duration: "50 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "euclid-geometry",
    title: "Introduction to Euclid's Geometry",
    slug: "euclid-geometry",
    isExpanded: false,
    chapters: [
      {
        id: "euclid-definitions",
        title: "Euclid's Definitions, Axioms and Postulates",
        slug: "euclid-definitions",
        subsections: [
          {
            id: "euclid-axioms",
            title: "Euclid's Axioms",
            slug: "euclid-axioms",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "euclid-postulates",
            title: "Euclid's Postulates",
            slug: "euclid-postulates",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "equivalent-versions",
            title: "Equivalent Versions of Fifth Postulate",
            slug: "equivalent-versions",
            duration: "35 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "lines-angles",
    title: "Lines and Angles",
    slug: "lines-angles",
    isExpanded: false,
    chapters: [
      {
        id: "lines-angles-basic",
        title: "Basic Terms and Definitions",
        slug: "lines-angles-basic",
        subsections: [
          {
            id: "types-angles",
            title: "Types of Angles",
            slug: "types-angles",
            duration: "35 min",
            isCompleted: false,
          },
          {
            id: "parallel-lines-transversal",
            title: "Parallel Lines and Transversal",
            slug: "parallel-lines-transversal",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "angle-sum-property",
            title: "Angle Sum Property of Triangle",
            slug: "angle-sum-property",
            duration: "40 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "triangles",
    title: "Triangles",
    slug: "triangles",
    isExpanded: false,
    chapters: [
      {
        id: "triangles-congruence",
        title: "Congruence of Triangles",
        slug: "triangles-congruence",
        subsections: [
          {
            id: "congruence-criteria",
            title: "Criteria for Congruence of Triangles",
            slug: "congruence-criteria",
            duration: "50 min",
            isCompleted: false,
          },
          {
            id: "properties-triangles",
            title: "Properties of Triangles",
            slug: "properties-triangles",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "inequalities-triangles",
            title: "Inequalities in Triangles",
            slug: "inequalities-triangles",
            duration: "40 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "quadrilaterals",
    title: "Quadrilaterals",
    slug: "quadrilaterals",
    isExpanded: false,
    chapters: [
      {
        id: "quadrilaterals-properties",
        title: "Properties of Quadrilaterals",
        slug: "quadrilaterals-properties",
        subsections: [
          {
            id: "angle-sum-property-quadrilateral",
            title: "Angle Sum Property of Quadrilateral",
            slug: "angle-sum-property-quadrilateral",
            duration: "35 min",
            isCompleted: false,
          },
          {
            id: "types-quadrilaterals",
            title: "Types of Quadrilaterals",
            slug: "types-quadrilaterals",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "properties-parallelogram",
            title: "Properties of Parallelogram",
            slug: "properties-parallelogram",
            duration: "50 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "areas-parallelograms-triangles",
    title: "Areas of Parallelograms and Triangles",
    slug: "areas-parallelograms-triangles",
    isExpanded: false,
    chapters: [
      {
        id: "areas-basic",
        title: "Areas of Parallelograms and Triangles",
        slug: "areas-basic",
        subsections: [
          {
            id: "area-parallelogram",
            title: "Area of Parallelogram",
            slug: "area-parallelogram",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "area-triangle",
            title: "Area of Triangle",
            slug: "area-triangle",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "figures-same-base-parallel",
            title: "Figures on Same Base and Between Same Parallels",
            slug: "figures-same-base-parallel",
            duration: "50 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "circles",
    title: "Circles",
    slug: "circles",
    isExpanded: false,
    chapters: [
      {
        id: "circles-basic",
        title: "Circles and its Related Terms",
        slug: "circles-basic",
        subsections: [
          {
            id: "circles-definitions",
            title: "Definitions and Terms",
            slug: "circles-definitions",
            duration: "35 min",
            isCompleted: false,
          },
          {
            id: "angle-subtended-chord",
            title: "Angle Subtended by a Chord at a Point",
            slug: "angle-subtended-chord",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "perpendicular-chord",
            title: "Perpendicular from Centre to Chord",
            slug: "perpendicular-chord",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "circle-through-three-points",
            title: "Circle through Three Points",
            slug: "circle-through-three-points",
            duration: "35 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "constructions",
    title: "Constructions",
    slug: "constructions",
    isExpanded: false,
    chapters: [
      {
        id: "basic-constructions",
        title: "Basic Constructions",
        slug: "basic-constructions",
        subsections: [
          {
            id: "construction-angles",
            title: "Construction of Angles",
            slug: "construction-angles",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "construction-triangles",
            title: "Construction of Triangles",
            slug: "construction-triangles",
            duration: "50 min",
            isCompleted: false,
          },
          {
            id: "construction-bisectors",
            title: "Construction of Bisectors",
            slug: "construction-bisectors",
            duration: "40 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "heron-formula",
    title: "Heron's Formula",
    slug: "heron-formula",
    isExpanded: false,
    chapters: [
      {
        id: "heron-formula-area",
        title: "Area of Triangle using Heron's Formula",
        slug: "heron-formula-area",
        subsections: [
          {
            id: "heron-formula-derivation",
            title: "Derivation of Heron's Formula",
            slug: "heron-formula-derivation",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "application-heron-formula",
            title: "Application of Heron's Formula",
            slug: "application-heron-formula",
            duration: "50 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "surface-areas-volumes",
    title: "Surface Areas and Volumes",
    slug: "surface-areas-volumes",
    isExpanded: false,
    chapters: [
      {
        id: "surface-areas-volumes-basic",
        title: "Surface Areas and Volumes",
        slug: "surface-areas-volumes-basic",
        subsections: [
          {
            id: "surface-area-cuboid-cube",
            title: "Surface Area of Cuboid and Cube",
            slug: "surface-area-cuboid-cube",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "surface-area-right-circular-cylinder",
            title: "Surface Area of Right Circular Cylinder",
            slug: "surface-area-right-circular-cylinder",
            duration: "50 min",
            isCompleted: false,
          },
          {
            id: "surface-area-right-circular-cone",
            title: "Surface Area of Right Circular Cone",
            slug: "surface-area-right-circular-cone",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "surface-area-sphere",
            title: "Surface Area of Sphere",
            slug: "surface-area-sphere",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "volume-cuboid-cube",
            title: "Volume of Cuboid and Cube",
            slug: "volume-cuboid-cube",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "volume-right-circular-cylinder",
            title: "Volume of Right Circular Cylinder",
            slug: "volume-right-circular-cylinder",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "volume-right-circular-cone",
            title: "Volume of Right Circular Cone",
            slug: "volume-right-circular-cone",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "volume-sphere",
            title: "Volume of Sphere",
            slug: "volume-sphere",
            duration: "40 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "statistics",
    title: "Statistics",
    slug: "statistics",
    isExpanded: false,
    chapters: [
      {
        id: "statistics-basic",
        title: "Collection and Presentation of Data",
        slug: "statistics-basic",
        subsections: [
          {
            id: "collection-data",
            title: "Collection of Data",
            slug: "collection-data",
            duration: "35 min",
            isCompleted: false,
          },
          {
            id: "presentation-data",
            title: "Presentation of Data",
            slug: "presentation-data",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "graphical-representation",
            title: "Graphical Representation of Data",
            slug: "graphical-representation",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "measures-central-tendency",
            title: "Measures of Central Tendency",
            slug: "measures-central-tendency",
            duration: "50 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "probability",
    title: "Probability",
    slug: "probability",
    isExpanded: false,
    chapters: [
      {
        id: "probability-basic",
        title: "Probability",
        slug: "probability-basic",
        subsections: [
          {
            id: "probability-definition",
            title: "Definition and Basic Concepts",
            slug: "probability-definition",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "probability-experimental",
            title: "Experimental Probability",
            slug: "probability-experimental",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "probability-applications",
            title: "Applications of Probability",
            slug: "probability-applications",
            duration: "40 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
];

export const CBSE_CLASS_10_MATHEMATICS_SYLLABUS: Section[] = [
  {
    id: "number-systems",
    title: "Number Systems",
    slug: "number-systems",
    isExpanded: true,
    chapters: [
      {
        id: "real-numbers",
        title: "Real Numbers",
        slug: "real-numbers",
        subsections: [
          {
            id: "fundamental-theorem-arithmetic",
            title: "Fundamental Theorem of Arithmetic",
            slug: "fundamental-theorem-arithmetic",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "proofs-irrationality",
            title: "Proofs of Irrationality",
            slug: "proofs-irrationality",
            duration: "50 min",
            isCompleted: false,
          },
          {
            id: "properties-real-numbers",
            title: "Properties and Applications of Real Numbers",
            slug: "properties-real-numbers",
            duration: "39 min",
            isCompleted: false,
          },
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "algebra",
    title: "Algebra",
    slug: "algebra",
    isExpanded: true,
    chapters: [
      {
        id: "polynomials",
        title: "Polynomials",
        slug: "polynomials",
        subsections: [
          {
            id: "zeros-polynomial",
            title: "Zeros of a Polynomial",
            slug: "zeros-polynomial",
            duration: "35 min",
            isCompleted: true,
          },
          {
            id: "relationship-zeros-coefficients",
            title: "Relationship between Zeros and Coefficients",
            slug: "relationship-zeros-coefficients",
            duration: "40 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
      {
        id: "pair-linear-equations",
        title: "Pair of Linear Equations in Two Variables",
        slug: "pair-linear-equations",
        subsections: [
          {
            id: "graphical-method",
            title: "Graphical Method of Solution",
            slug: "graphical-method",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "algebraic-solution",
            title: "Algebraic Solution: Substitution and Elimination",
            slug: "algebraic-solution",
            duration: "50 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
      {
        id: "quadratic-equations",
        title: "Quadratic Equations",
        slug: "quadratic-equations",
        subsections: [
          {
            id: "euclid-division-lemma",
            title: "Euclid's Division Lemma",
            slug: "euclid-division-lemma",
            duration: "50 min",
            isCompleted: false,
            isPreview: false,
          },
          {
            id: "standard-form",
            title: "Standard Form",
            slug: "standard-form",
            duration: "30 min",
            isCompleted: false,
          },
          {
            id: "factorization-quadratic-formula",
            title: "Solution by Factorization & Quadratic Formula",
            slug: "factorization-quadratic-formula",
            duration: "55 min",
            isCompleted: false,
          },
          {
            id: "nature-roots-discriminant",
            title: "Nature of Roots (Discriminant)",
            slug: "nature-roots-discriminant",
            duration: "45 min",
            isCompleted: false,
          },
        ],
        isExpanded: true,
      },
      {
        id: "arithmetic-progressions",
        title: "Arithmetic Progressions",
        slug: "arithmetic-progressions",
        subsections: [
          {
            id: "nth-term",
            title: "nth Term",
            slug: "nth-term",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "sum-n-terms",
            title: "Sum of n Terms",
            slug: "sum-n-terms",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "applications-problems",
            title: "Applications in Problems",
            slug: "applications-problems",
            duration: "50 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "coordinate-geometry",
    title: "Coordinate Geometry",
    slug: "coordinate-geometry",
    isExpanded: false,
    chapters: [
      {
        id: "concepts-coordinate-geometry",
        title: "Concepts of Coordinate Geometry",
        slug: "concepts-coordinate-geometry",
        subsections: [
          {
            id: "distance-formula",
            title: "Distance Formula",
            slug: "distance-formula",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "section-formula",
            title: "Section Formula (Internal Division)",
            slug: "section-formula",
            duration: "45 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "geometry",
    title: "Geometry",
    slug: "geometry",
    isExpanded: false,
    chapters: [
      {
        id: "triangles",
        title: "Triangles",
        slug: "triangles",
        subsections: [
          {
            id: "similarity-criteria",
            title: "Similarity Criteria and Properties",
            slug: "similarity-criteria",
            duration: "50 min",
            isCompleted: false,
          },
          {
            id: "basic-proportionality-theorem",
            title: "Basic Proportionality Theorem (Thales' theorem)",
            slug: "basic-proportionality-theorem",
            duration: "45 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
      {
        id: "circles",
        title: "Circles",
        slug: "circles",
        subsections: [
          {
            id: "tangent-circle",
            title: "Tangent to a Circle",
            slug: "tangent-circle",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "properties-tangents",
            title: "Properties of Tangents",
            slug: "properties-tangents",
            duration: "45 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "trigonometry",
    title: "Trigonometry",
    slug: "trigonometry",
    isExpanded: false,
    chapters: [
      {
        id: "introduction-trigonometry",
        title: "Introduction to Trigonometry",
        slug: "introduction-trigonometry",
        subsections: [
          {
            id: "trigonometric-ratios",
            title: "Trigonometric Ratios",
            slug: "trigonometric-ratios",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "values-30-45-60",
            title: "Values for 30°, 45°, 60°",
            slug: "values-30-45-60",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "relationships-ratios",
            title: "Relationships between Ratios",
            slug: "relationships-ratios",
            duration: "35 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
      {
        id: "trigonometric-identities",
        title: "Trigonometric Identities",
        slug: "trigonometric-identities",
        subsections: [
          {
            id: "proof-application-sin2-cos2",
            title: "Proof and Application of sin²A + cos²A = 1",
            slug: "proof-application-sin2-cos2",
            duration: "50 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
      {
        id: "heights-distances",
        title: "Heights and Distances",
        slug: "heights-distances",
        subsections: [
          {
            id: "angles-elevation-depression",
            title: "Angles of Elevation and Depression",
            slug: "angles-elevation-depression",
            duration: "45 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "mensuration",
    title: "Mensuration",
    slug: "mensuration",
    isExpanded: false,
    chapters: [
      {
        id: "areas-related-circles",
        title: "Areas Related to Circles",
        slug: "areas-related-circles",
        subsections: [
          {
            id: "areas-sectors-segments",
            title: "Areas of Sectors and Segments",
            slug: "areas-sectors-segments",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "perimeter-circumference",
            title: "Perimeter/Circumference Problems",
            slug: "perimeter-circumference",
            duration: "40 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
      {
        id: "surface-areas-volumes",
        title: "Surface Areas and Volumes",
        slug: "surface-areas-volumes",
        subsections: [
          {
            id: "cubes-cuboids",
            title: "Cubes and Cuboids",
            slug: "cubes-cuboids",
            duration: "50 min",
            isCompleted: false,
          },
          {
            id: "spheres-hemispheres",
            title: "Spheres and Hemispheres",
            slug: "spheres-hemispheres",
            duration: "45 min",
            isCompleted: false,
          },
          {
            id: "cylinders-cones",
            title: "Right Circular Cylinders/Cones",
            slug: "cylinders-cones",
            duration: "55 min",
            isCompleted: false,
          },
          {
            id: "combinations-solids",
            title: "Combinations of Two Solids",
            slug: "combinations-solids",
            duration: "60 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "statistics-probability",
    title: "Statistics and Probability",
    slug: "statistics-probability",
    isExpanded: false,
    chapters: [
      {
        id: "statistics",
        title: "Statistics",
        slug: "statistics",
        subsections: [
          {
            id: "mean-median-mode",
            title: "Mean, Median, Mode of Grouped Data",
            slug: "mean-median-mode",
            duration: "50 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
      {
        id: "probability",
        title: "Probability",
        slug: "probability",
        subsections: [
          {
            id: "classical-definition",
            title: "Classical Definition",
            slug: "classical-definition",
            duration: "40 min",
            isCompleted: false,
          },
          {
            id: "simple-problems",
            title: "Simple Problems Related to Everyday Events",
            slug: "simple-problems",
            duration: "45 min",
            isCompleted: false,
          },
        ],
        isExpanded: false,
      },
    ],
  },
];

export function getSyllabusProgress(syllabus: Section[]): {
  completed: number;
  total: number;
  percentage: number;
} {
  let completed = 0;
  let total = 0;

  syllabus.forEach((section) => {
    section.chapters.forEach((chapter) => {
      chapter.subsections.forEach((subsection) => {
        total++;
        if (subsection.isCompleted) {
          completed++;
        }
      });
    });
  });

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function findSubsectionBySlug(
  syllabus: Section[],
  slug: string
): { section: Section; chapter: Chapter; subsection: Subsection } | null {
  for (const section of syllabus) {
    for (const chapter of section.chapters) {
      for (const subsection of chapter.subsections) {
        if (subsection.slug === slug) {
          return { section, chapter, subsection };
        }
      }
    }
  }
  return null;
}
