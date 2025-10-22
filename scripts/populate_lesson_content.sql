-- Populate course_lesson_content table
-- Generated from lesson_content.csv
-- Maps content to lessons based on topic_number and lesson_code

BEGIN;


-- Row 1: SL 1.1 - SL 1.1a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Place Value and Decimal Movement',
    'Powers of 10 represent our base-10 number system. Moving one decimal place right divides by 10 (multiply by $10^{-1}$), while moving left multiplies by 10. Each position represents a power: thousands = $10^3$, hundreds = $10^2$, tens = $10^1$, ones = $10^0$, tenths = $10^{-1}$, etc. Understanding this connects place value to exponent rules.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.1' 
  AND lesson_code = 'SL 1.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 2: SL 1.1 - SL 1.1b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Standard to Scientific Conversion',
    'To convert to scientific notation: (1) Move decimal point to create a number between 1 and 10. (2) Count decimal places moved—this is the exponent. (3) Moving left gives positive exponent; moving right gives negative. Maintain all significant figures. Example: $0.00456 = 4.56 \times 10^{-3}$ (moved 3 places right).',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.1' 
  AND lesson_code = 'SL 1.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 3: SL 1.1 - SL 1.1c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Orders of Magnitude in Real World',
    'Orders of magnitude help compare vastly different scales. Atom radius ≈ $10^{-10}$ m, human height ≈ $10^0$ m, Earth radius ≈ $10^7$ m. The exponent difference shows the scale gap. Estimating to nearest power of 10 helps with reasonableness checks and rapid calculations in physics, chemistry, and economics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.1' 
  AND lesson_code = 'SL 1.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 4: SL 1.2 - SL 1.2a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Recognizing Arithmetic Patterns',
    'An arithmetic sequence has a constant difference between consecutive terms. To identify: subtract any term from the next. If this difference ($d$) remains constant, it''s arithmetic. Common in real contexts: ticket numbering (101, 102, 103...), linear growth patterns, evenly spaced measurements.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.2' 
  AND lesson_code = 'SL 1.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 5: SL 1.2 - SL 1.2b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Applications of Arithmetic Sequences',
    'Arithmetic sequences model linear growth. Simple interest: $A = P + nI$ follows arithmetic pattern. Savings plans with fixed monthly deposits create arithmetic sums. The sum formula adds all terms efficiently—key for finding total savings, total distance traveled at constant acceleration, or cumulative production over time periods.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.2' 
  AND lesson_code = 'SL 1.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 6: SL 1.2 - SL 1.2c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Sigma Notation',
    'Sigma (Σ) notation compactly represents series. $\sum_{k=1}^{n}$ means ''sum from $k=1$ to $k=n$''. The expression after Σ defines each term. For arithmetic series, identify the pattern, express the $k$th term, then sum. This notation is essential for communicating mathematical ideas efficiently and appears throughout higher mathematics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.2' 
  AND lesson_code = 'SL 1.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 7: SL 1.3 - SL 1.3a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Recognizing Geometric Patterns',
    'A geometric sequence has a constant ratio between consecutive terms. To identify: divide any term by the previous term. If this ratio ($r$) remains constant, it''s geometric. Common in nature: bacterial growth ($r>1$), radioactive decay ($0<r<1$), compound interest. Unlike arithmetic (add), geometric multiplies each term.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.3' 
  AND lesson_code = 'SL 1.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 8: SL 1.3 - SL 1.3b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Compound Interest as Geometric Growth',
    'Compound interest follows geometric sequence: initial amount $P$, after each period multiply by $(1+i)$. After $n$ periods: $A = P(1+i)^n$. This is a geometric sequence with $r=(1+i)$. Each term represents balance after that period. The exponential growth explains why starting early with investments is powerful.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.3' 
  AND lesson_code = 'SL 1.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 9: SL 1.3 - SL 1.3c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Geometric Series in Exponential Models',
    'Geometric series model exponential growth/decay. Population doubling: $\sum_{k=0}^{n} P_0 \cdot 2^k$ gives cumulative population over generations. Medicine: drug dosage accumulation follows geometric series. Index starts at 0 for $r^0=1$ (first term). Understanding this notation helps analyze compound phenomena in biology, finance, and physics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.3' 
  AND lesson_code = 'SL 1.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 10: SL 1.4 - SL 1.4a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Exponential Growth in Finance',
    'Compound interest creates exponential growth because interest earns interest. Each period, balance becomes $P(1+r)^n$—a geometric sequence with ratio $(1+r)$. Even small rates compound significantly over time. Example: 7% doubles money in ~10 years. Understanding this is crucial for investment planning, loans, and retirement savings. The ''Rule of 72'' approximates doubling time.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.4' 
  AND lesson_code = 'SL 1.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 11: SL 1.4 - SL 1.4b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Depreciation vs. Appreciation',
    'Depreciation is negative growth ($0 < r < 1$), opposite of compound interest. Assets like cars lose value geometrically. Real investment value accounts for inflation: nominal growth minus inflation rate. A 5% return with 3% inflation gives ~2% real return. Understanding both helps evaluate true investment performance and asset value over time.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.4' 
  AND lesson_code = 'SL 1.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 12: SL 1.4 - SL 1.4c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Technology in Financial Analysis',
    'Graphing calculators solve complex problems: finding time to reach target amount, comparing investment strategies, sensitivity analysis. Graph multiple scenarios simultaneously. Tables show detailed period-by-period changes. This technology is essential for real financial planning, mortgage calculations, and retirement modeling where manual calculation is impractical.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.4' 
  AND lesson_code = 'SL 1.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 13: SL 1.5 - SL 1.5a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Logarithms as Inverse Functions',
    'Logarithms ''undo'' exponentiation. If $a^x = b$, then $\log_a(b) = x$. The logarithm answers: ''To what power must I raise $a$ to get $b$?'' Domain: $b > 0$ only (can''t take log of negative/zero). This inverse relationship is fundamental: $a^{\log_a(x)} = x$ and $\log_a(a^x) = x$.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.5' 
  AND lesson_code = 'SL 1.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 14: SL 1.5 - SL 1.5b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Properties and Restrictions',
    'Logarithm domain: $x > 0$ only. Special values: $\log_a(1) = 0$ (any base), $\log_a(a) = 1$. Negative results possible: $\log_{10}(0.01) = -2$. Use change of base formula for non-standard bases. Understanding domain prevents errors and helps interpret results in applied contexts.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.5' 
  AND lesson_code = 'SL 1.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 15: SL 1.5 - SL 1.5c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Logarithmic Scales?',
    'Logarithmic scales compress huge ranges into manageable numbers. Earthquake intensity varies by billions—Richter scale makes it 1-10. pH measures H+ concentration from $10^{-14}$ to $10^0$ M as 0-14. Sound intensity spans trillions—decibels compress to 0-140. These scales make extreme variations comprehensible and easy to communicate.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.5' 
  AND lesson_code = 'SL 1.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 16: SL 1.6 - SL 1.6a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'The Nature of Mathematical Proof',
    'Proof establishes truth beyond doubt using logical reasoning. Unlike verification (testing examples), proof shows a statement holds universally. Structure: State what to prove, show each logical step with justification, reach conclusion. Proofs build mathematical knowledge—once proven, results become tools for further mathematics. Critical thinking skill applicable beyond math.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.6' 
  AND lesson_code = 'SL 1.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 17: SL 1.6 - SL 1.6b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Deductive Reasoning in Algebra',
    'Deductive proof uses accepted rules to show truth. Start with given (LHS), apply valid algebraic operations (each step reversible and justified), arrive at target (RHS). Don''t work backwards! Numerical verification (testing values) suggests truth but doesn''t prove it—need general algebraic argument. Each step builds logically on previous.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.6' 
  AND lesson_code = 'SL 1.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 18: SL 1.6 - SL 1.6c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'The Importance of Self-Checking',
    'Mathematical accuracy requires verification. Common errors: sign mistakes, algebraic slips, wrong formula application. Develop habit: after solving, always check. Substitution catches most errors. Estimation prevents absurd answers (e.g., negative distance). In exams, verification can save marks. Professional mathematics demands rigorous checking—error detection is crucial skill.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.6' 
  AND lesson_code = 'SL 1.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 19: SL 1.7 - SL 1.7a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Rational Exponents Connect Powers and Roots',
    'Fractional exponents unify powers and roots. Denominator indicates root type ($a^{1/2} = \sqrt{a}$), numerator indicates power. This notation allows applying exponent laws to roots. $a^{0.5} = \sqrt{a}$, $a^{0.25} = \sqrt[4]{a}$. Simplification often easier in exponent form than radical form. Understanding this connection is essential for calculus and beyond.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.7' 
  AND lesson_code = 'SL 1.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 20: SL 1.7 - SL 1.7b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Logarithm Laws Work',
    'Log laws come from exponent laws. Since $\log$ is inverse of exponentiation: $a^m \cdot a^n = a^{m+n}$ becomes $\log_a(xy) = \log_a(x) + \log_a(y)$. Multiplication becomes addition! This property made logarithms essential for calculation before calculators—converting multiplication to easier addition. Today, these laws simplify expressions and solve exponential equations.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.7' 
  AND lesson_code = 'SL 1.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 21: SL 1.7 - SL 1.7c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Strategy for Logarithmic Equations',
    'To solve log equations: (1) Use log laws to combine into single log. (2) Convert to exponential form. (3) Solve algebraically. (4) CHECK: solution must make original arguments positive (domain!). Change of base allows calculator evaluation of any base. Common mistake: forgetting domain restrictions—always verify $x > 0$ for all log arguments.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.7' 
  AND lesson_code = 'SL 1.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 22: SL 1.8 - SL 1.8a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Convergence Explained',
    'Infinite series converges if partial sums approach a limit. For geometric series with $|r| < 1$, each term is smaller than previous—sum approaches finite value. If $|r| \geq 1$, terms don''t shrink enough (or grow)—sum becomes infinite. Remarkable: infinitely many terms can sum to finite number! Foundation for calculus and analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.8' 
  AND lesson_code = 'SL 1.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 23: SL 1.8 - SL 1.8b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Infinite Series in Nature and Math',
    'Infinite series appear everywhere: repeating decimals (pure fractions), fractal perimeters (Koch snowflake has infinite perimeter!), drug dosage (accumulation in body), bouncing ball (total distance). Zeno''s paradox resolved: infinitely many intervals can sum to finite distance. Understanding infinite series is crucial for advanced mathematics and modeling continuous processes.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.8' 
  AND lesson_code = 'SL 1.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 24: SL 1.8 - SL 1.8c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Modulus Matters',
    'Modulus $|r|$ measures magnitude regardless of sign. For convergence, terms must shrink in absolute value. $r = -0.5$: terms alternate ($+,-,+,-$) but decrease in size—converges. $r = -2$: terms alternate but grow—diverges. Geometric interpretation: modulus gives distance from zero. $|r| < 1$ means ratio closer to zero than to ±1, ensuring decay.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.8' 
  AND lesson_code = 'SL 1.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 25: SL 1.9 - SL 1.9a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Pascal''s Triangle and Patterns',
    'Pascal''s triangle gives binomial coefficients: each entry is sum of two above. Row $n$ gives coefficients for $(a+b)^n$. Symmetry: $\binom{n}{k} = \binom{n}{n-k}$. Sum of row $n$ is $2^n$. This ancient pattern connects to probability, combinatorics, and algebra. Binomial theorem efficiently expands powers without tedious multiplication.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.9' 
  AND lesson_code = 'SL 1.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 26: SL 1.9 - SL 1.9b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Combinations in Binomial Expansions',
    '$\binom{n}{k}$ counts ways to choose $k$ items from $n$—also gives binomial coefficient! This deep connection links algebra and counting. To find specific term: identify power needed, use general term formula. Don''t expand entire expression—wasteful! Pascal''s triangle works for small $n$; combination formula for larger. Understanding this saves time in exams.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.9' 
  AND lesson_code = 'SL 1.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 27: SL 1.9 - SL 1.9c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Practical Uses of Binomial Theorem',
    'Beyond expansion: (1) Find specific coefficients without full expansion. (2) Approximate calculations: $(1.02)^{10} \approx (1+0.02)^{10} \approx 1 + 10(0.02) = 1.2$ (first two terms). (3) Probability: binomial distribution uses these coefficients. (4) Calculus: foundation for Taylor series. Efficient tool for polynomial manipulation and approximation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.9' 
  AND lesson_code = 'SL 1.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 28: AHL 1.10 - AHL 1.10a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Permutations',
    'Permutations count ordered arrangements. Order matters! Arranging ABC gives 6 permutations: ABC, ACB, BAC, BCA, CAB, CBA. Multiplication principle: first choice ($n$ options), second choice ($n-1$ options), etc. Factorial grows explosively: 10! = 3,628,800. Permutations essential for probability, computer science, and combinatorics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.10' 
  AND lesson_code = 'AHL 1.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 29: AHL 1.10 - AHL 1.10b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Permutations vs Combinations',
    'Key difference: ORDER. Permutations: order matters (passwords, race positions). Combinations: order doesn''t matter (selecting committee, choosing toppings). Choosing 2 from {A,B,C}: Combinations (3): {A,B}, {A,C}, {B,C}. Permutations (6): AB, BA, AC, CA, BC, CB. Always: $C(n,r) \leq P(n,r)$. Ask: does order matter?',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.10' 
  AND lesson_code = 'AHL 1.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 30: AHL 1.10 - AHL 1.10c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Convergence and Applications',
    'Extended binomial needs $|x| < 1$ to converge—infinite series! Used for approximations: $\sqrt{1.04} = (1+0.04)^{1/2} \approx 1 + \frac{1}{2}(0.04) = 1.02$. Powerful for calculus, Taylor series, and numerical methods. Fractional/negative powers generate infinite expansions—truncate for approximations. Convergence crucial: outside $|x| < 1$, series diverges (meaningless).',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.10' 
  AND lesson_code = 'AHL 1.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 31: AHL 1.11 - AHL 1.11a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Partial Fractions?',
    'Partial fractions reverse the process of adding fractions—decompose complex fraction into simpler parts. Essential for integration: $\int \frac{1}{(x-a)(x-b)}dx$ becomes sum of simple logs. Also used in Laplace transforms, differential equations. Think: ''un-adding'' fractions. Makes complex rational expressions manageable for calculus operations.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.11' 
  AND lesson_code = 'AHL 1.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 32: AHL 1.11 - AHL 1.11b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Techniques for Decomposition',
    'Two main methods: (1) Substitution method—choose clever $x$ values to eliminate terms. (2) Equating coefficients—expand and match powers of $x$. Substitution faster but needs distinct linear factors. Always verify by adding fractions back! Common error: forgetting to check if fraction is proper (numerator degree < denominator degree).',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.11' 
  AND lesson_code = 'AHL 1.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 33: AHL 1.11 - AHL 1.11c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Partial Fractions in Calculus',
    'Primary application: integration of rational functions. Without partial fractions, many integrals impossible by hand. Decompose complex fraction → integrate simple terms → combine. Also appears in differential equations, signal processing, control theory. Transforms difficult problem into manageable pieces. Essential technique bridging algebra and calculus.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.11' 
  AND lesson_code = 'AHL 1.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 34: AHL 1.12 - AHL 1.12a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Extending the Number System',
    'Complex numbers extend reals to solve $x^2+1=0$. Revolutionary: $i=\sqrt{-1}$ initially called ''impossible''. Complex numbers are pairs $(a,b)$ written $a+bi$. NOT more abstract—equally valid as negative numbers were once controversial! Essential for electrical engineering, quantum mechanics, signal processing. Complete the number system.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.12' 
  AND lesson_code = 'AHL 1.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 35: AHL 1.12 - AHL 1.12b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Geometric Interpretation',
    'Argand diagram visualizes complex numbers as points/vectors. Addition: vector addition (parallelogram rule). Conjugate: reflection over real axis. Distance from origin = modulus. This geometric view reveals deep connections: multiplication rotates and scales! Complex plane bridges algebra and geometry, essential for understanding complex analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.12' 
  AND lesson_code = 'AHL 1.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 36: AHL 1.12 - AHL 1.12c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Polar Representation Basics',
    'Modulus measures ''size'' or magnitude; argument measures direction/angle. Together they give polar coordinates. Principal argument: $-\pi < \theta \leq \pi$. Be careful with quadrants! $\tan^{-1}$ gives wrong quadrant sometimes. Check signs of $a$ and $b$ separately. This polar view essential for multiplication and De Moivre''s theorem.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.12' 
  AND lesson_code = 'AHL 1.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 37: AHL 1.13 - AHL 1.13a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Euler''s Formula Connection',
    'Euler''s formula $e^{i\theta} = \cos\theta + i\sin\theta$ is one of mathematics'' most beautiful results! Links exponentials, trig, and complex numbers. Special case: $e^{i\pi} + 1 = 0$ (Euler''s identity). Polar form reveals multiplication structure clearer than Cartesian. Each representation has advantages—choose based on operation needed.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.13' 
  AND lesson_code = 'AHL 1.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 38: AHL 1.13 - AHL 1.13b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Polar Form for Multiplication?',
    'In Cartesian: $(a+bi)(c+di) = (ac-bd) + (ad+bc)i$ —messy! In polar: $r_1\text{cis}\,\theta_1 \times r_2\text{cis}\,\theta_2 = r_1r_2\text{cis}(\theta_1+\theta_2)$ —elegant! Multiplication = scale by $r$ AND rotate by $\theta$. This geometric insight powerful for physics (AC circuits), engineering, fractals. Addition easier in Cartesian; multiplication easier in polar.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.13' 
  AND lesson_code = 'AHL 1.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 39: AHL 1.13 - AHL 1.13c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Visualization Makes Complex Clear',
    'Geometric view demystifies complex numbers. Multiplying by $i$ rotates 90°—that''s why $i^2=-1$ (180° rotation). Multiplication combines rotation and scaling—powerful for transformations. Used in computer graphics, quantum mechanics, signal processing. The complex plane isn''t abstract—it''s a geometric tool for understanding rotations and oscillations.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.13' 
  AND lesson_code = 'AHL 1.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 40: AHL 1.14 - AHL 1.14a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Conjugate Pairs?',
    'Real polynomial coefficients force complex roots to appear in conjugate pairs. Why? Real coefficients mean imaginary parts must cancel when expanded. Consequence: real polynomials of odd degree always have at least one real root (pairs use even number of roots). Fundamental Theorem of Algebra: degree $n$ polynomial has exactly $n$ complex roots (counting multiplicity).',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.14' 
  AND lesson_code = 'AHL 1.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 41: AHL 1.14 - AHL 1.14b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Powers and Roots of Complex Numbers',
    'De Moivre makes powers trivial: raise modulus to power, multiply argument by $n$. For roots: $n$th roots equally spaced around circle of radius $r^{1/n}$. Example: cube roots of 1 form equilateral triangle! Applications: solving polynomial equations, Fourier analysis, fractals. Elegant connection between algebra and geometry.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.14' 
  AND lesson_code = 'AHL 1.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 42: AHL 1.14 - AHL 1.14c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Induction as Domino Effect',
    'Induction like dominos: prove first falls (base case), prove if $k$th falls then $(k+1)$th falls (inductive step). Then all fall! For De Moivre: base case easy ($n=1$), inductive step uses angle addition. This proof technique powerful—works for many sequence/formula statements. Essential tool in discrete mathematics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.14' 
  AND lesson_code = 'AHL 1.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 43: AHL 1.15 - AHL 1.15a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Induction Works',
    'Induction based on well-ordering principle: every non-empty set of positive integers has smallest element. If statement fails somewhere, there''s a smallest $n$ where it fails—but inductive step says if true at $k$, true at $k+1$. Contradiction! Powerful for proving formulas, divisibility, inequalities. Foundation of discrete mathematics and computer science.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.15' 
  AND lesson_code = 'AHL 1.15a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 44: AHL 1.15 - AHL 1.15b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'The Power of Contradiction',
    'Sometimes proving $P$ directly is hard, but assuming $\neg P$ leads to obvious impossibility. Classic example: infinitely many primes (assume finite list, construct contradiction). Indirect but powerful. Used throughout mathematics. Reveals truth by showing alternative is impossible. Requires careful logic—must reach genuine contradiction.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.15' 
  AND lesson_code = 'AHL 1.15b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 45: AHL 1.15 - AHL 1.15c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Finding Good Counterexamples',
    'To disprove, find ONE case where statement fails. Strategy: test boundary cases, special values (0, 1, -1), extremes. Counterexample must be valid (satisfy all conditions except conclusion). Common in exams: given statement, prove or disprove. If suspicious, search for counterexample. Develops critical thinking—question assumptions, test claims.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.15' 
  AND lesson_code = 'AHL 1.15c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 46: AHL 1.16 - AHL 1.16a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Geometric Interpretation',
    'System of 2 equations = 2 lines. Solution = intersection point(s). Unique: lines cross once. Infinite: identical lines. None: parallel lines. For 3 variables: equations represent planes—solution is intersection of planes. Understanding geometry helps interpret solutions. Technology essential for larger systems.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.16' 
  AND lesson_code = 'AHL 1.16a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 47: AHL 1.16 - AHL 1.16b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Matrices for Systems?',
    'Matrices organize coefficients systematically. Row operations = algebraic manipulations. RREF makes solution obvious. Scalable: same method works for 2 or 200 equations! GDC/calculator does heavy lifting for large systems. Understanding process crucial even when using technology. Foundation for linear algebra and computer science.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.16' 
  AND lesson_code = 'AHL 1.16b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 48: AHL 1.16 - AHL 1.16c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Solution Sets',
    'Infinite solutions: underdetermined system (more unknowns than equations or dependent equations). Express with parameters. No solution: contradictory equations (parallel planes never meet). Recognize from row of zeros equaling nonzero. Real applications: engineering constraints, economics optimization. Understanding solution types crucial for modeling.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.16' 
  AND lesson_code = 'AHL 1.16c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 49: SL 2.1 - SL 2.1a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Choosing the Right Form',
    'Different forms useful for different purposes. $y = mx + c$: see gradient and intercept immediately. Point-gradient: when you know a point and slope. General form: standard, works for vertical lines ($x = k$). Real context: road gradient (m), initial value (c). Converting between forms develops algebraic fluency.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.1' 
  AND lesson_code = 'SL 2.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 50: SL 2.1 - SL 2.1b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Meaning of Gradient and Intercepts',
    'Gradient = rate of change. Positive: increasing; negative: decreasing. Steeper = larger |m|. y-intercept = starting value when $x=0$. Real contexts: $m$ = speed (distance vs time), cost per item (total vs quantity); $c$ = fixed cost, initial height. Understanding these meanings essential for modeling and interpretation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.1' 
  AND lesson_code = 'SL 2.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 51: SL 2.1 - SL 2.1c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Geometric Relationships',
    'Parallel: never intersect, same steepness. Perpendicular: intersect at 90°, gradients are negative reciprocals. If $m_1 = 3$, then $m_2 = -\frac{1}{3}$ for perpendicular. Special cases: horizontal ($m=0$) perpendicular to vertical (undefined $m$). Applications: geometry problems, coordinate proofs, architecture, engineering.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.1' 
  AND lesson_code = 'SL 2.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 52: SL 2.2 - SL 2.2a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Functions',
    'Function = rule assigning each input to exactly one output. ''Machine'' analogy: input → process → output. NOT a function if one input gives multiple outputs (vertical line test fails). Domain restrictions: can''t divide by zero, can''t take $\sqrt{\text{negative}}$ (in reals). Functions model relationships: temperature vs time, cost vs quantity.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.2' 
  AND lesson_code = 'SL 2.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 53: SL 2.2 - SL 2.2b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Inverse Function Properties',
    'Inverse ''undoes'' the function. $f(f^{-1}(x)) = x$ and $f^{-1}(f(x)) = x$. Only one-to-one functions have inverses (horizontal line test). Domain of $f$ = range of $f^{-1}$ and vice versa. Graphs: $f$ and $f^{-1}$ are reflections in line $y=x$. Essential concept: encoding/decoding, temperature conversion.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.2' 
  AND lesson_code = 'SL 2.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 54: SL 2.2 - SL 2.2c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Reading Graphs Effectively',
    'Graph shows ALL function behavior at once. Sketch (label key features) vs accurate plot. Interpret: where increasing/decreasing, positive/negative. Inverse graphs: if point $(a,b)$ on $f$, then $(b,a)$ on $f^{-1}$. Visual understanding complements algebraic—see patterns, predict behavior. Essential skill for modeling and analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.2' 
  AND lesson_code = 'SL 2.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 55: SL 2.3 - SL 2.3a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Technology as a Tool',
    'GDC reveals function behavior quickly. Adjust window to see relevant features. Technology explores ''what if'' scenarios. BUT: understand mathematics, don''t just press buttons! Sketch should communicate understanding—label axes, scale, key points. In exams: technology allowed on Paper 2, often restricted on Paper 1. Practice both ways.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.3' 
  AND lesson_code = 'SL 2.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 56: SL 2.3 - SL 2.3b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'From Words to Graph',
    'Context gives clues: ''initial value'' → y-intercept; ''decreasing'' → negative gradient; ''levels off'' → horizontal asymptote. Real scenario: population growth starts slow, increases rapidly, then levels (logistic curve). Sketching tests understanding—can you visualize the mathematics? Communication skill: your sketch tells the story. Practice converting verbal descriptions to visual representations.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.3' 
  AND lesson_code = 'SL 2.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 57: SL 2.3 - SL 2.3c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Visualizing Function Operations',
    'Adding functions: add $y$-coordinates at each $x$. Where $f$ and $g$ both positive: sum higher than either. Where opposite signs: can cancel. Graphically builds intuition for function algebra. Real application: combining waves (sound), adding costs (economics). Technology makes exploration easy—try different combinations, observe patterns.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.3' 
  AND lesson_code = 'SL 2.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 58: SL 2.4 - SL 2.4a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Reading Graphs for Information',
    'Each feature tells something: zeros = solutions to $f(x)=0$; max/min = optimization points; asymptotes = boundaries. Symmetry simplifies analysis. Use GDC to find exact coordinates. Context interpretation: max profit, min cost, break-even points (zeros). Graph reading is data literacy—essential for STEM and beyond.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.4' 
  AND lesson_code = 'SL 2.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 59: SL 2.4 - SL 2.4b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Intersection = Equation Solution',
    'Graphical solution mirrors algebraic. Intersection point solves $f(x) = g(x)$. Visual: see how many solutions (number of intersections). Technology powerful when algebra difficult. Real contexts: break-even point (cost = revenue), equilibrium (supply = demand). Multiple intersections → multiple solutions. No intersection → no solution.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.4' 
  AND lesson_code = 'SL 2.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 60: SL 2.4 - SL 2.4c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Asymptotic Behavior',
    'Asymptote = line graph approaches but never touches (usually). Vertical: division by zero, function ''blows up''. Horizontal: end behavior, function ''levels off''. Graph behavior near asymptotes crucial for understanding function. Real contexts: carrying capacity (population), terminal velocity. Technology shows behavior clearly—zoom to see approach.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.4' 
  AND lesson_code = 'SL 2.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 61: SL 2.5 - SL 2.5a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Function Composition as Chaining',
    'Composition chains functions: output of one becomes input of next. Like machines in series: $x$ → $g$ → $g(x)$ → $f$ → $f(g(x))$. Order matters! Read right to left: $f \circ g$ means ''do $g$, then $f$''. Real applications: temperature conversion chains (°C → K → °F), data transformations. Powerful for building complex operations from simple ones.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.5' 
  AND lesson_code = 'SL 2.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 62: SL 2.5 - SL 2.5b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'The Role of Identity',
    'Identity function is the ''do nothing'' function. Acts like zero in addition or 1 in multiplication. Composing with identity changes nothing: $f \circ I = I \circ f = f$. With inverses: applying function then inverse returns to start. Fundamental in abstract algebra and functional programming. Simple but essential concept.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.5' 
  AND lesson_code = 'SL 2.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 63: SL 2.5 - SL 2.5c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'One-to-One Requirement',
    'Not all functions have inverses! Need one-to-one: each output comes from exactly one input. $x^2$ not one-to-one: both $2$ and $-2$ give $4$. Horizontal line test: if any horizontal line crosses twice, not one-to-one. Solution: restrict domain to make one-to-one. Understanding this prevents errors when finding inverses.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.5' 
  AND lesson_code = 'SL 2.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 64: SL 2.6 - SL 2.6a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Parabolas',
    'Parabola is U-shaped curve. Coefficient $a$ controls: direction (up/down) and width (narrow/wide). Larger $|a|$ → narrower parabola. All parabolas symmetric about vertical axis through vertex. Ubiquitous: projectile motion, profit models, optics. Graph shows all solutions to $f(x) = k$ at once. Visual power of quadratics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.6' 
  AND lesson_code = 'SL 2.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 65: SL 2.6 - SL 2.6b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Choosing the Right Form',
    'Each form reveals different information. Factored: see roots immediately. Vertex: see turning point and max/min value. Standard: general form, easy to differentiate. Converting between forms is key skill. Match form to question: finding roots? Use factored. Finding max/min? Use vertex. Flexibility essential for problem-solving.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.6' 
  AND lesson_code = 'SL 2.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 66: SL 2.6 - SL 2.6c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Vertex as Optimization Point',
    'Vertex represents turning point—maximum or minimum. Applications: maximum height of projectile, minimum cost, maximum profit. Axis of symmetry divides parabola into mirror images. Understanding vertex crucial for optimization problems. Real contexts: best pricing strategy, optimal design dimensions. Vertex tells the ''best'' value and when it occurs.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.6' 
  AND lesson_code = 'SL 2.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 67: SL 2.7 - SL 2.7a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Choosing Solution Methods',
    'Factorization: fastest if obvious factors. Quadratic formula: always works, use when factoring difficult. Completing square: useful for deriving vertex form. Graphical: technology, approximate solutions. Strategic choice saves time. Practice recognizing which method suits each equation. Multiple methods provide checks—different paths to same answer builds confidence.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.7' 
  AND lesson_code = 'SL 2.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 68: SL 2.7 - SL 2.7b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Discriminant Determines Root Nature',
    'Discriminant reveals root type without solving! Saves time: check $\Delta$ first to know what to expect. Graphically: $\Delta > 0$ means parabola crosses x-axis twice; $\Delta = 0$ means touches once (vertex on axis); $\Delta < 0$ means doesn''t cross (no real roots). Essential for analysis and problem-solving strategy.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.7' 
  AND lesson_code = 'SL 2.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 69: SL 2.7 - SL 2.7c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Graphical Approach to Inequalities',
    'Inequality asks: where is function above/below x-axis? Sketch shows solution regions clearly. Between roots or outside roots? Depends on parabola opening and inequality sign. Number line representation shows solution set. Real contexts: profitable production levels, safe operating ranges. Visual method prevents sign errors.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.7' 
  AND lesson_code = 'SL 2.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 70: SL 2.8 - SL 2.8a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Reciprocal Behavior',
    'Reciprocal ''flips'' numbers: large → small, small → large. As $x \to 0$, $f(x) \to \infty$ (vertical asymptote). As $x \to \infty$, $f(x) \to 0$ (horizontal asymptote). Two branches (positive and negative quadrants). Self-inverse property special: applying twice returns original. Foundation for rational functions. Real applications: inverse relationships (speed vs time).',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.8' 
  AND lesson_code = 'SL 2.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 71: SL 2.8 - SL 2.8b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Behavior of Rational Functions',
    'Rational functions are ratios of polynomials. Near vertical asymptote: function shoots to $\pm\infty$. Far from origin: approaches horizontal asymptote. Can cross horizontal asymptote (unlike vertical). Graph has two or more distinct regions. Real applications: concentration dilution, average cost, rates. Understanding asymptotes key to graphing.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.8' 
  AND lesson_code = 'SL 2.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 72: SL 2.8 - SL 2.8c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Interpreting Asymptotes',
    'Vertical asymptote: function undefined, physical/mathematical boundary. Horizontal asymptote: long-term behavior, limiting value. Real examples: carrying capacity (population can''t exceed), concentration approaches equilibrium. Asymptotes define ''envelope'' of function behavior. Understanding these guides graphing and contextual interpretation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.8' 
  AND lesson_code = 'SL 2.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 73: SL 2.9 - SL 2.9a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Exponential Growth and Decay',
    'Exponential functions model rapid change. Growth ($a > 1$): population, investments, epidemics. Decay ($0 < a < 1$): radioactive decay, drug elimination, cooling. Key property: constant percentage change per unit time. Inverse of logarithm. Fastest-growing elementary function. Understanding exponentials essential for modeling natural phenomena.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.9' 
  AND lesson_code = 'SL 2.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 74: SL 2.9 - SL 2.9b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Comparing Exponential Bases',
    'Larger base = steeper growth. $2^x$ doubles each unit; $10^x$ multiplies by 10. All growth exponentials pass through $(0,1)$ and increase to right. Decay functions mirror: $a^{-x} = (1/a)^x$. Base $e$ is ''natural''—appears in calculus, natural growth. Understanding base effects helps choose appropriate model for context.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.9' 
  AND lesson_code = 'SL 2.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 75: SL 2.9 - SL 2.9c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Exponential Modeling Applications',
    'Exponential equations model growth/decay: population $P(t) = P_0 e^{rt}$, radioactive decay $N(t) = N_0 e^{-\lambda t}$, Newton''s cooling. Solving finds ''when'': when population doubles? when half-life reached? Logarithms essential tool—linearize exponential relationship. Real power: predict future, estimate past. Foundation for differential equations.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.9' 
  AND lesson_code = 'SL 2.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 76: SL 2.10 - SL 2.10a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Logarithms Invert Exponentials',
    'Logarithm is mirror image of exponential. If $y = a^x$, then $x = \log_a(y)$. Exponential compresses input, expands output; logarithm reverses this. Domain restriction: log only defined for positive numbers (exponential only gives positive outputs). This inverse relationship fundamental to solving exponential equations.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.10' 
  AND lesson_code = 'SL 2.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 77: SL 2.10 - SL 2.10b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Logarithmic Graph Behavior',
    'Log graphs grow slowly—opposite of exponential. As $x \to 0^+$, $f(x) \to -\infty$ (vertical asymptote). As $x \to \infty$, $f(x) \to \infty$ but slowly. Passes through $(1, 0)$ always. Mirror of exponential across $y=x$. Real applications: pH scale, decibels, Richter scale. Understanding graph helps interpret these scales.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.10' 
  AND lesson_code = 'SL 2.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 78: SL 2.10 - SL 2.10c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Applications and Domain Checking',
    'Logarithmic models: Richter scale, pH, sound intensity. Solving finds critical values. CRUCIAL: check domain! All log arguments must be positive. Reject solutions making arguments negative or zero. Common exam error: accepting invalid solutions. Always verify in original equation. Domain awareness separates strong students from weak.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.10' 
  AND lesson_code = 'SL 2.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 79: SL 2.11 - SL 2.11a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Transformations',
    'Transformations modify graphs systematically. Inside function ($x$) affects horizontal; outside affects vertical. Sign confusion: $f(x-3)$ shifts RIGHT (opposite of intuition). $f(2x)$ compresses horizontally (divide x-coordinates by 2). Master these to sketch complicated functions from basic shapes. Essential for understanding families of functions.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.11' 
  AND lesson_code = 'SL 2.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 80: SL 2.11 - SL 2.11b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Transformation Composition',
    'Multiple transformations = composition of changes. Apply systematically, tracking each effect. Start with parent function (basic shape), apply transformations in order. Check key points: apply transformation to known coordinates. Understanding order prevents errors. Common mistake: mixing up horizontal shift direction. Practice with basic functions (quadratic, exponential) builds intuition.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.11' 
  AND lesson_code = 'SL 2.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 81: SL 2.11 - SL 2.11c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Real-World Transformation Modeling',
    'Transformations model real changes: time zone shift (horizontal translation), currency conversion (vertical stretch), temperature scale (linear transformation). Understanding transformations lets you adapt standard models to specific situations. Efficient problem-solving: modify known function rather than start from scratch. Thinking in transformations is powerful mathematical tool.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.11' 
  AND lesson_code = 'SL 2.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 82: AHL 2.12 - AHL 2.12a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Polynomial Characteristics',
    'Polynomials are ''nice'' functions: smooth, continuous, defined everywhere. Degree determines: number of turns (at most $n-1$), number of roots (at most $n$), end behavior. Odd degree: opposite infinities at ends. Even degree: same infinities. No breaks, holes, or asymptotes. Foundation of algebra—all operations stay in polynomial family.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.12' 
  AND lesson_code = 'AHL 2.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 83: AHL 2.12 - AHL 2.12b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Using Factor Theorem Strategically',
    'Factor theorem connects roots and factors. Find one root → get one factor → polynomial division → lower degree. Try simple values: $\pm 1, \pm 2, \pm 3$. Rational root theorem gives candidates. Each factor found reduces problem difficulty. Essential for solving higher-degree polynomials. Systematic approach: test, factor, reduce, repeat.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.12' 
  AND lesson_code = 'AHL 2.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 84: AHL 2.12 - AHL 2.12c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Remainder Theorem Applications',
    'Remainder theorem avoids long division! Just evaluate function. Find remainder quickly without dividing. Useful for checking divisibility: if $f(a) = 0$, divides exactly. Combine with factor theorem for complete factoring strategy. Real application: error-checking codes, polynomial interpolation. Simple but powerful shortcut.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.12' 
  AND lesson_code = 'AHL 2.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 85: AHL 2.13 - AHL 2.13a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Complex Rational Function Behavior',
    'Higher degree rational functions: more complex behavior. Multiple vertical asymptotes possible (each root of denominator). Degree comparison determines horizontal asymptote existence. Can have holes (common factors in numerator/denominator). Behavior between asymptotes varies. Understanding polynomial degrees essential for analysis. More realistic for modeling complex phenomena.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.13' 
  AND lesson_code = 'AHL 2.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 86: AHL 2.13 - AHL 2.13b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Oblique Asymptotes Explained',
    'Oblique (slant) asymptotes are diagonal lines. Occur when numerator degree exceeds denominator by exactly 1. Graph approaches this line as $x \to \pm\infty$. Polynomial division reveals quotient (asymptote) and remainder (deviation). Unlike horizontal asymptotes, these are tilted. Shows more sophisticated end behavior. Real applications: optimization with constraints.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.13' 
  AND lesson_code = 'AHL 2.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 87: AHL 2.13 - AHL 2.13c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Rational Functions in Real Problems',
    'Rational functions model rates, averages, concentrations. Average cost approaches marginal cost (horizontal asymptote). Dilution problems: concentration = amount/volume. Optimization: minimize average cost, maximize efficiency. Understanding asymptotes gives long-term behavior. These functions everywhere in economics, chemistry, engineering. Connect algebra to real applications.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.13' 
  AND lesson_code = 'AHL 2.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 88: AHL 2.14 - AHL 2.14a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Composite Domain Restrictions',
    'Composite function domains trickier than simple functions. Must satisfy BOTH: inner function defined AND outer function accepts result. Chain of constraints. Example: $\sqrt{\ln(x)}$ requires $x > 0$ (for ln) AND $\ln(x) \geq 0$ (for sqrt), so $x \geq 1$. Careful analysis prevents domain errors. Essential for complex function work.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.14' 
  AND lesson_code = 'AHL 2.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 89: AHL 2.14 - AHL 2.14b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Finding Complex Inverses',
    'For complex functions, method: replace $y$, swap, solve—but watch domain! Composite inverses: reverse order of operations. Like putting on socks then shoes: to undo, remove shoes first! Restrict domain if needed for one-to-one. Understanding composition helps deconstruct complex functions. Essential for advanced function analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.14' 
  AND lesson_code = 'AHL 2.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 90: AHL 2.14 - AHL 2.14c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Advanced Function Applications',
    'Composition and inversion solve complex problems. Cryptography: encrypt (compose), decrypt (inverse). Iterative processes: repeatedly apply function. Fixed points: equilibrium values. Understanding these concepts enables modeling multi-step processes, analyzing stability, solving nested equations. Abstract but powerful—foundation for dynamics, chaos theory.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.14' 
  AND lesson_code = 'AHL 2.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 91: AHL 2.15 - AHL 2.15a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Sign Analysis Method',
    'Rational inequalities need careful sign analysis. Critical points divide number line into intervals. Function can only change sign at zeros or asymptotes. Test one value per interval. Be careful: can''t multiply by denominator (might be negative!). Graphical view confirms: where is graph above/below axis? Number line method systematic and reliable.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.15' 
  AND lesson_code = 'AHL 2.15a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 92: AHL 2.15 - AHL 2.15b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Range Restrictions',
    'Range harder than domain to find. Horizontal asymptotes often indicate excluded values. Algebraic method: swap $x$ and $y$, solve for $y$—valid $x$ values give range. Graphical: look at all $y$ values covered. Some rational functions have complete range; others have gaps. Understanding range essential for inverse function existence.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.15' 
  AND lesson_code = 'AHL 2.15b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 93: AHL 2.15 - AHL 2.15c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Real Optimization with Rationals',
    'Rational functions model many optimization scenarios: minimize average cost, maximize efficiency, optimal box dimensions. Calculus finds exact optima. Understanding asymptotes: often limiting cases aren''t optimal. Real constraints: domain restrictions matter. Common pattern: cost has fixed and variable parts. Applications: economics, engineering design, resource allocation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.15' 
  AND lesson_code = 'AHL 2.15c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 94: AHL 2.16 - AHL 2.16a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Complex Transformation Effects',
    'Advanced transformations create sophisticated graphs. Absolute value creates V-shapes or removes negative parts. Dilations from non-origin points. Multiple compositions build complexity. Understanding these extends basic transformation toolkit. Real applications: signal processing (absolute value), computer graphics. Master basic transformations first, then build complexity.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.16' 
  AND lesson_code = 'AHL 2.16a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 95: AHL 2.16 - AHL 2.16b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Matrices Encode Transformations',
    'Matrices provide algebraic representation of geometric transformations. Each transformation = specific matrix. Composition = matrix multiplication. Inverse transformation = matrix inverse. This linear algebra connection powerful: systematic, computable, generalizable to higher dimensions. Foundation for computer graphics, robotics, data science. Elegant unification of geometry and algebra.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.16' 
  AND lesson_code = 'AHL 2.16b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 96: AHL 2.16 - AHL 2.16c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Applied Transformation Analysis',
    'Advanced transformations model sophisticated phenomena: signal processing (frequency/amplitude shifts), image transformations (computer graphics), economic models (scaling/shifting data). Understanding transformation decomposition: identify each component''s effect. Build complex from simple. Real skill: recognize transformation pattern in context, build appropriate model. Bridges pure and applied mathematics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.16' 
  AND lesson_code = 'AHL 2.16c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 97: SL 3.1 - SL 3.1a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Visualizing 3D Space',
    '3D extends 2D by adding height/depth. Three mutually perpendicular axes. Points need three coordinates. Distance formula extends Pythagoras to three dimensions. Harder to visualize but same principles. Applications: architecture, physics, computer graphics, navigation. Practice: sketch simple 3D diagrams. Understanding spatial relationships crucial for geometry and vectors.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.1' 
  AND lesson_code = 'SL 3.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 98: SL 3.1 - SL 3.1b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Planes in 3D',
    'Plane is flat 2D surface in 3D space. Infinite extent. Defined by: (1) three non-collinear points, or (2) point and normal vector. Normal vector perpendicular to plane—crucial concept. Equation $ax + by + cz = d$ describes all points satisfying relationship. Applications: structural design, geology (rock layers), computer graphics. Fundamental 3D geometry object.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.1' 
  AND lesson_code = 'SL 3.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 99: SL 3.1 - SL 3.1c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    '3D Intersection Analysis',
    'Line-plane intersection: usually one point. Special cases: parallel (no intersection) or line lies in plane (infinite). Two planes: usually intersect in a line. Three planes: can meet at point, line, or nowhere. System of equations approach. Understanding these cases essential for 3D problem-solving. Applications: flight paths, structural engineering.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.1' 
  AND lesson_code = 'SL 3.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 100: SL 3.2 - SL 3.2a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Right Triangle Trigonometry',
    'Trig ratios connect angles to side ratios in right triangles. SOHCAHTOA mnemonic helps remember. Each ratio is dimensionless (length/length). Inverse process: given ratio, find angle using $\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$. Foundation for all trigonometry. Applications: navigation, surveying, engineering. Understanding these ratios opens world of angle-based problems.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.2' 
  AND lesson_code = 'SL 3.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 101: SL 3.2 - SL 3.2b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Memorizing Special Angles',
    '30-60-90 triangle (sides 1, √3, 2) gives 30° and 60° values. 45-45-90 triangle (sides 1, 1, √2) gives 45° values. These exact values essential for non-calculator work. Pattern: $\sin$ increases, $\cos$ decreases from 0° to 90°. Understanding triangle derivation helps recall. Used throughout trigonometry—worth memorizing!',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.2' 
  AND lesson_code = 'SL 3.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 102: SL 3.2 - SL 3.2c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Real-World Trig Applications',
    'Trigonometry solves indirect measurement problems. Can''t measure building height directly? Use angle and distance. Navigation: bearings use trig. Engineering: slopes, forces, structural analysis. Drawing clear diagram crucial—label known/unknown, identify right triangle. Choose ratio containing both given and unknown. Real skill: translating words to mathematical model.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.2' 
  AND lesson_code = 'SL 3.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 103: SL 3.3 - SL 3.3a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Unit Circle Power',
    'Unit circle revolutionizes trigonometry: extends from 0-90° to all angles. Coordinates ARE the trig ratios! $x = \cos\theta$, $y = \sin\theta$. Quadrant determines sign. Angles > 90° now meaningful. Reference angles connect all quadrants. Foundation for periodic functions, waves, circular motion. Visualizing trig on unit circle builds deep understanding.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.3' 
  AND lesson_code = 'SL 3.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 104: SL 3.3 - SL 3.3b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Radians?',
    'Radians are ''natural'' angle measure. 1 radian = angle subtending arc length equal to radius. Full circle: circumference $2\pi r$ at radius $r$ → $2\pi$ radians. In calculus, radians essential: $\frac{d}{dx}\sin x = \cos x$ ONLY in radians. Cleaner formulas. Most advanced math uses radians. Degrees historical; radians mathematical.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.3' 
  AND lesson_code = 'SL 3.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 105: SL 3.3 - SL 3.3c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Circle Sector Geometry',
    'Arc length proportional to angle: fraction of circumference. Sector area proportional to angle: fraction of circle area. MUST use radians for these formulas! Degree formulas messier. Applications: pendulums, circular motion, gear design. Understanding these connects angle measure to physical distance and area. Essential for circular geometry.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.3' 
  AND lesson_code = 'SL 3.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 106: SL 3.4 - SL 3.4a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Trig Identities',
    'Identities are equations true for ALL angle values. Pythagorean identity comes from unit circle: $x^2 + y^2 = 1$. These are tools—not just facts to memorize. Use to: simplify expressions, solve equations, prove other identities. Fundamental identities generate many others. Recognition key skill: see when to apply which identity.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.4' 
  AND lesson_code = 'SL 3.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 107: SL 3.4 - SL 3.4b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Simplification Techniques',
    'Goal: simpler form using identities. Strategy: convert everything to sin/cos often helps. Look for Pythagorean patterns ($\sin^2 + \cos^2$). Factoring reveals hidden structure. Like algebraic simplification but with trig functions. Practice recognizes patterns quickly. Essential skill for solving trig equations and proving identities. Multiple paths possible—choose clearest.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.4' 
  AND lesson_code = 'SL 3.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 108: SL 3.4 - SL 3.4c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Proof Techniques and Logic',
    'Proving identities develops rigorous thinking. Each step must be justified. Common approach: convert to sin/cos. Sometimes: multiply by conjugate, factor creatively. Don''t assume what proving—circular logic! Show one side transforms to other. Multiple valid proofs possible. Skills transfer: logical reasoning, seeing structure, strategic manipulation. Essential practice for mathematical maturity.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.4' 
  AND lesson_code = 'SL 3.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 109: SL 3.5 - SL 3.5a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Periodic Wave Behavior',
    'Sine and cosine are wave functions. Repeat every $2\pi$ (period). Oscillate between -1 and 1 (amplitude). Model periodic phenomena: seasons, tides, sound waves, AC current. Smooth, continuous oscillations. Cosine = sine shifted left $\frac{\pi}{2}$. Understanding these graphs essential for physics, engineering, signal processing.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.5' 
  AND lesson_code = 'SL 3.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 110: SL 3.5 - SL 3.5b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Wave Parameters',
    'Amplitude controls height (loudness of sound, voltage of AC). Period controls cycle length (pitch of sound, seasons). Larger $b$ → more cycles in same space → shorter period. These parameters describe any wave phenomenon. Real modeling: match amplitude to physical range, period to time scale. Adjusting $a$ and $b$ adapts basic wave to specific context.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.5' 
  AND lesson_code = 'SL 3.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 111: SL 3.5 - SL 3.5c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Complete Wave Transformation',
    'All four parameters describe any sinusoidal wave: $a$ (amplitude), $b$ (frequency), $c$ (phase), $d$ (midline). Phase shift slides wave horizontally. Vertical shift moves midline from $y=0$ to $y=d$. Real modeling: tides oscillate around mean sea level (vertical shift), high tide timing varies (phase shift). Master all four to model any periodic phenomenon.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.5' 
  AND lesson_code = 'SL 3.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 112: SL 3.6 - SL 3.6a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Tangent Function Behavior',
    'Tangent different from sin/cos: unbounded (no max/min), has asymptotes, shorter period ($\pi$ not $2\pi$). Increases through each period. Asymptotes where $\cos x = 0$ (division by zero). S-shaped curves between asymptotes. Applications: slopes, angles of inclination. Understanding tangent completes trig function family.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.6' 
  AND lesson_code = 'SL 3.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 113: SL 3.6 - SL 3.6b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Asymptotes from Ratios',
    'Tangent and cotangent have asymptotes because they''re ratios. Asymptote occurs where denominator equals zero. $\tan x = \frac{\sin x}{\cos x}$: undefined when $\cos x = 0$. Between asymptotes: continuous curve. Understanding why asymptotes occur (not just memorizing) builds deeper comprehension. Asymptotes mark boundaries of each period.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.6' 
  AND lesson_code = 'SL 3.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 114: SL 3.6 - SL 3.6c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Tangent Transformation Effects',
    'Tangent period is $\pi$ (half of sin/cos). Coefficient $b$ changes frequency. $a$ stretches vertically but no bounded amplitude. Asymptote spacing determined by period. Phase shifts move entire pattern. Understanding these transformations lets you model periodic unbounded phenomena (rare but important in optics, engineering).',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.6' 
  AND lesson_code = 'SL 3.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 115: SL 3.7 - SL 3.7a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'From Angles to Arc Length',
    'Circular functions broaden trig from angles to any real number. Input = distance traveled around unit circle (arc length). Output = coordinates. Periodic because circle repeats. This view essential for calculus: functions of real variables. No longer limited to geometric angles. Applications: circular motion, waves, oscillations. Modern view of trigonometry.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.7' 
  AND lesson_code = 'SL 3.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 116: SL 3.7 - SL 3.7b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Graphical Properties',
    'Circular function graphs identical to trig function graphs—just different interpretation. Input is real number (not necessarily angle). Periodic behavior from circular nature. Use these graphs to analyze oscillations, waves, repeating patterns. Visual understanding crucial: see periodicity, amplitude, phase. Foundation for Fourier analysis and signal processing.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.7' 
  AND lesson_code = 'SL 3.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 117: SL 3.7 - SL 3.7c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Modeling Periodic Phenomena',
    'Circular functions model anything repeating: tides, day length, business cycles, heartbeats, planetary motion. Extract parameters from context: measure maximum, minimum (find $a$, $d$), identify cycle length (find $b$), note when maximum occurs (find $c$). Skill: translate physical pattern to mathematical model. This is mathematical modeling in action!',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.7' 
  AND lesson_code = 'SL 3.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 118: SL 3.8 - SL 3.8a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Inverse Trig',
    'Inverse trig answers: ''what angle gives this ratio?'' Restricted ranges needed (trig not one-to-one without restriction). Principal values: $\sin^{-1}$ gives $[-\frac{\pi}{2}, \frac{\pi}{2}]$, $\cos^{-1}$ gives $[0, \pi]$. Calculator gives principal value only. Understanding domain/range restrictions crucial. Essential for solving trig equations.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.8' 
  AND lesson_code = 'SL 3.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 119: SL 3.8 - SL 3.8b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Inverse Trig Graph Features',
    'Inverse trig graphs are reflections of restricted trig graphs across $y = x$. $\sin^{-1}$ and $\tan^{-1}$ increasing, $\cos^{-1}$ decreasing. Bounded outputs (angles). $\tan^{-1}$ has horizontal asymptotes (approaches but never reaches $\pm\frac{\pi}{2}$). Understanding these graphs helps solve trig equations graphically and interpret inverse trig values.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.8' 
  AND lesson_code = 'SL 3.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 120: SL 3.8 - SL 3.8c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Finding Angles from Ratios',
    'Inverse trig essential for ''find the angle'' problems. Given side ratio, need angle. Real applications: finding bearing from coordinates, elevation angle from height/distance, slope angle from gradient. Remember: calculator gives principal value—may need other solutions. Understanding periodicity helps find all solutions. Bridge from ratio back to angle.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.8' 
  AND lesson_code = 'SL 3.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 121: AHL 3.9 - AHL 3.9a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Completing the Trig Family',
    'Six trig functions total: three basic (sin, cos, tan) and three reciprocal (csc, sec, cot). Reciprocals flip ratios: where sin is small, csc is large. Undefined where denominator is zero. Less common but useful in certain identities and integrals. Understanding all six provides complete trig toolkit. Pythagorean identities extend to reciprocals.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.9' 
  AND lesson_code = 'AHL 3.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 122: AHL 3.9 - AHL 3.9b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Reciprocal Graph Behavior',
    'Reciprocal graphs mirror behavior: where sin/cos = 0, reciprocal has asymptote. Where sin/cos = ±1, reciprocal also ±1. Between: reciprocal curves away from zero. U-shaped or inverted-U curves between asymptotes. Understanding reciprocal relationship: small → large, large → small. Less commonly graphed but conceptually important.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.9' 
  AND lesson_code = 'AHL 3.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 123: AHL 3.9 - AHL 3.9c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Inverse Trig Relationships',
    'Inverse trig functions related by complementary angle relationships. $\sin^{-1}$ and $\cos^{-1}$ sum to $\frac{\pi}{2}$ (complementary). Symmetry properties (odd/even) extend to inverses. These identities simplify complex expressions, solve equations. Understanding relationships reveals deeper structure. Advanced applications in calculus, complex analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.9' 
  AND lesson_code = 'AHL 3.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 124: AHL 3.10 - AHL 3.10a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Compound Angles',
    'Compound formulas let you find trig of sums/differences. $\sin(A + B) \neq \sin A + \sin B$! These formulas non-intuitive but essential. Derivable from geometry or complex numbers. Applications: wave interference, phase shifts, angle addition in navigation. Memorize these—used constantly in advanced trig. Sign patterns matter: practice to internalize.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.10' 
  AND lesson_code = 'AHL 3.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 125: AHL 3.10 - AHL 3.10b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Double Angle Applications',
    'Double angle formulas are compound angle special cases (set $B = A$). Multiple forms for $\cos(2A)$—choose based on context. Power reduction formulas reverse process. Applications: integration (reducing powers), solving trig equations, simplifying expressions. Essential in physics (wave doubling, frequency). Derive from compound angles but memorize for efficiency.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.10' 
  AND lesson_code = 'AHL 3.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 126: AHL 3.10 - AHL 3.10c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Strategic Use of Angle Formulas',
    'Angle formulas expand trig toolkit dramatically. Find exact values for non-standard angles. Simplify products to sums (reverse process also useful). Solve equations involving multiple angles. Prove complex identities. Key skill: recognize when to apply which formula. Real applications: wave interference, Fourier analysis. These formulas unlock advanced trigonometry.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.10' 
  AND lesson_code = 'AHL 3.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 127: AHL 3.11 - AHL 3.11a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Even and Odd Symmetry',
    'Even functions symmetric about y-axis (cos, sec). Odd functions symmetric about origin (sin, tan, csc, cot). This affects: simplification, integration (odd over symmetric interval = 0), solving equations. Understanding symmetry reduces calculation—exploit patterns. Graph symmetry immediately visible. Essential property for function analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.11' 
  AND lesson_code = 'AHL 3.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 128: AHL 3.11 - AHL 3.11b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Combining Period and Symmetry',
    'Periodicity + symmetry generate all angle relationships. Reference angles use these properties. Any angle reducible to $[0, \frac{\pi}{2}]$ using period and symmetry. Example: $\sin(240°) = \sin(180° + 60°) = -\sin(60°)$. Understanding these patterns essential for exact value problems, simplification, solving equations. Navigation around unit circle.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.11' 
  AND lesson_code = 'AHL 3.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 129: AHL 3.11 - AHL 3.11c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Exploiting Symmetry',
    'Symmetry = computational shortcut. Odd function integrated over symmetric interval? Zero! Finding multiple solutions? Use symmetry. Proving identity? Apply even/odd property. Understanding symmetry reveals structure, reduces work. Common pattern recognition: see symmetry, exploit it. Advanced: Fourier series uses even/odd decomposition. Symmetry is powerful mathematical tool.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.11' 
  AND lesson_code = 'AHL 3.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 130: AHL 3.12 - AHL 3.12a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Vectors',
    'Vectors have magnitude AND direction (unlike scalars: just magnitude). Represent: displacement, velocity, force. Geometric: arrow with length and direction. Algebraic: components in each direction. Position independent: same vector anywhere if magnitude/direction match. Essential for physics, engineering. Vectors model directed quantities mathematically.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.12' 
  AND lesson_code = 'AHL 3.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 131: AHL 3.12 - AHL 3.12b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Geometric Vector Operations',
    'Addition: place vectors tip-to-tail, resultant from start to end (parallelogram law). Scalar multiplication: stretch by $|k|$, reverse if $k < 0$. Subtraction: vector from second to first. These geometric interpretations make vector algebra visual. Applications: combining forces (physics), navigation (resultant displacement). Understanding both algebraic and geometric views essential.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.12' 
  AND lesson_code = 'AHL 3.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 132: AHL 3.12 - AHL 3.12c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Vectors in Real Problems',
    'Vectors natural for physics: velocity has speed and direction, force has magnitude and direction. Displacement different from distance (straight line vs path). Vector addition: combine velocities (relative motion), forces (equilibrium). Real applications: navigation (ground speed = air speed + wind), projectile motion. Vectors make multi-dimensional problems manageable.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.12' 
  AND lesson_code = 'AHL 3.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 133: AHL 3.13 - AHL 3.13a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Linear System Structure',
    'Linear systems fundamental in mathematics and applications. Each equation represents constraint. Solution satisfies ALL constraints simultaneously. Understanding solution types crucial: unique (consistent), none (inconsistent), infinite (dependent). Geometric interpretation helps: equations as planes/lines, solution as intersection. Foundation for linear algebra, optimization.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.13' 
  AND lesson_code = 'AHL 3.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 134: AHL 3.13 - AHL 3.13b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Gaussian Elimination Process',
    'Systematic algorithm for solving systems. Row operations preserve solutions. Forward elimination: create zeros below diagonal. Back substitution: create zeros above. RREF reveals solution structure immediately. Scalable: computers use this for huge systems. Understanding process important even when using technology. Foundation of numerical linear algebra.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.13' 
  AND lesson_code = 'AHL 3.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 135: AHL 3.13 - AHL 3.13c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Real-World Linear Models',
    'Linear systems everywhere: balancing chemical equations, analyzing circuits, optimizing production, resource allocation. Each constraint becomes equation. Solution gives optimal/feasible point. Understanding when problem is linear crucial. Matrix methods handle complexity. Real skill: translate problem to mathematical system. Connect abstract algebra to concrete applications.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.13' 
  AND lesson_code = 'AHL 3.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 136: AHL 3.14 - AHL 3.14a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Dot vs Cross Product',
    'Dot product: measures alignment, gives scalar. $\mathbf{u} \cdot \mathbf{v} = 0$ means perpendicular. Cross product: measures perpendicularity, gives vector perpendicular to both. Right-hand rule for direction. $|\mathbf{u} \times \mathbf{v}|$ = parallelogram area. Applications: work (dot), torque (cross), physics. Two different multiplications with different meanings!',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.14' 
  AND lesson_code = 'AHL 3.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 137: AHL 3.14 - AHL 3.14b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Vectors Describe Geometry',
    'Vector equations elegant for 3D geometry. Lines: point + parameter × direction. Planes: all points satisfying dot product condition. These forms reveal geometric structure. Intersections: solve vector equations. Distances: use dot product. Angles: use dot product formula. Vector approach unifies 2D/3D geometry, generalizes easily. Essential for spatial analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.14' 
  AND lesson_code = 'AHL 3.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 138: AHL 3.14 - AHL 3.14c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Vectors in Physics and Engineering',
    'Dot product: work, power, projections. Cross product: torque, angular momentum, magnetic force. Vector calculus: gradient, divergence, curl. Essential for: mechanics, electromagnetism, fluid dynamics, computer graphics. Vectors provide coordinate-free formulations. Understanding vector operations unlocks physics. Mathematical tool for multidimensional analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.14' 
  AND lesson_code = 'AHL 3.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 139: AHL 3.15 - AHL 3.15a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'System Analysis Theory',
    'Rank determines solution type. Consistent if equations not contradictory. Dependent if equations not all independent (some redundant). Understanding these concepts theoretical but practical: predicts solution behavior before solving. Applications: determining if constraints are feasible, identifying redundant information. Linear algebra foundation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.15' 
  AND lesson_code = 'AHL 3.15a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 140: AHL 3.15 - AHL 3.15b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Matrices as Algebraic Objects',
    'Matrices: rectangular arrays of numbers with defined operations. Not commutative: $AB \neq BA$ generally! Determinant: measures scaling factor, zero if singular (no inverse). Inverse matrix ''undoes'' multiplication. Applications: solving systems ($Ax = b \Rightarrow x = A^{-1}b$), transformations, data analysis. Abstract algebra connects to geometry.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.15' 
  AND lesson_code = 'AHL 3.15b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 141: AHL 3.15 - AHL 3.15c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Complex Linear Applications',
    'Advanced linear systems model: network flow (traffic, internet), portfolio optimization (finance), resource scheduling (operations), structural analysis (engineering). Large-scale: thousands of variables/equations. Computer algorithms essential. Understanding theory guides setup, interpretation. Real impact: logistics, planning, design. Mathematics drives decision-making.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.15' 
  AND lesson_code = 'AHL 3.15c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 142: AHL 3.16 - AHL 3.16a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Abstraction of Vector Concept',
    'Vector space abstracts ''vector-like'' behavior. Not just arrows! Polynomials, functions, matrices can be ''vectors''. Any collection satisfying axioms. This abstraction powerful: same theorems apply to different objects. Basis provides coordinate system. Dimension counts degrees of freedom. Abstract but unifying—reveals deep mathematical structure.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.16' 
  AND lesson_code = 'AHL 3.16a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 143: AHL 3.16 - AHL 3.16b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Linear Transformations Explained',
    'Linear transformation preserves vector operations: transforms sums to sums, scales to scales. Every linear transformation on $\mathbb{R}^n$ is matrix multiplication! Kernel: what maps to zero. Image: all possible outputs. Understanding these concepts: rotations, projections, reflections are linear. Non-linear: exponential, trigonometric. Foundation for functional analysis, quantum mechanics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.16' 
  AND lesson_code = 'AHL 3.16b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 144: AHL 3.16 - AHL 3.16c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Linear Algebra Applications',
    'Vector spaces and transformations everywhere: computer graphics (transformations), data science (principal component analysis), quantum mechanics (state spaces), control theory (system dynamics). Abstract theory enables concrete applications. Eigenvalues crucial for: stability analysis, Google PageRank, vibration modes. Understanding linear algebra unlocks modern STEM.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.16' 
  AND lesson_code = 'AHL 3.16c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 145: SL 4.1 - SL 4.1a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Data Types',
    'Data type determines analysis method. Categorical: count frequencies, mode. Quantitative: calculate mean, median. Discrete: bar charts. Continuous: histograms. Collection method affects validity: census (complete), sample (subset). Understanding data types foundation for statistics. Proper classification crucial for appropriate analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.1' 
  AND lesson_code = 'SL 4.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 146: SL 4.1 - SL 4.1b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Effective Data Visualization',
    'Good graph communicates clearly: labeled axes, title, appropriate scale, clear legend. Different displays emphasize different features. Histogram shows distribution shape. Box plot shows spread and outliers. Scatter plot shows correlation. Misleading graphs: truncated axes, wrong chart type. Critical skill: create honest, informative displays. Statistics is communication.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.1' 
  AND lesson_code = 'SL 4.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 147: SL 4.1 - SL 4.1c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'From Data to Insight',
    'Analysis transforms raw numbers to understanding. Look for patterns, not just calculate. Context crucial: what do numbers mean? Outliers: errors or important information? Trends suggest relationships but don''t prove causation. Critical thinking: question data quality, sampling method, conclusions. Statistical literacy essential in data-driven world.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.1' 
  AND lesson_code = 'SL 4.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 148: SL 4.2 - SL 4.2a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Choosing Sampling Methods',
    'Different methods for different purposes. Random: unbiased, representative. Stratified: ensures subgroup representation (age groups, regions). Systematic: easier than random. Cluster: cost-effective for dispersed populations. Trade-offs: cost, bias, practicality. Understanding methods crucial for survey design and evaluating studies. Sampling method affects validity.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.2' 
  AND lesson_code = 'SL 4.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 149: SL 4.2 - SL 4.2b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Avoiding Bias in Research',
    'Bias undermines validity. Recognize sources: who''s excluded? How questions phrased? Who responded? Minimize: random sampling, neutral wording, high response rate, careful measurement. All studies have some bias—question is how much. Critical evaluation: assess bias before accepting conclusions. Essential for research literacy and conducting good studies.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.2' 
  AND lesson_code = 'SL 4.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 150: SL 4.2 - SL 4.2c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Sample Size Trade-offs',
    'Larger sample → more reliable estimate but costs more (time, money). Diminishing returns: doubling reliability requires quadrupling sample. Choose based on: required precision, budget, population variability. Very large samples can detect trivial differences. Understanding $n$ effects crucial for study design. Balance precision needs with practical constraints.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.2' 
  AND lesson_code = 'SL 4.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 151: SL 4.3 - SL 4.3a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Summarizing Data',
    'Descriptive statistics condense data into key numbers. Central tendency: ''typical'' value. Spread: variability, consistency. Together they describe distribution. Mean + SD describes normal distributions well. Median + IQR better for skewed data. Understanding these measures essential for data communication and comparison.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.3' 
  AND lesson_code = 'SL 4.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 152: SL 4.3 - SL 4.3b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Choosing the Right Average',
    'Mean: uses all data, affected by outliers. Median: resistant to outliers, better for skewed distributions. Mode: categorical data, multimodal possible. Context determines choice: income (median—skewed), test scores (mean—symmetric). Understanding strengths/weaknesses essential. Don''t just calculate—interpret! Each tells different story about ''center''.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.3' 
  AND lesson_code = 'SL 4.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 153: SL 4.3 - SL 4.3c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Variability',
    'Spread measures data consistency. Low spread: values clustered, predictable. High spread: values scattered, variable. Range: simple but affected by outliers. IQR: middle 50%, resistant to outliers. SD: average deviation from mean, most common. Understanding spread essential: manufacturing (consistency), medicine (treatment reliability). Spread + center fully describe simple distributions.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.3' 
  AND lesson_code = 'SL 4.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 154: SL 4.4 - SL 4.4a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Correlation vs Causation',
    'Correlation: variables change together. Causation: one causes the other. Correlation ≠ causation! Third variable might cause both. Spurious correlations exist (ice cream sales and drownings—both caused by summer). Scatter plot reveals relationship visually. Understanding this distinction critical for scientific thinking. Don''t assume cause from correlation alone!',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.4' 
  AND lesson_code = 'SL 4.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 155: SL 4.4 - SL 4.4b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Least Squares Method',
    'Regression line minimizes sum of squared vertical distances from points. ''Best fit'' in least squares sense. Slope $b$: change in $y$ per unit change in $x$. Intercept $a$: predicted $y$ when $x = 0$ (if meaningful). Use for prediction within data range. Extrapolation risky! Understanding regression fundamental for data modeling.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.4' 
  AND lesson_code = 'SL 4.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 156: SL 4.4 - SL 4.4c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Interpreting Correlation Strength',
    '$r$ quantifies linear relationship strength. $|r| > 0.8$: strong, $|r| < 0.3$: weak (rough guidelines). $r^2$ = proportion of variance explained by relationship. Important: $r$ measures LINEAR correlation only! Can be zero with strong nonlinear relationship. Use with scatter plot. Understanding $r$ essential for assessing relationships scientifically.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.4' 
  AND lesson_code = 'SL 4.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 157: SL 4.5 - SL 4.5a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Probability',
    'Probability quantifies uncertainty. $P(A) = 0$: impossible. $P(A) = 1$: certain. Between: degrees of likelihood. Classical: count outcomes (equally likely). Empirical: from data/experiments. Subjective: expert judgment. Understanding probability foundation for risk assessment, decision-making. Essential for navigating uncertain world.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.5' 
  AND lesson_code = 'SL 4.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 158: SL 4.5 - SL 4.5b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Applying Probability Rules',
    'Rules combine simple probabilities into complex ones. ''Or'' → add (careful: subtract overlap). ''And'' → multiply (if independent). Complement useful: sometimes easier to find probability of ''not''. Venn diagrams visualize. Understanding when events independent crucial. These rules foundation for all probability calculations.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.5' 
  AND lesson_code = 'SL 4.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 159: SL 4.5 - SL 4.5c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Probability in Decision-Making',
    'Probability guides decisions under uncertainty. Expected value: long-run average. Risk assessment: low probability but high impact events. Insurance: probability × cost. Quality control: acceptable defect probability. Understanding probability essential for: finance, medicine, engineering, policy. Quantifying uncertainty enables rational decisions.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.5' 
  AND lesson_code = 'SL 4.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 160: SL 4.6 - SL 4.6a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Conditional Probability',
    'Conditional probability: probability in restricted sample space. ''Given B occurred'' means consider only B outcomes. Changes the sample space! Example: probability of ace given card is red (26 outcomes, not 52). Independence: knowing B doesn''t change probability of A. Essential for sequential events. Applications: medical testing, fault diagnosis, Bayesian reasoning.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.6' 
  AND lesson_code = 'SL 4.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 161: SL 4.6 - SL 4.6b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Recognizing Independence',
    'Independent: one outcome doesn''t affect other. Coin flips, dice rolls (separate), replaced draws. Dependent: outcome affects next. Cards without replacement, conditional on previous result. Test: does $P(A|B) = P(A)$? Real importance: correct probability calculation. Assuming independence when dependent is common error. Context determines independence.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.6' 
  AND lesson_code = 'SL 4.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 162: SL 4.6 - SL 4.6c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Systematic Probability Problem-Solving',
    'Tree diagrams organize complex problems. Each branch = outcome, probability on branch. Multiply for AND, add for OR. Works for dependent (update probabilities) and independent (same probabilities). Alternative: tables, counting. Systematic approach prevents errors. Practice: many paths to solution, choose clearest method. Organization key to solving complex probability.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.6' 
  AND lesson_code = 'SL 4.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 163: SL 4.7 - SL 4.7a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Random Variables Quantify Outcomes',
    'Random variable assigns number to each outcome. Allows numerical analysis of random events. Discrete: countable values (dice roll, number of defects). Probability distribution lists all values and their probabilities. Different from deterministic variable—value unknown until experiment. Foundation for probability models. Essential for statistical inference.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.7' 
  AND lesson_code = 'SL 4.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 164: SL 4.7 - SL 4.7b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Continuous vs Discrete',
    'Continuous: uncountable values (height, time, temperature). Probability density function (PDF), not individual probabilities. Probability = area under curve. Exact value has P = 0 (infinitely many values). CDF gives cumulative probability. Integration replaces summation. Different conceptually from discrete but similar calculations. Model measurements and continuous processes.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.7' 
  AND lesson_code = 'SL 4.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 165: SL 4.7 - SL 4.7c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Interpreting E(X) and Var(X)',
    'Expected value: long-run average, center of distribution. NOT necessarily a possible value! Variance: average squared deviation, measures spread. Large variance: high uncertainty. These summarize entire distribution. Applications: expected profit, average waiting time. Understanding these transforms random variables to understandable quantities. Foundation for decision theory.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.7' 
  AND lesson_code = 'SL 4.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 166: SL 4.8 - SL 4.8a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'When to Use Binomial',
    'Binomial models: fixed number of independent yes/no trials with constant probability. Examples: coin flips, defective items, multiple-choice guessing, medical tests. NOT binomial if: trials not independent, probability changes, more than two outcomes. Recognizing binomial situations key skill. Most important discrete distribution.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.8' 
  AND lesson_code = 'SL 4.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 167: SL 4.8 - SL 4.8b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Technology for Binomial',
    'Formula tedious for large $n$. Use GDC! Understand formula but calculate with technology. For ranges: use cumulative. $P(X \leq k)$ directly from binomcdf. $P(X \geq k) = 1 - P(X \leq k-1)$. Understanding formula + using technology = powerful combination. Check: probabilities sum to 1.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.8' 
  AND lesson_code = 'SL 4.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 168: SL 4.8 - SL 4.8c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Real Binomial Applications',
    'Binomial widespread: quality control (defects), medicine (treatment success), genetics (traits), testing (guessing). Key: identify $n$ and $p$ from context. Interpret results meaningfully. Expected successes: $np$. Variability: $\sqrt{np(1-p)}$. Understanding binomial essential for analyzing repeated trials. Links combinatorics to probability.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.8' 
  AND lesson_code = 'SL 4.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 169: SL 4.9 - SL 4.9a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'The Normal Distribution',
    'Most important continuous distribution. Bell curve appears everywhere: heights, test scores, measurement errors (Central Limit Theorem). Symmetric, unimodal. Mean = median = mode. Fully determined by $\mu$ and $\sigma$. Many natural phenomena approximately normal. Foundation for statistical inference. Understanding normal distribution essential for statistics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.9' 
  AND lesson_code = 'SL 4.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 170: SL 4.9 - SL 4.9b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Z-Scores Standardize',
    'Z-score: how many standard deviations from mean. $z = 2$: two SD above mean. Positive: above mean; negative: below. Standardization allows: comparing different distributions, using standard tables. All normals equivalent after standardization. Understanding z-scores essential for hypothesis testing, comparing scores across different tests. Fundamental statistical tool.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.9' 
  AND lesson_code = 'SL 4.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 171: SL 4.9 - SL 4.9c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Normal Distribution in Practice',
    'Normal models continuous measurements: heights, weights, test scores, errors. 68-95-99.7 rule for quick estimates. Inverse problems: find value given probability (use invNorm on GDC). Applications: quality control (within specifications?), grading (percentile ranks). Central Limit Theorem: averages tend to normal. Most powerful distribution in statistics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.9' 
  AND lesson_code = 'SL 4.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 172: SL 4.10 - SL 4.10a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Advanced Correlation Concepts',
    'Strong correlation doesn''t mean causation. Could be: A causes B, B causes A, C causes both, or coincidence. Examine: mechanism, time order, confounding variables. Correlation strength depends on variability. Outliers influence correlation. Understanding context crucial. Critical thinking: question whether correlation meaningful. Essential for research evaluation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.10' 
  AND lesson_code = 'SL 4.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 173: SL 4.10 - SL 4.10b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Regression Assumptions and Limitations',
    'Linear regression assumes: linear relationship, independent observations, constant variance, normal residuals. Check with residual plot. Outliers influence regression. Interpolation safer than extrapolation. $r^2$ doesn''t prove causation. Understanding limitations prevents misuse. Regression powerful but not magic—requires careful application and interpretation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.10' 
  AND lesson_code = 'SL 4.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 174: SL 4.10 - SL 4.10c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Using Regression Wisely',
    'Regression for prediction and understanding relationships. But: doesn''t prove causation, limited to linear, sensitive to outliers. Always check residuals. Interpret slope in context. Prediction intervals acknowledge uncertainty. Real applications: forecasting, trend analysis, relationship quantification. Understanding when/how to use regression essential for data science.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.10' 
  AND lesson_code = 'SL 4.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 175: SL 4.11 - SL 4.11a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Bayes'' Theorem Applications',
    'Bayes updates probabilities with new information. Prior → Evidence → Posterior. Classic: medical testing (false positives!), spam filtering, machine learning. Counterintuitive results common: rare disease, accurate test, but P(disease|positive) still low! Understanding Bayes essential for: diagnosis, AI, decision-making under uncertainty. Foundation of Bayesian statistics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.11' 
  AND lesson_code = 'SL 4.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 176: SL 4.11 - SL 4.11b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Organizing Complex Probability',
    'Visual aids manage complexity. Trees: sequential events, conditional probability. Venn: set relationships, overlaps. Tables: two categorical variables. Choose tool based on problem structure. Drawing diagram often reveals solution path. Systematic organization prevents errors. These tools essential for complex probability—worth mastering.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.11' 
  AND lesson_code = 'SL 4.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 177: SL 4.11 - SL 4.11c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Real-World Complex Probability',
    'Advanced problems combine multiple concepts. Medical testing: sensitivity, specificity, prevalence, Bayes. Reliability: series/parallel systems, multiple failures. Game theory: optimal strategies. Insurance: compound risks. Understanding how concepts interact crucial. Real applications never isolated—synthesis required. This is probability in practice.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.11' 
  AND lesson_code = 'SL 4.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 178: SL 4.12 - SL 4.12a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Z-Score Applications',
    'Standardization enables: comparing across different distributions, using standard normal table, finding percentiles. Z-score answers ''how unusual is this value?'' Used in: grading (curve), quality control (control charts), research (outlier detection). Understanding z-scores bridges descriptive and inferential statistics. Essential tool for normal distribution work.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.12' 
  AND lesson_code = 'SL 4.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 179: SL 4.12 - SL 4.12b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Technology for Normal Calculations',
    'GDC essential for normal calculations. normalcdf: area under curve. invNorm: reverse (find value from probability). Master these functions! Understand process: standardize mentally, let calculator do arithmetic. Check: probabilities reasonable? Common errors: wrong interval bounds, forgetting to standardize. Practice with technology for efficiency.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.12' 
  AND lesson_code = 'SL 4.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 180: SL 4.12 - SL 4.12c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Normal Models Everywhere',
    'Normal distribution appears everywhere measurement varies randomly: biological (heights, blood pressure), manufacturing (dimensions), educational (test scores), financial (returns). Central Limit Theorem explains ubiquity. Use to: set specifications, identify outliers, make predictions. Understanding when normal appropriate crucial. Not everything normal—check data!',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.12' 
  AND lesson_code = 'SL 4.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 181: AHL 4.13 - AHL 4.13a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Bayesian Thinking',
    'Bayesian approach: start with prior belief, update with evidence. Different from frequentist (long-run frequency). Powerful for: incorporating expert knowledge, sequential updating, decision analysis. Modern AI heavily Bayesian. Understanding both approaches important. Bayes theorem mathematically simple but conceptually deep. Foundation of modern statistical inference.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.13' 
  AND lesson_code = 'AHL 4.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 182: AHL 4.13 - AHL 4.13b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Choosing Right Distribution',
    'Each distribution models specific random process. Binomial: fixed trials. Poisson: rare events over interval. Normal: continuous measurements. Exponential: waiting times. Uniform: equal probability. Understanding which fits context crucial for correct modeling. Wrong distribution → wrong conclusions. Distribution theory unifies random phenomena under mathematical framework.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.13' 
  AND lesson_code = 'AHL 4.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 183: AHL 4.13 - AHL 4.13c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Sophisticated Probability Models',
    'Advanced applications combine distributions, conditioning, transformations. Reliability: exponential lifetimes, series/parallel systems. Queuing: Poisson arrivals, exponential service. Finance: normal returns, portfolio theory. Epidemiology: disease spread models. Understanding advanced probability enables modeling complex real systems. Mathematics meets reality.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.13' 
  AND lesson_code = 'AHL 4.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 184: AHL 4.14 - AHL 4.14a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Advanced RV Theory',
    'Transformations change distributions. Understanding these is powerful: derive new distributions, simplify calculations. Linear transformations preserve normality. Sums of independent RVs: distributions combine. MGF uniquely determines distribution. Abstract but essential for: portfolio theory, signal processing, statistical theory. Foundation of advanced probability.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.14' 
  AND lesson_code = 'AHL 4.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 185: AHL 4.14 - AHL 4.14b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Continuous Distribution Applications',
    'Uniform: random number generation, lack of information. Exponential: time between events, radioactive decay, service times. Normal: measurements, errors, averages (CLT). Chi-square, t, F: statistical inference. Understanding which distribution fits context crucial. Each has unique properties suited for specific phenomena. Rich mathematical structure.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.14' 
  AND lesson_code = 'AHL 4.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 186: AHL 4.14 - AHL 4.14c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Computational Probability',
    'When analytical solutions difficult, simulate! Modern probability computational. Generate random samples, observe outcomes, estimate probabilities. Applications: finance (option pricing), physics (particle systems), operations (complex queues). Understanding probability theory + computational methods = powerful combination. Essential for modern applied mathematics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.14' 
  AND lesson_code = 'AHL 4.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 187: SL 5.1 - SL 5.1a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Limits',
    'Limit describes behavior near point, not necessarily at point. $f(a)$ might not equal $\lim_{x \to a} f(x)$. Limit captures ''approach'' idea. Foundation of calculus: derivative and integral defined as limits. Intuitive: what value does function tend toward? Formal definition subtle but intuitive idea straightforward. Essential for understanding continuity, derivatives, integrals.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.1' 
  AND lesson_code = 'SL 5.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 188: SL 5.1 - SL 5.1b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Using Limit Laws',
    'Limit laws let you break complex limits into simpler pieces. Evaluate simple limits, combine using laws. Like algebra but for limits. Powerful: reduces difficult limit to easier ones. Indeterminate forms ($\frac{0}{0}$, $\frac{\infty}{\infty}$) need different techniques (factoring, L''Hôpital). Understanding laws essential for systematic limit evaluation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.1' 
  AND lesson_code = 'SL 5.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 189: SL 5.1 - SL 5.1c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'The Derivative Concept',
    'Derivative = instantaneous rate of change. From average rate over interval to instantaneous at point (limit as interval → 0). Geometrically: tangent slope. Physically: velocity, acceleration, growth rate. Central concept in calculus. Transforms static functions to dynamic rates. Understanding derivative opens: optimization, motion analysis, change modeling. Revolution in mathematics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.1' 
  AND lesson_code = 'SL 5.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 190: SL 5.2 - SL 5.2a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Differentiation Shortcuts',
    'Rules make differentiation mechanical—no limits needed! Power rule most important: bring power down, reduce power by 1. Linearity: derivative of sum = sum of derivatives. Combine rules for polynomials. These shortcuts derived from limit definition but memorize for speed. Foundation: all differentiation builds on these basic rules.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.2' 
  AND lesson_code = 'SL 5.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 191: SL 5.2 - SL 5.2b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Polynomial Derivative Patterns',
    'Differentiating polynomial: term-by-term using power rule. Each derivative reduces degree by 1. Eventually reach constant, then zero. Nth derivative of degree-n polynomial is constant. Understanding this pattern useful for higher derivatives. Polynomials easiest to differentiate—entirely mechanical process.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.2' 
  AND lesson_code = 'SL 5.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 192: SL 5.2 - SL 5.2c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Derivatives Measure Change',
    'Derivative quantifies rate of change in any context. Economics: marginal analysis (cost, revenue, profit). Physics: velocity, acceleration, power. Biology: population growth rate. Engineering: rates of heat transfer, reaction rates. Understanding derivative as rate of change connects abstract calculus to concrete applications. Essential problem-solving tool.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.2' 
  AND lesson_code = 'SL 5.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 193: SL 5.3 - SL 5.3a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'When Products and Quotients',
    'Product rule: when multiplying two functions. Quotient rule: when dividing. DON''T distribute derivative: $(fg)'' \neq f''g''$! Common error. Quotient can use product rule with negative power (sometimes easier). Practice recognizing form. These rules extend differentiation beyond simple polynomials. Essential for rational and mixed functions.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.3' 
  AND lesson_code = 'SL 5.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 194: SL 5.3 - SL 5.3b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Chain Rule for Composition',
    'Chain rule differentiates composite functions. ''Outside derivative times inside derivative''. Leibniz notation reveals structure: $\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$ (symbols ''cancel''). Essential for nested functions. Most functions in practice are composites! Master chain rule to differentiate complex functions. Most powerful differentiation rule.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.3' 
  AND lesson_code = 'SL 5.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 195: SL 5.3 - SL 5.3c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Real Derivative Applications',
    'Differentiation solves real problems: optimize (max profit, min cost), analyze motion (physics), find rates (chemistry), predict (marginal analysis). Combining rules handles complexity. Understanding which rule when becomes automatic with practice. Calculus transforms real problems to mathematical ones with systematic solution methods. Power of mathematical modeling.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.3' 
  AND lesson_code = 'SL 5.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 196: SL 5.4 - SL 5.4a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Why Implicit Differentiation?',
    'Some relations can''t be solved for $y$ explicitly (circles, ellipses, complex curves). Implicit differentiation finds slope without solving for $y$! Treat $y$ as function of $x$, apply chain rule. Powerful technique: expands differentiation to implicit relations. Applications: related rates, curves not functions. Essential tool when explicit form unavailable.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.4' 
  AND lesson_code = 'SL 5.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 197: SL 5.4 - SL 5.4b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Understanding Related Rates',
    'Variables change together—their rates related. Chain rule connects rates. Key: differentiate with respect to TIME (or other independent variable), even if not explicit in equation. Drawing diagram helps visualize. Applications: expanding circles, falling ladders, filling tanks. Understanding how rates connect is practical calculus skill.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.4' 
  AND lesson_code = 'SL 5.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 198: SL 5.4 - SL 5.4c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Implicit Techniques in Practice',
    'Implicit differentiation solves problems impossible with explicit methods. Circles, ellipses, complex curves: find tangents, normals, critical points. Combined with related rates: powerful problem-solving. Understanding when implicit needed (can''t solve for $y$) important. These techniques expand calculus applicability greatly.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.4' 
  AND lesson_code = 'SL 5.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 199: SL 5.5 - SL 5.5a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration as Reverse Differentiation',
    'Integration ''undoes'' differentiation. Given rate of change, find original function. Antiderivative not unique (+C accounts for vertical shifts). Geometric: area under curve (definite integral). Physical: velocity → position, acceleration → velocity. Understanding integration as anti-differentiation fundamental. Essential for: area, accumulation, solving differential equations.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.5' 
  AND lesson_code = 'SL 5.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 200: SL 5.5 - SL 5.5b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration Rules Pattern',
    'Power rule for integration: opposite of differentiation (add 1 to power, divide). Always add $+C$—infinitely many antiderivatives! Linearity: integrate term-by-term. These rules mirror differentiation rules. Master these for polynomial integration. Foundation: more complex integration builds on these basic rules.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.5' 
  AND lesson_code = 'SL 5.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 201: SL 5.5 - SL 5.5c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration for Accumulation',
    'Integration accumulates: area, distance, total quantity. Rate function → total via integration. Reverse of differentiation: from rate to total. Applications: distance from velocity, total revenue from marginal revenue, work from force. Understanding integration as accumulation connects calculus to real quantities. Second pillar of calculus.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.5' 
  AND lesson_code = 'SL 5.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 202: SL 5.6 - SL 5.6a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'U-Substitution Technique',
    'Substitution simplifies integrals. Recognize pattern: function and its derivative. Choose $u$ to make integral simpler. Don''t forget $du$! Definite integrals: change bounds OR substitute back. Most important integration technique. Practice recognizing when to substitute. Essential for integrating composite functions.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.6' 
  AND lesson_code = 'SL 5.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 203: SL 5.6 - SL 5.6b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration by Parts Strategy',
    'For products of different function types. Product rule reverse. LIATE helps choose $u$. Sometimes need repeated application or clever algebraic manipulation. Reduction formulas for systematic approach. Harder than substitution—requires experience to recognize. Essential for integrating $x\sin x$, $\ln x$, etc.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.6' 
  AND lesson_code = 'SL 5.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 204: SL 5.6 - SL 5.6c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Advanced Integration Problem-Solving',
    'Real problems need technique choice: recognize form, choose appropriate method. Combine techniques for complex integrals. Understanding geometry helps setup (area, volume). Applications throughout science: work, center of mass, fluid pressure. Integration techniques essential toolkit. Practice builds pattern recognition and fluency.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.6' 
  AND lesson_code = 'SL 5.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 205: SL 5.7 - SL 5.7a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Definite Integral Meaning',
    'Definite integral = exact area under curve from $a$ to $b$. Fundamental Theorem connects integration and differentiation! Find antiderivative, evaluate at bounds. Signed area: above axis positive, below negative. Applications: total distance, accumulated quantity, area between curves. Understanding FTC one of mathematics'' great insights—unifies calculus.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.7' 
  AND lesson_code = 'SL 5.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 206: SL 5.7 - SL 5.7b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Definite Integral Applications',
    'Integration computes: area (irregular shapes), volume (revolution), total change. Setup crucial: identify what''s accumulated, integration limits. Geometric applications: areas, volumes, arc lengths. Physical: work, charge, mass. Economic: consumer surplus, total revenue. Understanding setup connects problem to integral. Calculus makes complex calculations systematic.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.7' 
  AND lesson_code = 'SL 5.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 207: SL 5.7 - SL 5.7c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Sophisticated Integration Applications',
    'Advanced applications: volumes (multiple methods), work against variable force, center of mass, surface area. Each requires: setup (identify differential element), integrate, interpret. Understanding physical/geometric meaning crucial for correct setup. These applications demonstrate calculus power for real problems. Engineering and physics rely heavily on these techniques.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.7' 
  AND lesson_code = 'SL 5.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 208: SL 5.8 - SL 5.8a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Choosing Integration Methods',
    'Pattern recognition key: what form suggests which technique? Composite function → substitution. Product of different types → parts. Rational → partial fractions. Practice builds intuition. Sometimes multiple techniques work—choose simplest. Integration harder than differentiation (no universal algorithm). Understanding techniques expands solvable integral range.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.8' 
  AND lesson_code = 'SL 5.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 209: SL 5.8 - SL 5.8b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Partial Fractions for Integration',
    'Rational functions: decompose into simpler fractions, integrate each. Essential technique: makes impossible integrals possible. Setup: proper fraction (degree numerator < denominator), factor denominator completely. Solve for constants systematically. Advanced topic but powerful. Connects algebra (factoring) to calculus (integration).',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.8' 
  AND lesson_code = 'SL 5.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 210: SL 5.8 - SL 5.8c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration Technique Mastery',
    'Fluency requires: recognize form instantly, choose technique automatically. Build mental library of standard integrals and their methods. Practice diverse problems. Sometimes trial-and-error needed. Understanding when each technique applies crucial. Integration artform and science—experience essential.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.8' 
  AND lesson_code = 'SL 5.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 211: SL 5.9 - SL 5.9a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Area as Geometric Application',
    'Integration provides exact area for any curve. Approximation (rectangles) → exact (limit). Handle sign carefully: geometric area always positive. Sketch graph first—visualize region. Find intersection points algebraically. Understanding area calculation fundamental geometric application of integration.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.9' 
  AND lesson_code = 'SL 5.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 212: SL 5.9 - SL 5.9b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Revolution Creates Solids',
    'Rotate curve around axis → 3D solid. Integration sums infinite thin disks/shells. Disk: perpendicular to axis. Shell: parallel to axis. Choose method based on convenience. Sketch helps visualize. Applications: designing containers, structural elements. Understanding revolution geometry essential for setup.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.9' 
  AND lesson_code = 'SL 5.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 213: SL 5.9 - SL 5.9c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Practical Area/Volume Problems',
    'Integration calculates real quantities: water tank capacity, paint needed for irregular surface, land area from survey. Setup from physical description. Understanding geometry → mathematical model. These applications show calculus utility. Engineering design, architecture, manufacturing use these calculations. Mathematics models physical world.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.9' 
  AND lesson_code = 'SL 5.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 214: SL 5.10 - SL 5.10a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Parts for Products',
    'Parts integrates products where substitution doesn''t work. LIATE guides choice to make $\int v du$ simpler than original. Sometimes need multiple applications. Tabular method speeds up repeated parts. Understanding when/how to use parts expands integration capability. Essential for logarithmic and inverse trig integrals.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.10' 
  AND lesson_code = 'SL 5.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 215: SL 5.10 - SL 5.10b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration Technique Synthesis',
    'Mastery requires knowing all techniques and when to apply each. Build integration toolkit through practice. Sometimes need creative manipulation before integrating. Understanding multiple approaches provides flexibility. Integration challenging but rewarding—solving difficult integral satisfying. These skills essential for advanced mathematics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.10' 
  AND lesson_code = 'SL 5.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 216: SL 5.10 - SL 5.10c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Calculus as Unified Tool',
    'Real problems rarely need single technique—synthesis required. Differentiate to find rates/extrema. Integrate for totals/areas. Combine for complex applications. Calculus provides systematic framework for continuous change. Understanding when/how to apply each concept essential. This integration of techniques is true mathematical modeling. Calculus transforms problems into solvable mathematics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.10' 
  AND lesson_code = 'SL 5.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 217: AHL 3.17 - AHL 3.17a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Complex 3D Spatial Relationships',
    'Advanced 3D: skew lines (not parallel, don''t intersect), dihedral angles (between planes), distance formulas. Vector methods powerful for 3D problems. Understanding spatial relationships in 3D more abstract than 2D. Applications: crystallography, computer graphics, structural engineering. Rich geometric structure in three dimensions.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.17' 
  AND lesson_code = 'AHL 3.17a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 218: AHL 3.17 - AHL 3.17b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    '3D Configuration Analysis',
    'Understanding all possible configurations: intersecting, parallel, skew (lines only), perpendicular. Each has geometric and algebraic characterization. Vector methods unified approach. Applications: line-of-sight problems, structural analysis, robotics. Spatial reasoning in 3D essential skill for advanced geometry.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.17' 
  AND lesson_code = 'AHL 3.17b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 219: AHL 3.17 - AHL 3.17c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    '3D Geometry in Real Applications',
    'Advanced 3D geometry models: flight paths (air traffic control), molecular structures (chemistry), mechanical linkages (engineering), computer graphics (3D rendering). Vector approach provides elegant solutions. Understanding 3D relationships essential for: architecture, robotics, physics simulations. Mathematics describes spatial reality precisely.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.17' 
  AND lesson_code = 'AHL 3.17c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 220: AHL 3.18 - AHL 3.18a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Solving Complex 3D Problems',
    'Multiple objects interact: planes intersect in lines, lines intersect planes. Systematic approach: equations for each object, solve system. Vector methods handle complexity. Visualization challenging—rely on algebraic methods. Understanding configuration possibilities (parallel, intersecting, skew) guides solution. Advanced spatial problem-solving.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.18' 
  AND lesson_code = 'AHL 3.18a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 221: AHL 3.18 - AHL 3.18b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Quantifying 3D Space',
    'Spatial analysis: measure distances, angles, volumes in 3D. Vector algebra provides tools. Cross product for areas/perpendicularity. Dot product for angles/projections. Triple scalar product for volumes. These calculations essential for: surveying, navigation, engineering design. Mathematics quantifies space precisely.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.18' 
  AND lesson_code = 'AHL 3.18b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 222: AHL 3.18 - AHL 3.18c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    '3D Geometry Powers Technology',
    'Modern technology built on 3D geometry: GPS triangulation, computer graphics rendering, robotic motion planning, structural engineering. Vector/matrix methods computationally efficient. Understanding 3D mathematics enables: design software, simulations, animations. Abstract geometry has concrete technological applications. Mathematics foundation of spatial technology.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.18' 
  AND lesson_code = 'AHL 3.18c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 223: SL 5.11 - SL 5.11a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Advanced Integration Arsenal',
    'Trig substitution handles radicals. Partial fractions decomposes rationals. Combine with substitution/parts for complex integrals. Integration tables help but understanding derivation better. Practice recognizing patterns. These advanced techniques complete integration toolkit. Essential for physics, engineering integrals.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.11' 
  AND lesson_code = 'SL 5.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 224: SL 5.11 - SL 5.11b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Definite Integrals in Practice',
    'FTC makes evaluation mechanical: find antiderivative, plug in bounds. Properties simplify: split integrals, factor constants. Applications: any accumulated quantity from rate. Numerical methods when antiderivative unknown (Simpson''s, trapezoidal). Understanding definite integrals essential for applied calculus. Bridge from theory to computation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.11' 
  AND lesson_code = 'SL 5.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 225: SL 5.11 - SL 5.11c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Developing Integration Fluency',
    'Integration mastery through extensive practice. Recognize patterns instantly. Try technique, if stuck, try another. Build mental catalog of standard integrals. Understanding when to give up and use numerical methods. Integration hardest part of calculus—requires persistence. Reward: solve problems unsolvable by algebra alone.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.11' 
  AND lesson_code = 'SL 5.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 226: AHL 5.12 - AHL 5.12a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'L''Hôpital for Indeterminate Forms',
    'L''Hôpital''s rule powerful for indeterminate forms. Differentiate numerator and denominator separately (not quotient rule!). Check form qualifies. May need multiple applications. Alternative: series expansion (Taylor). Understanding when applicable crucial—not for determinate forms! Essential tool for limit evaluation.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.12' 
  AND lesson_code = 'AHL 5.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 227: AHL 5.12 - AHL 5.12b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Function Regularity Hierarchy',
    'Differentiable implies continuous, but not vice versa. Continuity: no breaks. Differentiability: smooth (no corners). Understanding this relationship essential for analysis. Piecewise functions often continuous but not differentiable at transitions. Applications: optimization requires differentiability. Theoretical foundation of calculus.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.12' 
  AND lesson_code = 'AHL 5.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 228: AHL 5.12 - AHL 5.12c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Beyond First Derivatives',
    'Second derivative: rate of change of rate (acceleration from velocity). Concavity describes bending. Inflection points: concavity changes. Higher derivatives: patterns in Taylor series. Parametric differentiation: curves not functions. Understanding higher derivatives enriches function analysis. Essential for curve sketching, optimization verification.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.12' 
  AND lesson_code = 'AHL 5.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 229: AHL 5.13 - AHL 5.13a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Limits Analyze Behavior',
    'Limits describe asymptotic behavior: what happens at extremes? Compare growth rates: polynomial vs exponential vs logarithmic. Understanding limits essential for: algorithm analysis (computer science), asymptotic approximations (physics), series convergence. Limits foundational for rigorous analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.13' 
  AND lesson_code = 'AHL 5.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 230: AHL 5.13 - AHL 5.13b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Series as Infinite Sums',
    'Series extends finite sums to infinity. Converges if partial sums approach limit. Powerful: represent functions as infinite sums (Taylor/Maclaurin). Applications: approximations, solving differential equations, signal processing. Convergence crucial—divergent series meaningless. Understanding series fundamental for advanced calculus and analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.13' 
  AND lesson_code = 'AHL 5.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 231: AHL 5.13 - AHL 5.13c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Series Representations',
    'Taylor series represents functions as infinite polynomials. Approximation: truncate for polynomial approximation. Convergence: within radius. Applications: numerical computation, solving equations, approximations. Understanding series opens: numerical analysis, special functions. Profound connection between algebra and analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.13' 
  AND lesson_code = 'AHL 5.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 232: AHL 5.14 - AHL 5.14a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Specialized Differentiation Methods',
    'Parametric, logarithmic, inverse: each handles specific function types. Parametric: separates x and y dependencies. Logarithmic: simplifies products/quotients/powers. Inverse: relates function and inverse derivatives. Understanding these expands differentiable function range. Essential for advanced applications.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.14' 
  AND lesson_code = 'AHL 5.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 233: AHL 5.14 - AHL 5.14b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Multi-Variable Optimization',
    'Real optimization often multi-variable. Partial derivatives: rate in each direction. Critical points: all partials = 0. Second derivative test more complex (Hessian matrix). Lagrange multipliers elegant for constraints. Applications: economics (utility maximization), engineering (design optimization). Advanced but powerful.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.14' 
  AND lesson_code = 'AHL 5.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 234: AHL 5.14 - AHL 5.14c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Differentiation in Advanced Contexts',
    'Advanced applications: Newton''s method finds roots iteratively, Taylor series approximates functions locally, curvature measures bending. Physics: differential equations model motion, heat, waves. Engineering: optimization, control systems. Understanding advanced differentiation opens higher mathematics and applications. Foundation for differential geometry, physics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.14' 
  AND lesson_code = 'AHL 5.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 235: AHL 5.15 - AHL 5.15a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Master Level Integration',
    'Most sophisticated techniques: Weierstrass substitution, complex partial fractions, reduction formulas. Combine multiple techniques. Sometimes algebraic manipulation key. Understanding full toolkit makes most integrals tractable. Advanced but completes integration education. Essential for theoretical physics, advanced engineering.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.15' 
  AND lesson_code = 'AHL 5.15a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 236: AHL 5.15 - AHL 5.15b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Beyond Finite Integration',
    'Improper integrals extend to infinite intervals or unbounded functions. Convergence as limit. Not all converge! $\int_1^\infty \frac{1}{x}dx$ diverges, $\int_1^\infty \frac{1}{x^2}dx$ converges. Comparison test helps determine convergence. Applications: probability (continuous distributions), physics (potentials). Understanding convergence essential—infinite doesn''t mean undefined!',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.15' 
  AND lesson_code = 'AHL 5.15b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 237: AHL 5.15 - AHL 5.15c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration at Highest Level',
    'Advanced applications: arc length, surface area, moments, Fourier coefficients. Each requires: sophisticated setup, advanced integration techniques, careful evaluation. Real engineering calculations. Understanding these demonstrates integration power for complex geometric/physical quantities. Culmination of integration study.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.15' 
  AND lesson_code = 'AHL 5.15c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 238: AHL 5.16 - AHL 5.16a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Deep FTC Understanding',
    'FTC profound: integration and differentiation are inverses! Part 1: integral as function, derivative recovers integrand. Part 2: evaluation formula. These unite calculus. Understanding FTC deeply: accumulation function, variable limits. Extensions: Leibniz rule (differentiation under integral). Theoretical heart of calculus.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.16' 
  AND lesson_code = 'AHL 5.16a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 239: AHL 5.16 - AHL 5.16b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration Application Mastery',
    'Comprehensive applications demonstrate integration versatility. Each application type has: standard setup, integration technique, interpretation. From simple areas to complex surface areas. Understanding all applications shows calculus breadth. These calculations power: engineering design, physics computations, economic analysis. Integration indispensable tool.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.16' 
  AND lesson_code = 'AHL 5.16b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 240: AHL 5.16 - AHL 5.16c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration Problem-Solving Mastery',
    'Expert integration: instant pattern recognition, technique selection, execution. Build experience through varied practice. Understand why each technique works. Sometimes multiple paths—choose simplest. Persistence crucial—some integrals require creativity. Mastery enables tackling any integral. Crown jewel of calculus skill.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.16' 
  AND lesson_code = 'AHL 5.16c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 241: AHL 5.17 - AHL 5.17a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Beyond Elementary Integration',
    'Not all integrals have elementary antiderivatives! Special functions defined by integrals. Numerical methods when analytical fails. Integral transforms powerful for differential equations. Understanding limitations: when to use numerical/special functions. Integration connects to higher mathematics: complex analysis, functional analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.17' 
  AND lesson_code = 'AHL 5.17a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 242: AHL 5.17 - AHL 5.17b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration as Problem-Solving',
    'Challenging integrals require: pattern recognition, strategic thinking, technique combination, persistence. No universal algorithm—artform! Understanding structure guides technique choice. Build problem-solving skills through challenging problems. Integration develops mathematical maturity. These skills transfer: general problem-solving, analytical thinking.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.17' 
  AND lesson_code = 'AHL 5.17b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 243: AHL 5.17 - AHL 5.17c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Integration in Advanced Mathematics',
    'Highest-level integration applications: Fourier/Laplace transforms (engineering), path integrals (quantum mechanics), Green''s functions (PDEs). Integration foundation for: signal processing, quantum physics, advanced probability. Understanding integration opens entire branches of mathematics and physics. Ultimate mathematical tool.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.17' 
  AND lesson_code = 'AHL 5.17c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 244: AHL 5.18 - AHL 5.18a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'What are Differential Equations?',
    'DE: equation with derivatives, not just variables. Models dynamic systems: rate of change depends on current state. Solution: function satisfying equation. Initial conditions determine specific solution. Applications everywhere: population growth, radioactive decay, circuits, springs. Understanding DEs essential for modeling change. Most important equations in applied math.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.18' 
  AND lesson_code = 'AHL 5.18a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 245: AHL 5.18 - AHL 5.18b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Solving Differential Equations',
    'Each DE type has specific solution method. Separable: easiest, separate variables and integrate. Linear: integrating factor technique. Recognize type, apply appropriate method. Unlike algebraic equations—solution is function! Verification: substitute back. Understanding methods essential for modeling. DEs bridge calculus and real applications.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.18' 
  AND lesson_code = 'AHL 5.18b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 246: AHL 5.18 - AHL 5.18c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'DEs Model Dynamic Systems',
    'Differential equations fundamental modeling tool. Physics: motion, circuits, waves, heat. Biology: population dynamics, epidemics. Economics: growth models, supply-demand. Set up DE from physical law, solve, interpret. Understanding DEs essential for science/engineering. Calculus becomes language of change and dynamics.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.18' 
  AND lesson_code = 'AHL 5.18c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 247: AHL 5.19 - AHL 5.19a - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Rigorous Limit Theory',
    'Epsilon-delta: rigorous limit definition. For every $\epsilon > 0$ exists $\delta > 0$ such that... Theoretical foundation of calculus. Squeeze theorem powerful for difficult limits. Series methods when L''Hôpital fails. Understanding rigorous theory separates intuitive from formal mathematics. Foundation for real analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.19' 
  AND lesson_code = 'AHL 5.19a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 248: AHL 5.19 - AHL 5.19b - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Theoretical Foundations',
    'Major theorems provide rigorous calculus foundation. MVT: connects derivative to average rate. EVT: guarantees optimization solutions. IVT: guarantees intermediate values. Understanding these theorems: when results guaranteed, why techniques work. Transitions from computational to theoretical mathematics. Foundation for advanced analysis.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.19' 
  AND lesson_code = 'AHL 5.19b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 249: AHL 5.19 - AHL 5.19c - concepts
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'concepts',
    'Calculus Culmination',
    'Advanced calculus opens: multivariable (real-world is 3D+), vector fields (fluid flow, electromagnetism), differential geometry (relativity), calculus of variations (optimization). Single-variable calculus foundation for all these. Understanding calculus deeply enables: theoretical physics, advanced engineering, mathematical modeling. Calculus as universal language of continuous change. Journey from limits to transforming our understanding of the universe.',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.19' 
  AND lesson_code = 'AHL 5.19c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'concepts'
  )
LIMIT 1;


-- Row 250: SL 1.1 - SL 1.1a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Powers of 10 Notation',
    '$$10^n = \underbrace{10 \times 10 \times \cdots \times 10}_{n \text{ times}}$$ $$10^{-n} = \frac{1}{10^n}$$ $$10^0 = 1$$ Examples: $$1000 = 10^3, \quad 0.01 = 10^{-2}, \quad 5000 = 5 \times 10^3$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.1' 
  AND lesson_code = 'SL 1.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 251: SL 1.1 - SL 1.1b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Scientific Notation Formula',
    '$$a \times 10^k \text{ where } 1 \leq |a| < 10, \, k \in \mathbb{Z}$$ Examples: $$6\,500\,000 = 6.5 \times 10^6$$ $$0.000042 = 4.2 \times 10^{-5}$$ $$-0.0078 = -7.8 \times 10^{-3}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.1' 
  AND lesson_code = 'SL 1.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 252: SL 1.1 - SL 1.1c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Order of Magnitude Comparison',
    '$$\text{Ratio} = \frac{a_1 \times 10^{k_1}}{a_2 \times 10^{k_2}} = \frac{a_1}{a_2} \times 10^{k_1 - k_2}$$ Example: $$\frac{9 \times 10^8}{3 \times 10^{-5}} = 3 \times 10^{13}$$ (13 orders of magnitude difference)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.1' 
  AND lesson_code = 'SL 1.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 253: SL 1.2 - SL 1.2a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Arithmetic Sequence Definition',
    '$$u_n = u_1 + (n-1)d$$ where: $u_n$ = nth term, $u_1$ = first term, $d$ = common difference, $n$ = term position. Pattern: $u_1, u_1+d, u_1+2d, u_1+3d, \ldots$ Example: $3, 7, 11, 15, \ldots$ has $u_1=3$, $d=4$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.2' 
  AND lesson_code = 'SL 1.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 254: SL 1.2 - SL 1.2b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Arithmetic Sum Formula',
    '$$S_n = \frac{n}{2}[2u_1 + (n-1)d]$$ or $$S_n = \frac{n}{2}(u_1 + u_n)$$ where $S_n$ = sum of first $n$ terms. Example: Sum of first 10 terms of $2, 5, 8, \ldots$: $$S_{10} = \frac{10}{2}[2(2) + 9(3)] = 155$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.2' 
  AND lesson_code = 'SL 1.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 255: SL 1.2 - SL 1.2c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Sigma Notation for Arithmetic Series',
    '$$\sum_{k=1}^{n} [u_1 + (k-1)d] = \sum_{k=1}^{n} u_k = S_n$$ Example: $$\sum_{k=1}^{5} (3 + 2k) = 5 + 7 + 9 + 11 + 13 = 45$$ General: $$\sum_{k=1}^{n} (a + bk) = na + b\frac{n(n+1)}{2}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.2' 
  AND lesson_code = 'SL 1.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 256: SL 1.3 - SL 1.3a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Geometric Sequence Definition',
    '$$u_n = u_1 \cdot r^{n-1}$$ where: $u_n$ = nth term, $u_1$ = first term, $r$ = common ratio, $n$ = term position. Pattern: $u_1, u_1r, u_1r^2, u_1r^3, \ldots$ Example: $2, 6, 18, 54, \ldots$ has $u_1=2$, $r=3$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.3' 
  AND lesson_code = 'SL 1.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 257: SL 1.3 - SL 1.3b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Geometric Sum Formula',
    '$$S_n = \frac{u_1(r^n - 1)}{r - 1} = \frac{u_1(1 - r^n)}{1 - r}, \quad r \neq 1$$ If $r=1$: $S_n = nu_1$ Example: Sum of $3, 6, 12, 24, 48$: $$S_5 = \frac{3(2^5 - 1)}{2-1} = 3(31) = 93$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.3' 
  AND lesson_code = 'SL 1.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 258: SL 1.3 - SL 1.3c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Sigma Notation for Geometric Series',
    '$$\sum_{k=0}^{n-1} u_1 r^k = u_1 + u_1r + u_1r^2 + \cdots + u_1r^{n-1} = \frac{u_1(r^n-1)}{r-1}$$ Example: $$\sum_{k=0}^{4} 5 \cdot 2^k = 5(1+2+4+8+16) = 155$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.3' 
  AND lesson_code = 'SL 1.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 259: SL 1.4 - SL 1.4a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Compound Interest Formula',
    '$$A = P(1 + r)^n$$ or $$A = P\left(1 + \frac{r}{k}\right)^{nk}$$ where: $A$ = final amount, $P$ = principal, $r$ = annual rate, $n$ = years, $k$ = compounds per year. Example: $$\$1000 \text{ at } 5\% \text{ for } 3 \text{ years: } A = 1000(1.05)^3 = \$1157.63$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.4' 
  AND lesson_code = 'SL 1.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 260: SL 1.4 - SL 1.4b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Depreciation Formula',
    '$$V_n = V_0(1 - r)^n$$ where: $V_n$ = value after $n$ years, $V_0$ = initial value, $r$ = depreciation rate. Real value with inflation: $$V_{real} = \frac{V_n}{(1+i)^n}$$ where $i$ = inflation rate. Example: Car worth $\$20{,}000$ depreciating 15%/year: $V_3 = 20000(0.85)^3 = \$12{,}282.50$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.4' 
  AND lesson_code = 'SL 1.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 261: SL 1.4 - SL 1.4c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'GDC Finance Functions',
    'Calculator sequence mode or finance solver: For compound interest: $\text{FV} = \text{PV}(1+i)^n$ Solve for any variable: PV (present value), FV (future value), $n$ (periods), $i$ (rate). Table feature shows period-by-period growth. Graph $y = P(1+r)^x$ to visualize exponential growth.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.4' 
  AND lesson_code = 'SL 1.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 262: SL 1.5 - SL 1.5a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Logarithm Definition',
    '$$\log_a(b) = x \iff a^x = b$$ Common bases: $$\log_{10}(x) = \log(x) \text{ (common log)}$$ $$\log_e(x) = \ln(x) \text{ (natural log)}$$ Examples: $$\log_2(8) = 3 \text{ because } 2^3 = 8$$ $$\log(1000) = 3 \text{ because } 10^3 = 1000$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.5' 
  AND lesson_code = 'SL 1.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 263: SL 1.5 - SL 1.5b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Calculator Logarithm Functions',
    '$$\text{LOG}: \log_{10}(x)$$ $$\text{LN}: \log_e(x) = \ln(x)$$ For other bases: $$\log_a(x) = \frac{\log(x)}{\log(a)} = \frac{\ln(x)}{\ln(a)}$$ Example: $$\log_2(50) = \frac{\log(50)}{\log(2)} \approx 5.644$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.5' 
  AND lesson_code = 'SL 1.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 264: SL 1.5 - SL 1.5c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Logarithmic Scales',
    '$$\text{Richter scale: } M = \log_{10}\left(\frac{I}{I_0}\right)$$ $$\text{pH scale: } \text{pH} = -\log_{10}[\text{H}^+]$$ $$\text{Decibel scale: } L = 10\log_{10}\left(\frac{I}{I_0}\right)$$ Each unit increase multiplies intensity by 10 (Richter) or changes concentration by factor of 10 (pH).',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.5' 
  AND lesson_code = 'SL 1.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 265: SL 1.6 - SL 1.6a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Equality vs Identity',
    'Equality: True for specific values. $2x = 10$ when $x=5$ Identity: True for all values. $(x+1)^2 = x^2 + 2x + 1$ for all $x$ Proof structure: Start with LHS, manipulate step-by-step using valid operations, arrive at RHS. Each step must be justified.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.6' 
  AND lesson_code = 'SL 1.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 266: SL 1.6 - SL 1.6b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'LHS to RHS Proof Template',
    'To prove: $\text{LHS} = \text{RHS}$ Method: $$\text{LHS} = \ldots$$ [apply operations] $$= \ldots$$ [justify each step] $$= \text{RHS}$$ Valid operations: expand, factor, combine fractions, apply laws (exponents, logs), substitute identities.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.6' 
  AND lesson_code = 'SL 1.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 267: SL 1.6 - SL 1.6c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Verification Strategies',
    '1. Substitute answer back into original equation 2. Check units/dimensions match 3. Estimate: Does answer have reasonable magnitude? 4. Try specific values (not proof, but catches errors) 5. Alternative method: Solve different way, compare 6. Check limits/special cases',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.6' 
  AND lesson_code = 'SL 1.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 268: SL 1.7 - SL 1.7a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Rational Exponent Laws',
    '$$a^{m/n} = \sqrt[n]{a^m} = (\sqrt[n]{a})^m$$ $$a^{1/n} = \sqrt[n]{a}$$ Exponent laws still apply: $$a^{m/n} \cdot a^{p/q} = a^{(mq+pn)/(nq)}$$ $$(a^{m/n})^{p/q} = a^{mp/(nq)}$$ Example: $8^{2/3} = (\sqrt[3]{8})^2 = 2^2 = 4$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.7' 
  AND lesson_code = 'SL 1.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 269: SL 1.7 - SL 1.7b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Logarithm Laws',
    '$$\log_a(xy) = \log_a(x) + \log_a(y)$$ $$\log_a\left(\frac{x}{y}\right) = \log_a(x) - \log_a(y)$$ $$\log_a(x^n) = n\log_a(x)$$ $$\log_a(1) = 0, \quad \log_a(a) = 1$$ $$\log_a(x) = \frac{\log_b(x)}{\log_b(a)}$$ (change of base)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.7' 
  AND lesson_code = 'SL 1.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 270: SL 1.7 - SL 1.7c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Solving Logarithmic Equations',
    'Change of base: $$\log_a(x) = \frac{\log_b(x)}{\log_b(a)}$$ Solving strategy: 1. Combine logs using laws 2. Convert to exponential form 3. Solve for variable Example: $\log_2(x) = 3 \Rightarrow 2^3 = x \Rightarrow x = 8$ Or: $\log(x) + \log(x-3) = 1 \Rightarrow \log(x(x-3)) = 1 \Rightarrow x(x-3) = 10$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.7' 
  AND lesson_code = 'SL 1.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 271: SL 1.8 - SL 1.8a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Infinite Geometric Series Sum',
    '$$S_\infty = \frac{u_1}{1-r}, \quad |r| < 1$$ Convergence condition: $|r| < 1$ (terms get smaller) If $|r| \geq 1$: series diverges (no finite sum) Example: $1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots = \frac{1}{1-\frac{1}{2}} = 2$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.8' 
  AND lesson_code = 'SL 1.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 272: SL 1.8 - SL 1.8b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Repeating Decimal to Fraction',
    '$$0.\overline{d_1d_2\ldots d_k} = \frac{d_1d_2\ldots d_k}{999\ldots9} \text{ ($k$ nines)}$$ Using series: $$0.\overline{3} = 0.3 + 0.03 + 0.003 + \cdots = \frac{0.3}{1-0.1} = \frac{0.3}{0.9} = \frac{1}{3}$$ $$0.4\overline{5} = 0.4 + 0.05 + 0.005 + \cdots = 0.4 + \frac{0.05}{0.9} = \frac{41}{90}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.8' 
  AND lesson_code = 'SL 1.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 273: SL 1.8 - SL 1.8c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Modulus in Convergence',
    '$$|r| < 1 \text{ means } -1 < r < 1$$ Negative ratio: terms alternate sign but still converge Example: $r = -\frac{1}{2}$: $$1 - \frac{1}{2} + \frac{1}{4} - \frac{1}{8} + \cdots = \frac{1}{1-(-\frac{1}{2})} = \frac{1}{1.5} = \frac{2}{3}$$ Absolute value ensures convergence regardless of sign',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.8' 
  AND lesson_code = 'SL 1.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 274: SL 1.9 - SL 1.9a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Binomial Theorem',
    '$$(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k}b^k$$ where $\binom{n}{k} = \frac{n!}{k!(n-k)!} = {}^nC_k$ Example: $(x+2)^3 = x^3 + 3x^2(2) + 3x(2^2) + 2^3 = x^3 + 6x^2 + 12x + 8$ Coefficients from Pascal''s triangle or combination formula',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.9' 
  AND lesson_code = 'SL 1.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 275: SL 1.9 - SL 1.9b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Finding Specific Terms',
    'General term (k+1)th in $(a+b)^n$: $$T_{k+1} = \binom{n}{k} a^{n-k}b^k$$ Example: Find $x^3$ term in $(2x-1)^5$ Term with $x^3$: $k=3$, so $$T_4 = \binom{5}{3}(2x)^3(-1)^2 = 10 \cdot 8x^3 \cdot 1 = 80x^3$$ Calculator: Use nCr function',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.9' 
  AND lesson_code = 'SL 1.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 276: SL 1.9 - SL 1.9c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Binomial Applications',
    'Finding coefficients: Expand $(1+x)^n$ and identify coefficient of $x^k$: it''s $\binom{n}{k}$ Approximations: $(1+x)^n \approx 1 + nx$ for small $x$ Identities: $$(1+1)^n = \sum_{k=0}^n \binom{n}{k} = 2^n$$ $$(1-1)^n = \sum_{k=0}^n (-1)^k\binom{n}{k} = 0$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 1.9' 
  AND lesson_code = 'SL 1.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 277: AHL 1.10 - AHL 1.10a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Permutation Formulas',
    'Multiplication principle: If task 1 has $m$ ways and task 2 has $n$ ways: $m \times n$ total Factorial: $n! = n \times (n-1) \times \cdots \times 2 \times 1$ Permutations: $$P(n,r) = \frac{n!}{(n-r)!} = {}^nP_r$$ Example: Arrange 3 of 5 books: $P(5,3) = \frac{5!}{2!} = 60$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.10' 
  AND lesson_code = 'AHL 1.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 278: AHL 1.10 - AHL 1.10b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Combination Formula',
    '$$C(n,r) = \binom{n}{r} = \frac{n!}{r!(n-r)!} = {}^nC_r$$ Properties: $$\binom{n}{r} = \binom{n}{n-r}$$ $$\binom{n}{0} = \binom{n}{n} = 1$$ Example: Choose 3 from 8 students: $$\binom{8}{3} = \frac{8!}{3!5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.10' 
  AND lesson_code = 'AHL 1.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 279: AHL 1.10 - AHL 1.10c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Extended Binomial Expansion',
    'For $n \in \mathbb{Q}$, $|x| < 1$: $$(1+x)^n = 1 + nx + \frac{n(n-1)}{2!}x^2 + \frac{n(n-1)(n-2)}{3!}x^3 + \cdots$$ Infinite series! Example: $$(1+x)^{1/2} = 1 + \frac{1}{2}x - \frac{1}{8}x^2 + \frac{1}{16}x^3 - \cdots$$ $$(1+x)^{-1} = 1 - x + x^2 - x^3 + \cdots$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.10' 
  AND lesson_code = 'AHL 1.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 280: AHL 1.11 - AHL 1.11a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Partial Fraction Basics',
    'For proper fraction (degree numerator < denominator): $$\frac{P(x)}{(x-a)(x-b)} = \frac{A}{x-a} + \frac{B}{x-b}$$ If improper: divide first, then decompose remainder Example: $$\frac{5x-1}{(x-2)(x+1)} = \frac{A}{x-2} + \frac{B}{x+1}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.11' 
  AND lesson_code = 'AHL 1.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 281: AHL 1.11 - AHL 1.11b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Finding Coefficients',
    'Method 1 (Cover-up): Multiply both sides by denominator, substitute strategic values Method 2: Equate coefficients Example: $$\frac{7x-1}{(x-2)(x+3)} = \frac{A}{x-2} + \frac{B}{x+3}$$ Multiply by $(x-2)(x+3)$: $7x-1 = A(x+3) + B(x-2)$ Set $x=2$: $13=5A \Rightarrow A=\frac{13}{5}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.11' 
  AND lesson_code = 'AHL 1.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 282: AHL 1.11 - AHL 1.11c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Integration with Partial Fractions',
    '$$\int \frac{1}{x-a}dx = \ln|x-a| + C$$ Strategy: 1. Decompose into partial fractions 2. Integrate each term separately Example: $$\int \frac{5x-1}{(x-2)(x+1)}dx = \int\left(\frac{3}{x-2} + \frac{2}{x+1}\right)dx = 3\ln|x-2| + 2\ln|x+1| + C$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.11' 
  AND lesson_code = 'AHL 1.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 283: AHL 1.12 - AHL 1.12a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Complex Number Basics',
    '$$i = \sqrt{-1}, \quad i^2 = -1$$ Cartesian form: $z = a + bi$ where $a = \text{Re}(z)$, $b = \text{Im}(z)$ Operations: $$(a+bi) + (c+di) = (a+c) + (b+d)i$$ $$(a+bi)(c+di) = (ac-bd) + (ad+bc)i$$ Powers of $i$: $i^3=-i$, $i^4=1$, cycle repeats',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.12' 
  AND lesson_code = 'AHL 1.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 284: AHL 1.12 - AHL 1.12b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Argand Diagram and Conjugate',
    'Plot $z = a + bi$ at point $(a, b)$ Horizontal axis: real part Vertical axis: imaginary part Conjugate: $\overline{z} = a - bi$ (reflect over real axis) Properties: $$z + \overline{z} = 2a, \quad z \cdot \overline{z} = a^2 + b^2$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.12' 
  AND lesson_code = 'AHL 1.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 285: AHL 1.12 - AHL 1.12c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Modulus and Argument',
    'For $z = a + bi$: Modulus: $$|z| = \sqrt{a^2 + b^2}$$ (distance from origin) Argument: $$\arg(z) = \theta = \tan^{-1}\left(\frac{b}{a}\right)$$ (angle from positive real axis) Note: adjust $\theta$ based on quadrant Example: $z = 1 + i$: $|z| = \sqrt{2}$, $\arg(z) = \frac{\pi}{4}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.12' 
  AND lesson_code = 'AHL 1.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 286: AHL 1.13 - AHL 1.13a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Polar and Euler Forms',
    'Polar (modulus-argument): $$z = r(\cos\theta + i\sin\theta) = r\,\text{cis}\,\theta$$ Euler form: $$z = re^{i\theta}$$ where $r = |z|$, $\theta = \arg(z)$ Convert: Cartesian → Polar: $r = \sqrt{a^2+b^2}$, $\theta = \tan^{-1}(b/a)$ Polar → Cartesian: $a = r\cos\theta$, $b = r\sin\theta$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.13' 
  AND lesson_code = 'AHL 1.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 287: AHL 1.13 - AHL 1.13b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Polar Form Operations',
    'Multiplication: $$z_1z_2 = r_1r_2\,\text{cis}(\theta_1 + \theta_2)$$ Division: $$\frac{z_1}{z_2} = \frac{r_1}{r_2}\,\text{cis}(\theta_1 - \theta_2)$$ Powers (De Moivre): $$z^n = r^n\,\text{cis}(n\theta)$$ Add moduli multiply, arguments add! Division: divide moduli, subtract arguments',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.13' 
  AND lesson_code = 'AHL 1.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 288: AHL 1.13 - AHL 1.13c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Geometric Transformations',
    'Multiplication by $w = r\,\text{cis}\,\theta$: - Scales by factor $r$ - Rotates by angle $\theta$ Example: Multiply by $i = 1\,\text{cis}\,\frac{\pi}{2}$: rotates 90° counterclockwise Conjugate $\overline{z}$: reflects over real axis Addition: vector addition (parallelogram law)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.13' 
  AND lesson_code = 'AHL 1.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 289: AHL 1.14 - AHL 1.14a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Complex Conjugate Root Theorem',
    'If polynomial has REAL coefficients and $z = a + bi$ is a root, then $\overline{z} = a - bi$ is also a root. Quadratic formula with complex roots: $$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$ If $b^2-4ac < 0$: two complex conjugate roots Example: $x^2 + 2x + 5 = 0$: roots are $-1 \pm 2i$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.14' 
  AND lesson_code = 'AHL 1.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 290: AHL 1.14 - AHL 1.14b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'De Moivre''s Theorem',
    '$$[r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta + i\sin n\theta)$$ or $$(r\,\text{cis}\,\theta)^n = r^n\,\text{cis}(n\theta)$$ For roots: $n$th roots of $z = r\,\text{cis}\,\theta$: $$z_k = r^{1/n}\,\text{cis}\left(\frac{\theta + 2\pi k}{n}\right), \quad k = 0,1,\ldots,n-1$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.14' 
  AND lesson_code = 'AHL 1.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 291: AHL 1.14 - AHL 1.14c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Induction Proof Structure',
    '1. Base case: Show true for $n=1$ 2. Inductive hypothesis: Assume true for $n=k$ 3. Inductive step: Prove true for $n=k+1$ For De Moivre: Assume $(\text{cis}\,\theta)^k = \text{cis}(k\theta)$ Prove: $(\text{cis}\,\theta)^{k+1} = \text{cis}[(k+1)\theta]$ using angle addition formulas',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.14' 
  AND lesson_code = 'AHL 1.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 292: AHL 1.15 - AHL 1.15a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Induction Template',
    'To prove $P(n)$ for all $n \geq n_0$: 1. **Base case**: Verify $P(n_0)$ is true 2. **Inductive hypothesis**: Assume $P(k)$ is true 3. **Inductive step**: Prove $P(k) \Rightarrow P(k+1)$ Conclusion: $P(n)$ true for all $n \geq n_0$ Example: Prove $\sum_{i=1}^n i = \frac{n(n+1)}{2}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.15' 
  AND lesson_code = 'AHL 1.15a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 293: AHL 1.15 - AHL 1.15b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Contradiction Proof Template',
    'To prove statement $P$: 1. Assume $\neg P$ (not P) is true 2. Use logical deduction 3. Arrive at contradiction (something impossible or contradicting known fact) 4. Conclude $\neg P$ must be false, so $P$ is true Example: Prove $\sqrt{2}$ is irrational. Assume rational: $\sqrt{2} = \frac{p}{q}$ (lowest terms)...',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.15' 
  AND lesson_code = 'AHL 1.15b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 294: AHL 1.15 - AHL 1.15c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Disproving Universal Statements',
    'To disprove: ''For all $x$, $P(x)$ is true'' Find ONE example where $P(x)$ is false Example: Claim: $n^2 - n + 41$ is always prime Counterexample: $n=41$: $41^2 - 41 + 41 = 41^2$ (not prime!) One counterexample sufficient to disprove universal claim',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.15' 
  AND lesson_code = 'AHL 1.15c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 295: AHL 1.16 - AHL 1.16a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'System of Equations Types',
    'Two equations, two unknowns: $$\begin{cases} a_1x + b_1y = c_1 \\ a_2x + b_2y = c_2 \end{cases}$$ Solutions: 1. Unique solution (lines intersect at one point) 2. Infinite solutions (same line) 3. No solution (parallel lines) Methods: substitution, elimination, matrices',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.16' 
  AND lesson_code = 'AHL 1.16a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 296: AHL 1.16 - AHL 1.16b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Augmented Matrix Method',
    'System: $\begin{cases} 2x + y = 5 \\ x - y = 1 \end{cases}$ becomes $$\left[\begin{array}{cc|c} 2 & 1 & 5 \\ 1 & -1 & 1 \end{array}\right]$$ Row operations: 1. Swap rows 2. Multiply row by constant 3. Add multiple of one row to another Goal: Row Echelon Form (REF) or Reduced Row Echelon Form (RREF)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.16' 
  AND lesson_code = 'AHL 1.16b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 297: AHL 1.16 - AHL 1.16c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Solution Types in RREF',
    'Unique solution: each variable has leading 1 Infinite solutions: free variable(s), express in terms of parameter Example: $x + 2y = 3$ → $x = 3 - 2t$, $y = t$ (parameter $t$) Inconsistent (no solution): row like $[0\ 0\ |\ 5]$ (impossible: $0 = 5$)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 1.16' 
  AND lesson_code = 'AHL 1.16c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 298: SL 2.1 - SL 2.1a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Forms of Linear Equations',
    'Gradient-intercept: $$y = mx + c$$ ($m$ = gradient, $c$ = y-intercept) General form: $$ax + by + d = 0$$ Point-gradient: $$y - y_1 = m(x - x_1)$$ (through point $(x_1, y_1)$) Two-point form: $$\frac{y - y_1}{y_2 - y_1} = \frac{x - x_1}{x_2 - x_1}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.1' 
  AND lesson_code = 'SL 2.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 299: SL 2.1 - SL 2.1b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Gradient and Intercepts',
    'Gradient (slope): $$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\text{rise}}{\text{run}}$$ y-intercept: set $x = 0$, solve for $y$ x-intercept: set $y = 0$, solve for $x$ Example: $2x + 3y = 6$ y-intercept: $(0, 2)$, x-intercept: $(3, 0)$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.1' 
  AND lesson_code = 'SL 2.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 300: SL 2.1 - SL 2.1c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Parallel and Perpendicular Lines',
    'Parallel lines: $$m_1 = m_2$$ (same gradient) Perpendicular lines: $$m_1 \times m_2 = -1$$ (negative reciprocals) Example: Line $y = 2x + 3$ Parallel: $y = 2x - 5$ (same $m=2$) Perpendicular: $y = -\frac{1}{2}x + 1$ ($m = -\frac{1}{2}$)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.1' 
  AND lesson_code = 'SL 2.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 301: SL 2.2 - SL 2.2a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Function Notation and Terminology',
    'Function: $f: x \mapsto f(x)$ Each input has exactly ONE output Domain: set of all possible inputs ($x$ values) Range: set of all actual outputs ($f(x)$ values) Notation: $f(x) = x^2 + 1$ means $f: x \mapsto x^2 + 1$ Evaluate: $f(3) = 3^2 + 1 = 10$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.2' 
  AND lesson_code = 'SL 2.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 302: SL 2.2 - SL 2.2b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Finding Inverse Functions',
    'To find $f^{-1}(x)$ from $f(x)$: 1. Write $y = f(x)$ 2. Swap $x$ and $y$ 3. Solve for $y$ 4. Write as $f^{-1}(x)$ Example: $f(x) = 2x + 3$ $y = 2x + 3 \Rightarrow x = 2y + 3 \Rightarrow y = \frac{x-3}{2}$ So $f^{-1}(x) = \frac{x-3}{2}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.2' 
  AND lesson_code = 'SL 2.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 303: SL 2.2 - SL 2.2c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Graphical Features',
    'Key features to identify: - Intercepts: where graph crosses axes - Turning points: maxima/minima - Asymptotes: lines graph approaches - Domain/range: extent of graph - Symmetry: reflections or rotations Inverse reflection: swap $x$ and $y$ coordinates, reflect in $y=x$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.2' 
  AND lesson_code = 'SL 2.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 304: SL 2.3 - SL 2.3a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Using GDC for Graphing',
    'GDC/calculator steps: 1. Enter function in $y =$ menu 2. Set appropriate window (xmin, xmax, ymin, ymax) 3. Graph and analyze Transfer to paper: identify and label intercepts, turning points, asymptotes ''Sketch'' = key features labeled ''Draw'' = accurate plot',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.3' 
  AND lesson_code = 'SL 2.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 305: SL 2.3 - SL 2.3b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Sketch Requirements',
    'Essential labels: - Axes with scales - Intercepts (x and y) - Turning points with coordinates - Asymptotes (dotted lines) - Domain/range if restricted From context: identify type (linear, quadratic, exponential), key features, behavior at boundaries',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.3' 
  AND lesson_code = 'SL 2.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 306: SL 2.3 - SL 2.3c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Function Arithmetic',
    'Sum: $(f + g)(x) = f(x) + g(x)$ Difference: $(f - g)(x) = f(x) - g(x)$ On GDC: Graph $y_1 = f(x)$, $y_2 = g(x)$, $y_3 = y_1 + y_2$ Point-wise addition: at each $x$, add/subtract $y$ values Example: If $f(2) = 3$ and $g(2) = 5$, then $(f+g)(2) = 8$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.3' 
  AND lesson_code = 'SL 2.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 307: SL 2.4 - SL 2.4a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Graph Feature Checklist',
    'Zeros/roots: where $f(x) = 0$ (x-intercepts) y-intercept: $f(0)$ Maximum: highest point locally or globally Minimum: lowest point locally or globally Vertex: turning point of parabola Asymptotes: $x = a$ (vertical), $y = b$ (horizontal) Symmetry: even ($f(-x) = f(x)$), odd ($f(-x) = -f(x)$)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.4' 
  AND lesson_code = 'SL 2.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 308: SL 2.4 - SL 2.4b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Finding Intersections',
    'Algebraically: Solve $f(x) = g(x)$ Technology: Graph both, use ''intersect'' function Example: Find where $x^2 = 2x + 3$ Graph $y_1 = x^2$ and $y_2 = 2x + 3$ Intersections: $x = 3$ and $x = -1$ Solutions to equation!',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.4' 
  AND lesson_code = 'SL 2.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 309: SL 2.4 - SL 2.4c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Types of Asymptotes',
    'Vertical asymptote: $x = a$ Function undefined at $x = a$, $f(x) \to \pm\infty$ Example: $f(x) = \frac{1}{x-2}$ has $x = 2$ Horizontal asymptote: $y = b$ As $x \to \pm\infty$, $f(x) \to b$ Example: $f(x) = \frac{2x}{x+1}$ has $y = 2$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.4' 
  AND lesson_code = 'SL 2.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 310: SL 2.5 - SL 2.5a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Composite Function Notation',
    '$$(f \circ g)(x) = f(g(x))$$ Apply $g$ first, then $f$ to the result Example: If $f(x) = x^2$ and $g(x) = x + 1$ $$(f \circ g)(x) = f(x+1) = (x+1)^2$$ $$(g \circ f)(x) = g(x^2) = x^2 + 1$$ Note: $f \circ g \neq g \circ f$ in general!',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.5' 
  AND lesson_code = 'SL 2.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 311: SL 2.5 - SL 2.5b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Identity Function',
    'Identity function: $$I(x) = x$$ Returns input unchanged Key property with inverses: $$f \circ f^{-1} = I \quad \text{and} \quad f^{-1} \circ f = I$$ Meaning: $$f(f^{-1}(x)) = x \quad \text{and} \quad f^{-1}(f(x)) = x$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.5' 
  AND lesson_code = 'SL 2.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 312: SL 2.5 - SL 2.5c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Conditions for Inverse Existence',
    'Function $f$ has inverse if and only if it''s one-to-one (injective) Test: Horizontal line test - no horizontal line crosses graph more than once If $f(a) = f(b) \Rightarrow a = b$, then $f$ is one-to-one Domain restrictions: restrict to make one-to-one Example: $f(x) = x^2$ for $x \geq 0$ has inverse $f^{-1}(x) = \sqrt{x}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.5' 
  AND lesson_code = 'SL 2.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 313: SL 2.6 - SL 2.6a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Quadratic Function Basics',
    'Standard form: $$f(x) = ax^2 + bx + c$$ Shape: parabola $a > 0$: opens upward (minimum) $a < 0$: opens downward (maximum) y-intercept: $c$ (when $x = 0$) Axis of symmetry: $$x = -\frac{b}{2a}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.6' 
  AND lesson_code = 'SL 2.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 314: SL 2.6 - SL 2.6b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Three Forms of Quadratics',
    'Standard: $f(x) = ax^2 + bx + c$ Factored: $f(x) = a(x - p)(x - q)$ (roots $p$ and $q$) Vertex: $f(x) = a(x - h)^2 + k$ (vertex $(h, k)$) Convert standard to vertex: Complete the square Example: $x^2 + 6x + 5 = (x + 3)^2 - 4$ Vertex: $(-3, -4)$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.6' 
  AND lesson_code = 'SL 2.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 315: SL 2.6 - SL 2.6c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Vertex and Symmetry Formulas',
    'Vertex form: $f(x) = a(x - h)^2 + k$ Vertex: $(h, k)$ Axis of symmetry: $x = h$ From standard form $ax^2 + bx + c$: $$x = -\frac{b}{2a} \text{ (axis)}$$ $$y = f\left(-\frac{b}{2a}\right) \text{ (vertex y-coordinate)}$$ Example: $f(x) = 2x^2 - 8x + 3$ → vertex at $(2, -5)$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.6' 
  AND lesson_code = 'SL 2.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 316: SL 2.7 - SL 2.7a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Methods for Solving Quadratics',
    '1. Factorization: $x^2 + 5x + 6 = (x+2)(x+3) = 0$ → $x = -2$ or $-3$ 2. Quadratic formula: $$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$ 3. Completing the square: $x^2 + 6x = (x+3)^2 - 9$ 4. Graphically: Find x-intercepts Choose method based on form and complexity',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.7' 
  AND lesson_code = 'SL 2.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 317: SL 2.7 - SL 2.7b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Quadratic Formula and Discriminant',
    '$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$ Discriminant: $\Delta = b^2 - 4ac$ $\Delta > 0$: two distinct real roots $\Delta = 0$: one repeated real root $\Delta < 0$: two complex conjugate roots Example: $x^2 + 2x - 3 = 0$: $\Delta = 4 + 12 = 16 > 0$ → two real roots',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.7' 
  AND lesson_code = 'SL 2.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 318: SL 2.7 - SL 2.7c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Solving Quadratic Inequalities',
    'To solve $ax^2 + bx + c > 0$: 1. Find roots (solve $ax^2 + bx + c = 0$) 2. Sketch parabola 3. Identify where graph is above x-axis Example: $x^2 - 5x + 6 > 0$ Roots: $x = 2, 3$ Solution: $x < 2$ or $x > 3$ (outside roots)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.7' 
  AND lesson_code = 'SL 2.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 319: SL 2.8 - SL 2.8a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Reciprocal Function Properties',
    '$$f(x) = \frac{1}{x}, \quad x \neq 0$$ Domain: $\mathbb{R} \setminus \{0\}$ Range: $\mathbb{R} \setminus \{0\}$ Asymptotes: $x = 0$ (vertical), $y = 0$ (horizontal) Self-inverse: $f(f(x)) = f(1/x) = x$ Symmetry: origin (odd function)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.8' 
  AND lesson_code = 'SL 2.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 320: SL 2.8 - SL 2.8b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Rational Function Form',
    '$$f(x) = \frac{ax + b}{cx + d}, \quad cx + d \neq 0$$ Domain: all $x$ except $x = -\frac{d}{c}$ Vertical asymptote: $x = -\frac{d}{c}$ (denominator = 0) Horizontal asymptote: $y = \frac{a}{c}$ (ratio of leading coefficients) Example: $f(x) = \frac{2x-1}{x+3}$: VA at $x=-3$, HA at $y=2$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.8' 
  AND lesson_code = 'SL 2.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 321: SL 2.8 - SL 2.8c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Finding Asymptotes',
    'For $f(x) = \frac{ax+b}{cx+d}$: Vertical: Set denominator = 0, solve for $x$ $$cx + d = 0 \Rightarrow x = -\frac{d}{c}$$ Horizontal: Compare degrees If equal: $y = \frac{a}{c}$ (leading coefficient ratio) Example: $\frac{3x+5}{2x-1}$ → VA: $x=\frac{1}{2}$, HA: $y=\frac{3}{2}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.8' 
  AND lesson_code = 'SL 2.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 322: SL 2.9 - SL 2.9a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Exponential Function Basics',
    '$$f(x) = a^x, \quad a > 0, a \neq 1$$ Domain: all real numbers Range: $(0, \infty)$ (always positive) $a > 1$: exponential growth $0 < a < 1$: exponential decay $e = 2.71828...$ (natural base) Key: $f(x+1) = a \cdot f(x)$ (constant ratio)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.9' 
  AND lesson_code = 'SL 2.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 323: SL 2.9 - SL 2.9b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Exponential Graph Properties',
    '$$y = a^x$$ passes through $(0, 1)$ (always: $a^0 = 1$) Horizontal asymptote: $y = 0$ (x-axis) $a > 1$: increasing, curves upward $0 < a < 1$: decreasing, curves downward Never touches x-axis (always positive) Transformations: $y = ka^{x-h} + c$ shifts and scales',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.9' 
  AND lesson_code = 'SL 2.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 324: SL 2.9 - SL 2.9c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Solving Exponential Equations',
    'To solve $a^x = b$: Take log of both sides: $$x = \log_a(b) = \frac{\log(b)}{\log(a)}$$ Example: $2^x = 10$ $$x = \frac{\log(10)}{\log(2)} = \frac{1}{0.301} \approx 3.32$$ For $a^{f(x)} = a^{g(x)}$: solve $f(x) = g(x)$ (same base)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.9' 
  AND lesson_code = 'SL 2.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 325: SL 2.10 - SL 2.10a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Logarithmic Function Basics',
    '$$f(x) = \log_a(x), \quad a > 0, a \neq 1$$ Domain: $(0, \infty)$ (positive numbers only) Range: all real numbers Inverse of $a^x$: $\log_a(a^x) = x$ and $a^{\log_a(x)} = x$ Common: $\log(x) = \log_{10}(x)$ Natural: $\ln(x) = \log_e(x)$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.10' 
  AND lesson_code = 'SL 2.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 326: SL 2.10 - SL 2.10b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Logarithmic Graph Properties',
    '$$y = \log_a(x)$$ passes through $(1, 0)$ (always: $\log_a(1) = 0$) Vertical asymptote: $x = 0$ (y-axis) $a > 1$: increasing, curves right $0 < a < 1$: decreasing Never defined for $x \leq 0$ Reflection of $y = a^x$ in line $y = x$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.10' 
  AND lesson_code = 'SL 2.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 327: SL 2.10 - SL 2.10c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Solving Logarithmic Equations',
    'Method: Use log laws to combine, then convert to exponential Example: $\log_2(x) + \log_2(x-3) = 2$ $$\log_2(x(x-3)) = 2$$ $$x(x-3) = 2^2 = 4$$ $$x^2 - 3x - 4 = 0 \Rightarrow x = 4 \text{ or } -1$$ Check: $x = -1$ invalid (log of negative!), so $x = 4$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.10' 
  AND lesson_code = 'SL 2.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 328: SL 2.11 - SL 2.11a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Function Transformation Rules',
    'From $y = f(x)$: Vertical shift: $y = f(x) + k$ (up if $k>0$) Horizontal shift: $y = f(x - h)$ (right if $h>0$) Vertical stretch: $y = af(x)$ ($|a| > 1$ stretches) Horizontal stretch: $y = f(bx)$ ($|b| > 1$ compresses) Reflections: $y = -f(x)$ (x-axis), $y = f(-x)$ (y-axis)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.11' 
  AND lesson_code = 'SL 2.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 329: SL 2.11 - SL 2.11b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Multiple Transformations',
    'Order matters for combinations: $y = af(b(x-h)) + k$ Order of application: 1. Horizontal stretch/compress ($b$) 2. Horizontal shift ($h$) 3. Vertical stretch/compress ($a$) 4. Vertical shift ($k$) Example: $y = 2(x-3)^2 + 1$ → right 3, stretch by 2, up 1',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.11' 
  AND lesson_code = 'SL 2.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 330: SL 2.11 - SL 2.11c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Modeling with Transformations',
    'Given context, build model by transforming parent function: Base function → adjust amplitude (vertical stretch) → shift horizontally (phase) → shift vertically (midline) Example: Temperature varies $10°C$ around $20°C$ average: $T(t) = 10\sin(t) + 20$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 2.11' 
  AND lesson_code = 'SL 2.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 331: AHL 2.12 - AHL 2.12a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Polynomial Function Definition',
    '$$P(x) = a_nx^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0$$ Degree: $n$ (highest power) Leading coefficient: $a_n$ End behavior: determined by $a_nx^n$ Continuous, smooth curves Domain: all real numbers Example: $P(x) = 2x^3 - 5x^2 + 3x - 1$ (degree 3)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.12' 
  AND lesson_code = 'AHL 2.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 332: AHL 2.12 - AHL 2.12b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Factor Theorem',
    '$$f(a) = 0 \iff (x - a) \text{ is a factor of } f(x)$$ Application: Test values to find factors If $f(2) = 0$, then $(x-2)$ divides $f(x)$ Use to factor: $f(x) = (x-a)Q(x)$ Example: If $f(x) = x^3 - 6x^2 + 11x - 6$ and $f(1) = 0$ Then $(x-1)$ is a factor',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.12' 
  AND lesson_code = 'AHL 2.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 333: AHL 2.12 - AHL 2.12c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Remainder Theorem',
    'When $f(x)$ is divided by $(x-a)$: $$f(x) = (x-a)Q(x) + R$$ where $R = f(a)$ (remainder) If $R = 0$: $(x-a)$ is a factor (Factor Theorem) Example: Remainder when $x^3 + 2x - 5$ divided by $(x-2)$? Calculate $f(2) = 8 + 4 - 5 = 7$ Remainder is 7',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.12' 
  AND lesson_code = 'AHL 2.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 334: AHL 2.13 - AHL 2.13a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Higher Degree Rational Functions',
    '$$f(x) = \frac{P(x)}{Q(x)}$$ where $P$, $Q$ are polynomials Domain: all $x$ where $Q(x) \neq 0$ Vertical asymptotes: roots of $Q(x)$ Horizontal asymptote: depends on degree comparison - deg$(P)$ < deg$(Q)$: $y = 0$ - deg$(P)$ = deg$(Q)$: $y = \frac{a_n}{b_n}$ - deg$(P)$ > deg$(Q)$: no horizontal (oblique instead)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.13' 
  AND lesson_code = 'AHL 2.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 335: AHL 2.13 - AHL 2.13b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Oblique Asymptote Formula',
    'Occurs when deg$(P)$ = deg$(Q)$ + 1 Use polynomial long division: $$\frac{P(x)}{Q(x)} = mx + c + \frac{R(x)}{Q(x)}$$ Oblique asymptote: $y = mx + c$ Example: $$\frac{x^2 + 1}{x - 1} = x + 1 + \frac{2}{x-1}$$ Oblique asymptote: $y = x + 1$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.13' 
  AND lesson_code = 'AHL 2.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 336: AHL 2.13 - AHL 2.13c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Average and Marginal Analysis',
    'Average cost: $$\overline{C}(x) = \frac{C(x)}{x}$$ Concentration: $$c(t) = \frac{A}{V(t)}$$ Optimization: Find max/min using calculus Example: Average cost $\overline{C}(x) = \frac{100 + 5x}{x} = \frac{100}{x} + 5$ has horizontal asymptote $y = 5$ (limiting average cost)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.13' 
  AND lesson_code = 'AHL 2.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 337: AHL 2.14 - AHL 2.14a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Domain of Composite Functions',
    'For $(f \circ g)(x) = f(g(x))$: Domain requires: 1. $x$ in domain of $g$ 2. $g(x)$ in domain of $f$ Example: $f(x) = \sqrt{x}$, $g(x) = x - 4$ $(f \circ g)(x) = \sqrt{x-4}$ Domain: $x \geq 4$ (need $x - 4 \geq 0$)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.14' 
  AND lesson_code = 'AHL 2.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 338: AHL 2.14 - AHL 2.14b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Inverse of Composite Functions',
    '$$(f \circ g)^{-1} = g^{-1} \circ f^{-1}$$ Order reverses! Example: If $h(x) = (2x + 3)^2$ Think: $g(x) = 2x + 3$, $f(x) = x^2$ Then $h^{-1}(x) = \frac{\sqrt{x} - 3}{2}$ (undo square, then undo $2x+3$)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.14' 
  AND lesson_code = 'AHL 2.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 339: AHL 2.14 - AHL 2.14c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Application Formulas',
    'Solving $f(g(x)) = k$: Apply $f^{-1}$ to both sides: $g(x) = f^{-1}(k)$ Then solve for $x$ Finding iterates: $f^2(x) = f(f(x))$, $f^3(x) = f(f(f(x)))$ Fixed points: Solve $f(x) = x$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.14' 
  AND lesson_code = 'AHL 2.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 340: AHL 2.15 - AHL 2.15a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Solving Rational Inequalities',
    'To solve $\frac{P(x)}{Q(x)} > 0$: 1. Find zeros: $P(x) = 0$ and $Q(x) = 0$ 2. Mark critical points on number line 3. Test sign in each interval 4. Combine intervals where condition met Example: $\frac{x-1}{x+2} > 0$ Critical: $x=1$, $x=-2$ Solution: $x < -2$ or $x > 1$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.15' 
  AND lesson_code = 'AHL 2.15a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 341: AHL 2.15 - AHL 2.15b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Domain and Range Analysis',
    'Domain of $\frac{P(x)}{Q(x)}$: all $x$ where $Q(x) \neq 0$ Range: values $f$ can output Method: Set $y = f(x)$, solve for $x$ Values of $y$ that give valid $x$ are in range Asymptotes help: often exclude asymptote value from range Example: $f(x) = \frac{1}{x}$ excludes $y = 0$ from range',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.15' 
  AND lesson_code = 'AHL 2.15b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 342: AHL 2.15 - AHL 2.15c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Optimization Strategy',
    'For rational function $f(x) = \frac{P(x)}{Q(x)}$: 1. Find $f''(x)$ (quotient rule) 2. Solve $f''(x) = 0$ for critical points 3. Check endpoints and asymptotic behavior 4. Evaluate $f$ at critical points Example: Minimize $f(x) = x + \frac{4}{x}$ for $x > 0$ $f''(x) = 1 - \frac{4}{x^2} = 0 \Rightarrow x = 2$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.15' 
  AND lesson_code = 'AHL 2.15c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 343: AHL 2.16 - AHL 2.16a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced Transformation Types',
    'Dilation from point $(h, k)$: $$y - k = a(f(x) - k)$$ Absolute value transformations: $y = |f(x)|$ (reflect negative parts) $y = f(|x|)$ (symmetric about y-axis) Piecewise combinations Multiple compositions Example: $y = |x^2 - 4|$ reflects parts below x-axis',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.16' 
  AND lesson_code = 'AHL 2.16a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 344: AHL 2.16 - AHL 2.16b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Matrix Transformations',
    'Point $(x, y)$ transformed by matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$: $$\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}$$ Standard transformations: Rotation, reflection, scaling, shearing Composition: multiply matrices',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.16' 
  AND lesson_code = 'AHL 2.16b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 345: AHL 2.16 - AHL 2.16c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Modeling Complex Transformations',
    'Combining transformations for models: $$y = a\cdot f(b(x - h)) + k$$ Scale, shift, transform Real example: Tidal model $h(t) = 2\sin(\frac{\pi}{6}(t-3)) + 5$ Amplitude 2m, period 12h, peak at t=3h, mean 5m Multiple transformation analysis essential',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 2.16' 
  AND lesson_code = 'AHL 2.16c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 346: SL 3.1 - SL 3.1a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    '3D Coordinate System',
    'Point in 3D: $(x, y, z)$ $x$: left/right, $y$: forward/back, $z$: up/down Distance between $(x_1, y_1, z_1)$ and $(x_2, y_2, z_2)$: $$d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$$ Midpoint: $$M = \left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}, \frac{z_1+z_2}{2}\right)$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.1' 
  AND lesson_code = 'SL 3.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 347: SL 3.1 - SL 3.1b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Plane Equations',
    'General form: $$ax + by + cz = d$$ Normal vector: $\mathbf{n} = (a, b, c)$ perpendicular to plane Given point $(x_0, y_0, z_0)$ on plane: $$a(x-x_0) + b(y-y_0) + c(z-z_0) = 0$$ Example: Plane through $(1, 2, 3)$ with normal $(2, -1, 4)$: $$2(x-1) - (y-2) + 4(z-3) = 0$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.1' 
  AND lesson_code = 'SL 3.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 348: SL 3.1 - SL 3.1c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Line-Plane Intersection',
    'Line: $\mathbf{r} = \mathbf{a} + t\mathbf{d}$ or parametric form Plane: $ax + by + cz = d$ Substitute line into plane equation, solve for $t$ Cases: - One point (line intersects plane) - No solution (line parallel to plane) - Infinite solutions (line in plane) Example: Find where line through origin in direction $(1,1,1)$ meets plane $x+y+z=3$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.1' 
  AND lesson_code = 'SL 3.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 349: SL 3.2 - SL 3.2a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'SOHCAHTOA',
    'In right triangle with angle $\theta$: $$\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}$$ $$\cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}$$ $$\tan\theta = \frac{\text{opposite}}{\text{adjacent}} = \frac{\sin\theta}{\cos\theta}$$ Reciprocals: $\csc\theta = \frac{1}{\sin\theta}$, $\sec\theta = \frac{1}{\cos\theta}$, $\cot\theta = \frac{1}{\tan\theta}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.2' 
  AND lesson_code = 'SL 3.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 350: SL 3.2 - SL 3.2b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Exact Trig Values',
    '$$\sin 30° = \frac{1}{2}, \cos 30° = \frac{\sqrt{3}}{2}, \tan 30° = \frac{1}{\sqrt{3}}$$ $$\sin 45° = \frac{\sqrt{2}}{2}, \cos 45° = \frac{\sqrt{2}}{2}, \tan 45° = 1$$ $$\sin 60° = \frac{\sqrt{3}}{2}, \cos 60° = \frac{1}{2}, \tan 60° = \sqrt{3}$$ $$\sin 90° = 1, \cos 90° = 0, \tan 90° = \text{undefined}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.2' 
  AND lesson_code = 'SL 3.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 351: SL 3.2 - SL 3.2c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Application Problem Setup',
    'Angle of elevation: looking up from horizontal Angle of depression: looking down from horizontal Find unknown side: identify given angle and sides, choose appropriate ratio Solve: $$\sin\theta = \frac{h}{d} \Rightarrow h = d\sin\theta$$ Example: Tree height from 20m away at 35° elevation: $h = 20\tan 35°$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.2' 
  AND lesson_code = 'SL 3.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 352: SL 3.3 - SL 3.3a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Unit Circle Definition',
    'Circle with radius 1, centered at origin: $$x^2 + y^2 = 1$$ For angle $\theta$ from positive x-axis: Point on circle: $(\cos\theta, \sin\theta)$ Therefore: $$\sin^2\theta + \cos^2\theta = 1$$ Unit circle extends trig beyond right triangles to all angles',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.3' 
  AND lesson_code = 'SL 3.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 353: SL 3.3 - SL 3.3b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Radian-Degree Conversion',
    '$$\pi \text{ radians} = 180°$$ Conversion: $$\text{radians} = \text{degrees} \times \frac{\pi}{180}$$ $$\text{degrees} = \text{radians} \times \frac{180}{\pi}$$ Examples: $90° = \frac{\pi}{2}$ rad, $60° = \frac{\pi}{3}$ rad, $1 \text{ rad} \approx 57.3°$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.3' 
  AND lesson_code = 'SL 3.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 354: SL 3.3 - SL 3.3c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Arc Length and Sector Area',
    'Arc length: $$s = r\theta$$ ($\theta$ in radians) Sector area: $$A = \frac{1}{2}r^2\theta$$ ($\theta$ in radians) Example: Circle radius 5cm, angle $\frac{\pi}{3}$: Arc length: $s = 5 \cdot \frac{\pi}{3} = \frac{5\pi}{3}$ cm Area: $A = \frac{1}{2}(5)^2 \cdot \frac{\pi}{3} = \frac{25\pi}{6}$ cm²',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.3' 
  AND lesson_code = 'SL 3.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 355: SL 3.4 - SL 3.4a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Fundamental Trig Identities',
    'Pythagorean: $$\sin^2\theta + \cos^2\theta = 1$$ $$1 + \tan^2\theta = \sec^2\theta$$ $$1 + \cot^2\theta = \csc^2\theta$$ Quotient: $$\tan\theta = \frac{\sin\theta}{\cos\theta}, \quad \cot\theta = \frac{\cos\theta}{\sin\theta}$$ Reciprocal: $\sin\theta = \frac{1}{\csc\theta}$, $\cos\theta = \frac{1}{\sec\theta}$, etc.',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.4' 
  AND lesson_code = 'SL 3.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 356: SL 3.4 - SL 3.4b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Simplification Strategies',
    'Common techniques: 1. Convert to sin and cos: $\tan\theta = \frac{\sin\theta}{\cos\theta}$ 2. Use Pythagorean: $\sin^2\theta = 1 - \cos^2\theta$ 3. Factor: $\sin^2\theta - \cos^2\theta = (\sin\theta - \cos\theta)(\sin\theta + \cos\theta)$ Example: Simplify $\frac{1}{\sin\theta} - \sin\theta = \frac{1-\sin^2\theta}{\sin\theta} = \frac{\cos^2\theta}{\sin\theta}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.4' 
  AND lesson_code = 'SL 3.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 357: SL 3.4 - SL 3.4c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Identity Proof Strategy',
    'To prove: LHS = RHS 1. Start with more complex side 2. Apply identities step by step 3. Arrive at other side DON''T: Work both sides toward middle Don''t assume what proving! Example: Prove $\tan\theta + \cot\theta = \frac{1}{\sin\theta\cos\theta}$ LHS $= \frac{\sin\theta}{\cos\theta} + \frac{\cos\theta}{\sin\theta} = \frac{\sin^2\theta + \cos^2\theta}{\sin\theta\cos\theta} = \frac{1}{\sin\theta\cos\theta}$ = RHS',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.4' 
  AND lesson_code = 'SL 3.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 358: SL 3.5 - SL 3.5a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Sine and Cosine Graphs',
    '$$y = \sin x$$ Domain: all reals, Range: $[-1, 1]$ Period: $2\pi$, zeros: $x = n\pi$ $$y = \cos x$$ Domain: all reals, Range: $[-1, 1]$ Period: $2\pi$, zeros: $x = \frac{\pi}{2} + n\pi$ Relationship: $\cos x = \sin(x + \frac{\pi}{2})$ (phase shift)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.5' 
  AND lesson_code = 'SL 3.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 359: SL 3.5 - SL 3.5b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Amplitude and Period Formulas',
    'For $y = a\sin(bx)$ or $y = a\cos(bx)$: Amplitude: $|a|$ (maximum displacement from midline) Period: $\frac{2\pi}{|b|}$ (length of one complete cycle) Frequency: $\frac{|b|}{2\pi}$ (cycles per unit) Example: $y = 3\sin(2x)$ → amplitude 3, period $\pi$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.5' 
  AND lesson_code = 'SL 3.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 360: SL 3.5 - SL 3.5c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Phase and Vertical Shifts',
    'General form: $$y = a\sin(b(x - c)) + d$$ Phase shift: $c$ (horizontal, right if $c > 0$) Vertical shift: $d$ (midline moves to $y = d$) New range: $[d - |a|, d + |a|]$ Example: $y = 2\sin(3(x - \frac{\pi}{6})) + 1$ → right $\frac{\pi}{6}$, midline $y = 1$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.5' 
  AND lesson_code = 'SL 3.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 361: SL 3.6 - SL 3.6a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Tangent and Cotangent Graphs',
    '$$y = \tan x = \frac{\sin x}{\cos x}$$ Domain: $x \neq \frac{\pi}{2} + n\pi$ Range: all reals Period: $\pi$, Asymptotes: $x = \frac{\pi}{2} + n\pi$ $$y = \cot x = \frac{\cos x}{\sin x}$$ Domain: $x \neq n\pi$, Range: all reals Period: $\pi$, Asymptotes: $x = n\pi$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.6' 
  AND lesson_code = 'SL 3.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 362: SL 3.6 - SL 3.6b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Trig Function Asymptotes',
    'For $y = \tan x$: Asymptotes at $x = \frac{\pi}{2} + n\pi$ (where $\cos x = 0$) For $y = \cot x$: Asymptotes at $x = n\pi$ (where $\sin x = 0$) Function approaches $\pm\infty$ at asymptotes Transformed: $y = a\tan(b(x-c))$ has asymptotes shifted and scaled',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.6' 
  AND lesson_code = 'SL 3.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 363: SL 3.6 - SL 3.6c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Tangent Transformations',
    'For $y = a\tan(bx)$ or $y = a\cot(bx)$: Period: $\frac{\pi}{|b|}$ (note: $\pi$ not $2\pi$!) Vertical stretch: $|a|$ (affects steepness) No amplitude (unbounded) Example: $y = 2\tan(3x)$ → period $\frac{\pi}{3}$, steeper by factor 2',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.6' 
  AND lesson_code = 'SL 3.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 364: SL 3.7 - SL 3.7a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Circular Function Definition',
    'Circular functions = trig functions viewed as functions of arc length on unit circle Equivalently: functions of real numbers (not just angles) $$\sin: \mathbb{R} \to [-1, 1]$$ $$\cos: \mathbb{R} \to [-1, 1]$$ Same formulas, broader interpretation Period $2\pi$ = once around circle',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.7' 
  AND lesson_code = 'SL 3.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 365: SL 3.7 - SL 3.7b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Circular Function Graph Properties',
    'Same as trig function graphs: $y = \sin x$: starts $(0,0)$, wave pattern $y = \cos x$: starts $(0,1)$, wave pattern Period $2\pi$, amplitude 1 (unless transformed) Continuous, smooth, bounded All transformations apply: $y = a\sin(b(x-c)) + d$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.7' 
  AND lesson_code = 'SL 3.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 366: SL 3.7 - SL 3.7c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Periodic Model Template',
    'General sinusoidal model: $$y = a\sin(b(t - c)) + d$$ Or: $$y = a\cos(b(t - c)) + d$$ Identify from context: $a$ = half range, $d$ = midline, period $T = \frac{2\pi}{b}$, $c$ = shift Example: Daily temperature: max 30°, min 10°, peaks at 2pm',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.7' 
  AND lesson_code = 'SL 3.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 367: SL 3.8 - SL 3.8a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Inverse Trig Functions',
    '$$\arcsin x = \sin^{-1} x: [-1,1] \to [-\frac{\pi}{2}, \frac{\pi}{2}]$$ $$\arccos x = \cos^{-1} x: [-1,1] \to [0, \pi]$$ $$\arctan x = \tan^{-1} x: \mathbb{R} \to (-\frac{\pi}{2}, \frac{\pi}{2})$$ Properties: $\sin(\sin^{-1} x) = x$, $\sin^{-1}(\sin x) = x$ (within range)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.8' 
  AND lesson_code = 'SL 3.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 368: SL 3.8 - SL 3.8b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Inverse Trig Graph Properties',
    '$y = \sin^{-1} x$: Domain $[-1, 1]$, Range $[-\frac{\pi}{2}, \frac{\pi}{2}]$ Increasing, passes through origin $y = \cos^{-1} x$: Domain $[-1, 1]$, Range $[0, \pi]$ Decreasing, passes through $(1, 0)$ $y = \tan^{-1} x$: Domain all reals, Range $(-\frac{\pi}{2}, \frac{\pi}{2})$ Horizontal asymptotes at $\pm\frac{\pi}{2}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.8' 
  AND lesson_code = 'SL 3.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 369: SL 3.8 - SL 3.8c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Solving with Inverse Trig',
    'To solve $\sin\theta = k$: $$\theta = \sin^{-1}(k)$$ (principal value) General solution: $\theta = \sin^{-1}(k) + 2n\pi$ or $\theta = \pi - \sin^{-1}(k) + 2n\pi$ Example: $\sin\theta = 0.5$ $\theta = \sin^{-1}(0.5) = \frac{\pi}{6}$ or $\theta = \pi - \frac{\pi}{6} = \frac{5\pi}{6}$ (plus $2n\pi$)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 3.8' 
  AND lesson_code = 'SL 3.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 370: AHL 3.9 - AHL 3.9a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Reciprocal Trig Functions',
    '$$\csc\theta = \frac{1}{\sin\theta}$$ (cosecant) $$\sec\theta = \frac{1}{\cos\theta}$$ (secant) $$\cot\theta = \frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}$$ (cotangent) Pythagorean identities: $$1 + \cot^2\theta = \csc^2\theta$$ $$1 + \tan^2\theta = \sec^2\theta$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.9' 
  AND lesson_code = 'AHL 3.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 371: AHL 3.9 - AHL 3.9b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Reciprocal Trig Graphs',
    '$y = \csc x$: Range $(-\infty, -1] \cup [1, \infty)$ Asymptotes where $\sin x = 0$ $y = \sec x$: Range $(-\infty, -1] \cup [1, \infty)$ Asymptotes where $\cos x = 0$ $y = \cot x$: Range all reals, Period $\pi$ Asymptotes where $\sin x = 0$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.9' 
  AND lesson_code = 'AHL 3.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 372: AHL 3.9 - AHL 3.9c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced Inverse Identities',
    '$$\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$$ $$\tan^{-1}x + \tan^{-1}\left(\frac{1}{x}\right) = \frac{\pi}{2}, \quad x > 0$$ $$\sin^{-1}(-x) = -\sin^{-1}(x)$$ $$\cos^{-1}(-x) = \pi - \cos^{-1}(x)$$ $$\tan^{-1}(-x) = -\tan^{-1}(x)$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.9' 
  AND lesson_code = 'AHL 3.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 373: AHL 3.10 - AHL 3.10a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Compound Angle Formulas',
    '$$\sin(A \pm B) = \sin A \cos B \pm \cos A \sin B$$ $$\cos(A \pm B) = \cos A \cos B \mp \sin A \sin B$$ $$\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A \tan B}$$ Note: signs! $\sin$ same, $\cos$ opposite Example: $\sin 75° = \sin(45° + 30°) = \frac{\sqrt{6} + \sqrt{2}}{4}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.10' 
  AND lesson_code = 'AHL 3.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 374: AHL 3.10 - AHL 3.10b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Double Angle Formulas',
    '$$\sin(2A) = 2\sin A \cos A$$ $$\cos(2A) = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A$$ $$\tan(2A) = \frac{2\tan A}{1 - \tan^2 A}$$ Half-angle (rearranged): $$\sin^2 A = \frac{1 - \cos(2A)}{2}$$, $$\cos^2 A = \frac{1 + \cos(2A)}{2}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.10' 
  AND lesson_code = 'AHL 3.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 375: AHL 3.10 - AHL 3.10c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Solving with Angle Formulas',
    'Strategy: Express complex angles as sums/differences Example: Find exact value of $\sin 15°$ $$\sin 15° = \sin(45° - 30°)$$ $$= \sin 45°\cos 30° - \cos 45°\sin 30°$$ $$= \frac{\sqrt{2}}{2} \cdot \frac{\sqrt{3}}{2} - \frac{\sqrt{2}}{2} \cdot \frac{1}{2} = \frac{\sqrt{6} - \sqrt{2}}{4}$$ Also: solve equations, prove identities',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.10' 
  AND lesson_code = 'AHL 3.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 376: AHL 3.11 - AHL 3.11a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Trig Symmetry Properties',
    'Even functions: $f(-x) = f(x)$ $$\cos(-x) = \cos x$$ $$\sec(-x) = \sec x$$ Odd functions: $f(-x) = -f(x)$ $$\sin(-x) = -\sin x$$ $$\tan(-x) = -\tan x$$ $$\csc(-x) = -\csc x$$ $$\cot(-x) = -\cot x$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.11' 
  AND lesson_code = 'AHL 3.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 377: AHL 3.11 - AHL 3.11b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Periodic and Symmetric Properties',
    'Periodicity: $$\sin(x + 2\pi) = \sin x, \quad \cos(x + 2\pi) = \cos x$$ $$\tan(x + \pi) = \tan x$$ Combined with symmetry: $$\sin(\pi - x) = \sin x$$ $$\cos(\pi - x) = -\cos x$$ $$\sin(\pi + x) = -\sin x$$ Related angles formulas',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.11' 
  AND lesson_code = 'AHL 3.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 378: AHL 3.11 - AHL 3.11c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Using Symmetry to Simplify',
    'Integration application: $$\int_{-a}^{a} \text{odd function} = 0$$ Equation solving: Use symmetry to find all solutions Example: If $\sin x = 0.5$, then $x = \sin^{-1}(0.5)$ and by symmetry $x = \pi - \sin^{-1}(0.5)$ Identities: Replace $-x$ and apply even/odd properties',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.11' 
  AND lesson_code = 'AHL 3.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 379: AHL 3.12 - AHL 3.12a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Vector Basics',
    'Vector notation: $\mathbf{v} = \begin{pmatrix} x \\ y \\ z \end{pmatrix}$ or $\mathbf{v} = x\mathbf{i} + y\mathbf{j} + z\mathbf{k}$ Magnitude: $$|\mathbf{v}| = \sqrt{x^2 + y^2 + z^2}$$ Unit vector: $$\hat{\mathbf{v}} = \frac{\mathbf{v}}{|\mathbf{v}|}$$ Position vector: from origin to point',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.12' 
  AND lesson_code = 'AHL 3.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 380: AHL 3.12 - AHL 3.12b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Vector Operations',
    'Addition: $$\mathbf{u} + \mathbf{v} = \begin{pmatrix} u_1 + v_1 \\ u_2 + v_2 \\ u_3 + v_3 \end{pmatrix}$$ (component-wise) Scalar multiplication: $$k\mathbf{v} = \begin{pmatrix} kv_1 \\ kv_2 \\ kv_3 \end{pmatrix}$$ Subtraction: $\mathbf{u} - \mathbf{v} = \mathbf{u} + (-\mathbf{v})$ Geometric: tip-to-tail (addition), scaling (scalar mult)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.12' 
  AND lesson_code = 'AHL 3.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 381: AHL 3.12 - AHL 3.12c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Vector Application Formulas',
    'Displacement: $\mathbf{s} = \mathbf{r}_2 - \mathbf{r}_1$ Velocity: $\mathbf{v} = \frac{\Delta \mathbf{r}}{\Delta t}$ Force combination: $\mathbf{F}_{net} = \mathbf{F}_1 + \mathbf{F}_2 + \cdots$ Distance: $|\mathbf{r}_2 - \mathbf{r}_1|$ Speed: $|\mathbf{v}|$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.12' 
  AND lesson_code = 'AHL 3.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 382: AHL 3.13 - AHL 3.13a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Linear System Basics',
    'System of $m$ equations in $n$ unknowns: $$\begin{cases} a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\ a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\ \vdots \end{cases}$$ Solution types: unique, infinite, none Methods: substitution, elimination, matrix (Gaussian)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.13' 
  AND lesson_code = 'AHL 3.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 383: AHL 3.13 - AHL 3.13b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Gaussian Elimination',
    'Augmented matrix → RREF Elementary row operations: 1. Swap rows 2. Multiply row by nonzero constant 3. Add multiple of one row to another Goal: $$\left[\begin{array}{ccc|c} 1 & 0 & 0 & x \\ 0 & 1 & 0 & y \\ 0 & 0 & 1 & z \end{array}\right]$$ Read solution directly',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.13' 
  AND lesson_code = 'AHL 3.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 384: AHL 3.13 - AHL 3.13c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Linear System Modeling',
    'Set up from context: 1. Define variables 2. Write equations from constraints 3. Solve system 4. Interpret solution Example: Mixture problem, cost optimization, traffic flow, chemical balance Applications: economics (supply/demand), engineering (circuits), operations research',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.13' 
  AND lesson_code = 'AHL 3.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 385: AHL 3.14 - AHL 3.14a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Dot and Cross Products',
    'Dot product (scalar): $$\mathbf{u} \cdot \mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3 = |\mathbf{u}||\mathbf{v}|\cos\theta$$ Cross product (vector): $$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix}$$ $|\mathbf{u} \times \mathbf{v}| = |\mathbf{u}||\mathbf{v}|\sin\theta$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.14' 
  AND lesson_code = 'AHL 3.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 386: AHL 3.14 - AHL 3.14b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Vector Equations in 3D',
    'Line through point $\mathbf{a}$ in direction $\mathbf{d}$: $$\mathbf{r} = \mathbf{a} + t\mathbf{d}$$ Plane through point $\mathbf{a}$ with normal $\mathbf{n}$: $$(\mathbf{r} - \mathbf{a}) \cdot \mathbf{n} = 0$$ or $\mathbf{r} \cdot \mathbf{n} = k$ Distance from point to plane: $$d = \frac{|\mathbf{r}_0 \cdot \mathbf{n} - k|}{|\mathbf{n}|}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.14' 
  AND lesson_code = 'AHL 3.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 387: AHL 3.14 - AHL 3.14c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced Vector Applications',
    'Work: $W = \mathbf{F} \cdot \mathbf{s}$ (dot product) Torque: $\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F}$ (cross product) Projection of $\mathbf{u}$ onto $\mathbf{v}$: $$\text{proj}_\mathbf{v}\mathbf{u} = \frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{v}|^2}\mathbf{v}$$ Area of triangle: $\frac{1}{2}|\mathbf{u} \times \mathbf{v}|$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.14' 
  AND lesson_code = 'AHL 3.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 388: AHL 3.15 - AHL 3.15a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'System Classification',
    'Consistent: at least one solution Inconsistent: no solution Dependent: infinite solutions Independent: unique solution Rank analysis: rank($A$) vs rank($[A|b]$) If rank($A$) = rank($[A|b]$) = $n$: unique If rank($A$) = rank($[A|b]$) < $n$: infinite If rank($A$) < rank($[A|b]$): inconsistent',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.15' 
  AND lesson_code = 'AHL 3.15a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 389: AHL 3.15 - AHL 3.15b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Matrix Operations',
    'Addition: component-wise (same size) Multiplication: $$[AB]_{ij} = \sum_{k} A_{ik}B_{kj}$$ Determinant (2×2): $$\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$$ Inverse (2×2): $$A^{-1} = \frac{1}{\det A}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.15' 
  AND lesson_code = 'AHL 3.15b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 390: AHL 3.15 - AHL 3.15c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Optimization with Constraints',
    'Linear programming: Maximize/minimize: $c_1x_1 + c_2x_2 + \cdots$ Subject to: linear constraints Feasible region: intersection of constraint half-planes Solution: vertex of feasible region Matrix form: $\max \mathbf{c}^T\mathbf{x}$ subject to $A\mathbf{x} \leq \mathbf{b}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.15' 
  AND lesson_code = 'AHL 3.15c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 391: AHL 3.16 - AHL 3.16a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Vector Space Axioms',
    'Vector space: set with addition and scalar multiplication satisfying: 1. Closure under addition/scalar mult 2. Commutativity: $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$ 3. Associativity 4. Zero vector exists 5. Additive inverse exists Examples: $\mathbb{R}^n$, polynomials, functions Basis: linearly independent spanning set',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.16' 
  AND lesson_code = 'AHL 3.16a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 392: AHL 3.16 - AHL 3.16b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Linear Transformation Definition',
    '$T: V \to W$ is linear if: $$T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$$ $$T(k\mathbf{v}) = kT(\mathbf{v})$$ Matrix representation: $T(\mathbf{x}) = A\mathbf{x}$ Kernel: $\ker(T) = \{\mathbf{v}: T(\mathbf{v}) = \mathbf{0}\}$ Image: $\text{Im}(T) = \{T(\mathbf{v}): \mathbf{v} \in V\}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.16' 
  AND lesson_code = 'AHL 3.16b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 393: AHL 3.16 - AHL 3.16c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Transformation Applications',
    'Rotation matrix (2D): $$R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$ Projection onto line: $$P = \frac{\mathbf{v}\mathbf{v}^T}{\mathbf{v}^T\mathbf{v}}$$ Eigenvalues/eigenvectors: $A\mathbf{v} = \lambda\mathbf{v}$ Special directions preserved by transformation',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.16' 
  AND lesson_code = 'AHL 3.16c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 394: SL 4.1 - SL 4.1a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Data Classification',
    'Qualitative (categorical): colors, names, categories Quantitative (numerical): counts, measurements Discrete: countable values (0, 1, 2, ...) Continuous: any value in range Collection methods: survey, experiment, observation, census Sample vs population',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.1' 
  AND lesson_code = 'SL 4.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 395: SL 4.1 - SL 4.1b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Data Display Types',
    'Frequency table: value and count Bar chart: categorical data (discrete bars) Histogram: continuous data (connected bars) Pie chart: proportions of whole Box plot: five-number summary Scatter plot: relationship between two variables Choose based on data type and purpose',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.1' 
  AND lesson_code = 'SL 4.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 396: SL 4.1 - SL 4.1c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Analysis Techniques',
    'Identify: trends (increasing/decreasing), patterns (cyclical), outliers (unusual values) Compare: groups, time periods Summarize: typical value, spread, shape Draw conclusions: supported by data Caution: correlation ≠ causation',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.1' 
  AND lesson_code = 'SL 4.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 397: SL 4.2 - SL 4.2a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Sampling Method Types',
    'Simple random: every member equal probability Stratified: divide into groups, sample from each Systematic: every $k$th member Cluster: sample entire groups Convenience: easily accessible (often biased) Sample size formula (prop): $n = \frac{N}{1 + Ne^2}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.2' 
  AND lesson_code = 'SL 4.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 398: SL 4.2 - SL 4.2b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Types of Bias and Error',
    'Selection bias: sample not representative Response bias: answers influenced by question/interviewer Non-response bias: certain groups don''t respond Sampling error: random variation (decreases with larger $n$) Non-sampling error: measurement, recording mistakes Systematic vs random errors',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.2' 
  AND lesson_code = 'SL 4.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 399: SL 4.2 - SL 4.2c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Sample Size Effects',
    'Standard error: $$SE = \frac{\sigma}{\sqrt{n}}$$ Margin of error: $ME \propto \frac{1}{\sqrt{n}}$ Confidence interval width decreases with larger $n$ Reliability increases with $n$ but costs increase Rule: 4× sample for 2× precision',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.2' 
  AND lesson_code = 'SL 4.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 400: SL 4.3 - SL 4.3a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Summary Statistics Overview',
    'Central tendency: mean, median, mode Spread: range, IQR, standard deviation Mean: $\bar{x} = \frac{\sum x_i}{n}$ Median: middle value Mode: most frequent value Standard deviation: $s = \sqrt{\frac{\sum(x_i - \bar{x})^2}{n-1}}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.3' 
  AND lesson_code = 'SL 4.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 401: SL 4.3 - SL 4.3b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Central Tendency Formulas',
    'Mean: $$\bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n} = \frac{\sum x_i}{n}$$ Median: middle value when ordered (or average of two middle) Mode: most frequent value Weighted mean: $$\bar{x}_w = \frac{\sum w_i x_i}{\sum w_i}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.3' 
  AND lesson_code = 'SL 4.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 402: SL 4.3 - SL 4.3c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Spread Measures',
    'Range: $\max - \min$ IQR: $Q_3 - Q_1$ (middle 50%) Variance: $$s^2 = \frac{\sum(x_i - \bar{x})^2}{n-1}$$ Standard deviation: $$s = \sqrt{s^2}$$ (same units as data) Coefficient of variation: $\frac{s}{\bar{x}}$ (relative spread)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.3' 
  AND lesson_code = 'SL 4.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 403: SL 4.4 - SL 4.4a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Correlation Concepts',
    'Scatter plot: plot pairs $(x_i, y_i)$ Correlation: strength and direction of linear relationship Positive: both increase together Negative: one increases, other decreases None: no linear pattern Strong: points close to line Weak: points scattered',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.4' 
  AND lesson_code = 'SL 4.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 404: SL 4.4 - SL 4.4b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Regression Line Formula',
    'Line of best fit: $y = a + bx$ Slope: $$b = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2}$$ Intercept: $$a = \bar{y} - b\bar{x}$$ Always passes through $(\bar{x}, \bar{y})$ GDC: regression feature computes automatically',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.4' 
  AND lesson_code = 'SL 4.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 405: SL 4.4 - SL 4.4c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Correlation Coefficient',
    '$$r = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum(x_i - \bar{x})^2 \sum(y_i - \bar{y})^2}}$$ Range: $-1 \leq r \leq 1$ $r = 1$: perfect positive $r = -1$: perfect negative $r = 0$: no linear correlation $|r|$ close to 1: strong; close to 0: weak',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.4' 
  AND lesson_code = 'SL 4.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 406: SL 4.5 - SL 4.5a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Probability Basics',
    'Sample space $S$: all possible outcomes Event $A$: subset of outcomes Probability: $$P(A) = \frac{\text{favorable outcomes}}{\text{total outcomes}}$$ Properties: $0 \leq P(A) \leq 1$, $P(S) = 1$, $P(\emptyset) = 0$ Complement: $P(A'') = 1 - P(A)$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.5' 
  AND lesson_code = 'SL 4.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 407: SL 4.5 - SL 4.5b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Probability Rules',
    'Addition rule (mutually exclusive): $$P(A \cup B) = P(A) + P(B)$$ General: $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$ Multiplication (independent): $$P(A \cap B) = P(A) \times P(B)$$ Complement: $$P(A'') = 1 - P(A)$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.5' 
  AND lesson_code = 'SL 4.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 408: SL 4.5 - SL 4.5c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Applied Probability Setup',
    'Identify: sample space, events Tree diagrams: multi-stage events Probability tables: organize outcomes Expected value: $E(X) = \sum x_i P(X = x_i)$ Fairness: game fair if $E(\text{winnings}) = 0$ Real applications: insurance, gambling, quality control',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.5' 
  AND lesson_code = 'SL 4.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 409: SL 4.6 - SL 4.6a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Conditional Probability Formula',
    'Probability of $A$ given $B$ occurred: $$P(A|B) = \frac{P(A \cap B)}{P(B)}$$ Product rule: $$P(A \cap B) = P(A|B) \times P(B)$$ Independence: $P(A|B) = P(A)$ (if independent) Then: $P(A \cap B) = P(A) \times P(B)$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.6' 
  AND lesson_code = 'SL 4.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 410: SL 4.6 - SL 4.6b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Independence Test',
    'Events $A$ and $B$ are independent if: $$P(A \cap B) = P(A) \times P(B)$$ Equivalently: $P(A|B) = P(A)$ Dependent: outcome of one affects other With replacement: independent Without replacement: dependent Example: Two coin flips: independent. Two cards without replacement: dependent',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.6' 
  AND lesson_code = 'SL 4.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 411: SL 4.6 - SL 4.6c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Tree Diagram Method',
    'Multi-stage events: Branch for each outcome Multiply along paths Add across paths for total probability Example: P(two heads in 3 flips) Paths: HHH, HHT, HTH, THH Each: $(1/2)^3 = 1/8$ Total: $4 \times 1/8 = 1/2$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.6' 
  AND lesson_code = 'SL 4.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 412: SL 4.7 - SL 4.7a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Discrete Random Variable',
    'Random variable $X$: function from outcomes to numbers Probability distribution: $P(X = x_i)$ for all values Properties: $$\sum P(X = x_i) = 1$$ $$P(X = x_i) \geq 0$$ Example: Sum of two dice, $X \in \{2, 3, ..., 12\}$ with different probabilities',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.7' 
  AND lesson_code = 'SL 4.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 413: SL 4.7 - SL 4.7b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Continuous Random Variables',
    'PDF: $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)dx = 1$ Probability: $$P(a < X < b) = \int_a^b f(x)dx$$ (area under curve) $P(X = c) = 0$ (exact value has zero probability!) CDF: $F(x) = P(X \leq x) = \int_{-\infty}^x f(t)dt$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.7' 
  AND lesson_code = 'SL 4.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 414: SL 4.7 - SL 4.7c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Expected Value and Variance',
    'Discrete: $$E(X) = \sum x_i P(X = x_i)$$ $$\text{Var}(X) = E(X^2) - [E(X)]^2$$ Continuous: $$E(X) = \int_{-\infty}^{\infty} x f(x)dx$$ $$\text{Var}(X) = E(X^2) - [E(X)]^2$$ Standard deviation: $SD(X) = \sqrt{\text{Var}(X)}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.7' 
  AND lesson_code = 'SL 4.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 415: SL 4.8 - SL 4.8a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Binomial Distribution',
    '$X \sim B(n, p)$ where $n$ = trials, $p$ = success probability Conditions: fixed $n$, independent trials, two outcomes, constant $p$ $$P(X = k) = \binom{n}{k}p^k(1-p)^{n-k}$$ Mean: $E(X) = np$ Variance: $\text{Var}(X) = np(1-p)$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.8' 
  AND lesson_code = 'SL 4.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 416: SL 4.8 - SL 4.8b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Binomial Calculations',
    '$$P(X = k) = \binom{n}{k}p^k(1-p)^{n-k}$$ Cumulative: $P(X \leq k) = \sum_{i=0}^k P(X = i)$ GDC functions: binompdf (single value), binomcdf (cumulative) Example: 10 coin flips, P(exactly 6 heads): $$P(X = 6) = \binom{10}{6}(0.5)^{10} = 0.205$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.8' 
  AND lesson_code = 'SL 4.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 417: SL 4.8 - SL 4.8c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Binomial Application Template',
    'Identify: $n$ = number of trials, $p$ = probability of success Model: $X \sim B(n, p)$ Calculate: $P(X = k)$, $P(X \leq k)$, etc. Interpret: in context Example: Quality control—10% defective, sample 20, P(at most 2 defective) = $P(X \leq 2)$ where $X \sim B(20, 0.1)$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.8' 
  AND lesson_code = 'SL 4.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 418: SL 4.9 - SL 4.9a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Normal Distribution',
    '$$X \sim N(\mu, \sigma^2)$$ PDF: $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$ Bell-shaped, symmetric about $\mu$ Parameters: $\mu$ = mean (center), $\sigma$ = standard deviation (spread) 68-95-99.7 rule: 68% within $\mu \pm \sigma$, 95% within $\mu \pm 2\sigma$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.9' 
  AND lesson_code = 'SL 4.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 419: SL 4.9 - SL 4.9b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Standard Normal and Z-Scores',
    'Standard normal: $Z \sim N(0, 1)$ z-score (standardization): $$z = \frac{x - \mu}{\sigma}$$ Converts any normal to standard normal Use: $P(X < a) = P(Z < \frac{a-\mu}{\sigma})$ Tables/GDC give standard normal probabilities',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.9' 
  AND lesson_code = 'SL 4.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 420: SL 4.9 - SL 4.9c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Normal Probability Calculations',
    'If $X \sim N(\mu, \sigma^2)$: 1. Standardize: $z = \frac{x - \mu}{\sigma}$ 2. Use GDC or table for $P(Z < z)$ 3. Adjust for required probability Example: $X \sim N(100, 15^2)$, find $P(X > 115)$ $z = \frac{115-100}{15} = 1$ $P(X > 115) = 1 - P(Z < 1) = 1 - 0.8413 = 0.1587$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.9' 
  AND lesson_code = 'SL 4.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 421: SL 4.10 - SL 4.10a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Correlation Analysis Tools',
    'Pearson correlation $r$: linear relationships Spearman rank: monotonic (not necessarily linear) $r^2$: coefficient of determination (variance explained) Significance testing: is correlation statistically significant? Outlier influence: robust vs sensitive measures',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.10' 
  AND lesson_code = 'SL 4.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 422: SL 4.10 - SL 4.10b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Regression Diagnostics',
    'Residuals: $e_i = y_i - \hat{y}_i$ (observed - predicted) Residual plot: check for patterns Good fit: random scatter, no pattern Bad fit: curved pattern, increasing spread $r^2$: proportion of variance explained Assumptions: linearity, constant variance, normality of residuals',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.10' 
  AND lesson_code = 'SL 4.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 423: SL 4.10 - SL 4.10c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Prediction and Interpretation',
    'Use regression for prediction: $\hat{y} = a + bx$ Slope $b$: change in $y$ per unit $x$ Interpret $r^2$: % variance explained Caution: within data range only Assess: residual plot, $r$ value, context Example: Predict sales from advertising spend',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.10' 
  AND lesson_code = 'SL 4.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 424: SL 4.11 - SL 4.11a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Bayes'' Theorem',
    '$$P(A|B) = \frac{P(B|A) \times P(A)}{P(B)}$$ Or with partition: $$P(A_i|B) = \frac{P(B|A_i)P(A_i)}{\sum_j P(B|A_j)P(A_j)}$$ Reverses conditional: from $P(B|A)$ get $P(A|B)$ Example: Medical test, find P(disease|positive)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.11' 
  AND lesson_code = 'SL 4.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 425: SL 4.11 - SL 4.11b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Visual Probability Tools',
    'Tree diagram: branches for outcomes, probabilities on edges Venn diagram: overlapping circles for events, regions for intersections Two-way table: rows × columns for two variables Multiply along branches, add across branches for total Example: Two draws without replacement—tree shows changing probabilities',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.11' 
  AND lesson_code = 'SL 4.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 426: SL 4.11 - SL 4.11c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Complex Probability Models',
    'Combining concepts: conditional, Bayes, trees, independence Multi-stage experiments: tree + product rule Medical diagnosis: Bayes + sensitivity/specificity Sequential sampling: hypergeometric, changing probabilities Risk analysis: combining multiple failure modes',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.11' 
  AND lesson_code = 'SL 4.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 427: SL 4.12 - SL 4.12a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Standardization Process',
    'For $X \sim N(\mu, \sigma^2)$, standardize: $$Z = \frac{X - \mu}{\sigma} \sim N(0, 1)$$ Back-transform: $$X = \mu + \sigma Z$$ Percentile to value: Find $z$ from table/GDC, then $x = \mu + \sigma z$ Example: 90th percentile, $z \approx 1.28$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.12' 
  AND lesson_code = 'SL 4.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 428: SL 4.12 - SL 4.12b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Normal Calculation Steps',
    'Problem: Find $P(a < X < b)$ where $X \sim N(\mu, \sigma^2)$ 1. Standardize both: $z_a = \frac{a-\mu}{\sigma}$, $z_b = \frac{b-\mu}{\sigma}$ 2. Use GDC: normalcdf$(z_a, z_b)$ 3. Interpret result GDC functions: normalcdf (probability), invNorm (value from probability)',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.12' 
  AND lesson_code = 'SL 4.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 429: SL 4.12 - SL 4.12c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Applied Normal Models',
    'Quality control: $\mu \pm 3\sigma$ limits (99.7% within) Grading: convert scores to percentiles Manufacturing: tolerance specifications Medical: reference ranges, abnormal values Example: Heights $N(170, 10^2)$ cm, find % above 185cm',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 4.12' 
  AND lesson_code = 'SL 4.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 430: AHL 4.13 - AHL 4.13a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced Bayes Applications',
    'Law of total probability: $$P(B) = \sum_i P(B|A_i)P(A_i)$$ Bayes with multiple hypotheses: $$P(A_i|B) = \frac{P(B|A_i)P(A_i)}{\sum_j P(B|A_j)P(A_j)}$$ Applications: diagnostic testing (sensitivity/specificity), Bayesian inference, machine learning',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.13' 
  AND lesson_code = 'AHL 4.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 431: AHL 4.13 - AHL 4.13b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Distribution Family',
    'Discrete: Binomial, Poisson, Geometric, Hypergeometric Continuous: Normal, Exponential, Uniform Each suited for different scenarios Parameters determine shape Match distribution to context: counting events (Poisson), waiting time (Exponential), etc. Example: $X \sim \text{Poisson}(\lambda)$: $P(X=k) = \frac{e^{-\lambda}\lambda^k}{k!}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.13' 
  AND lesson_code = 'AHL 4.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 432: AHL 4.13 - AHL 4.13c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced Modeling',
    'Poisson processes: rare events, mean rate $\lambda$ Exponential: memoryless waiting time Geometric: trials until first success Hypergeometric: sampling without replacement Combining distributions for complex models Example: Queue theory, reliability engineering',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.13' 
  AND lesson_code = 'AHL 4.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 433: AHL 4.14 - AHL 4.14a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Random Variable Transformations',
    'If $Y = g(X)$, find distribution of $Y$ Linear: $Y = aX + b$: $E(Y) = aE(X) + b$, $\text{Var}(Y) = a^2\text{Var}(X)$ Sum: $E(X + Y) = E(X) + E(Y)$ (always) $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ (if independent) MGF: $M_X(t) = E(e^{tX})$ generates moments',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.14' 
  AND lesson_code = 'AHL 4.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 434: AHL 4.14 - AHL 4.14b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Continuous Distributions',
    'Uniform: $f(x) = \frac{1}{b-a}$ on $[a, b]$ (constant PDF) Exponential: $f(x) = \lambda e^{-\lambda x}$ for $x \geq 0$ (memoryless) Normal: $f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ (bell curve) Each models different continuous phenomena',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.14' 
  AND lesson_code = 'AHL 4.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 435: AHL 4.14 - AHL 4.14c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Monte Carlo and Simulation',
    'Simulation: approximate probabilities empirically Random number generation from distributions Bootstrap: resampling for inference Markov chains: state transitions Monte Carlo integration Example: Simulate complex system, estimate probabilities through repeated trials',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 4.14' 
  AND lesson_code = 'AHL 4.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 436: SL 5.1 - SL 5.1a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Limit Notation',
    '$$\lim_{x \to a} f(x) = L$$ Means: as $x$ approaches $a$, $f(x)$ approaches $L$ One-sided: $\lim_{x \to a^+} f(x)$ (from right), $\lim_{x \to a^-} f(x)$ (from left) Limit exists if left = right At infinity: $\lim_{x \to \infty} f(x)$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.1' 
  AND lesson_code = 'SL 5.1a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 437: SL 5.1 - SL 5.1b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Limit Laws',
    'If $\lim_{x \to a} f(x) = L$ and $\lim_{x \to a} g(x) = M$: Sum: $\lim[f \pm g] = L \pm M$ Product: $\lim[f \cdot g] = L \cdot M$ Quotient: $\lim[f/g] = L/M$ if $M \neq 0$ Constant: $\lim[cf] = cL$ Power: $\lim[f^n] = L^n$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.1' 
  AND lesson_code = 'SL 5.1b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 438: SL 5.1 - SL 5.1c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Derivative Definition',
    '$$f''(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$ Alternative notations: $$\frac{dy}{dx}, \quad \frac{df}{dx}, \quad Df(x), \quad y''$$ Geometric: slope of tangent line Physical: instantaneous rate of change Example: Position → velocity, quantity → marginal cost',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.1' 
  AND lesson_code = 'SL 5.1c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 439: SL 5.2 - SL 5.2a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Basic Differentiation Rules',
    'Power rule: $$\frac{d}{dx}(x^n) = nx^{n-1}$$ Constant: $$\frac{d}{dx}(c) = 0$$ Constant multiple: $$\frac{d}{dx}[cf(x)] = cf''(x)$$ Sum/difference: $$\frac{d}{dx}[f \pm g] = f'' \pm g''$$ Example: $\frac{d}{dx}(3x^4 - 2x + 5) = 12x^3 - 2$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.2' 
  AND lesson_code = 'SL 5.2a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 440: SL 5.2 - SL 5.2b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Polynomial Differentiation',
    'For $f(x) = a_nx^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0$: $$f''(x) = na_nx^{n-1} + (n-1)a_{n-1}x^{n-2} + \cdots + a_1$$ Degree reduces by 1 Constant term vanishes Example: $f(x) = 2x^3 - 5x^2 + 3x - 7$ $f''(x) = 6x^2 - 10x + 3$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.2' 
  AND lesson_code = 'SL 5.2b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 441: SL 5.2 - SL 5.2c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Rate of Change Applications',
    'Velocity: $v(t) = s''(t)$ (position derivative) Acceleration: $a(t) = v''(t) = s''''(t)$ Marginal cost: $MC = C''(x)$ (cost derivative) Tangent line at $(a, f(a))$: $$y - f(a) = f''(a)(x - a)$$ Growth rate: $\frac{dP}{dt}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.2' 
  AND lesson_code = 'SL 5.2c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 442: SL 5.3 - SL 5.3a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Product and Quotient Rules',
    'Product rule: $$\frac{d}{dx}[f(x)g(x)] = f''(x)g(x) + f(x)g''(x)$$ Quotient rule: $$\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f''(x)g(x) - f(x)g''(x)}{[g(x)]^2}$$ Mnemonic: ''low d-high minus high d-low, over low squared''',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.3' 
  AND lesson_code = 'SL 5.3a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 443: SL 5.3 - SL 5.3b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Chain Rule',
    'For $y = f(g(x))$: $$\frac{dy}{dx} = f''(g(x)) \cdot g''(x)$$ Or: $$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$ where $u = g(x)$ Example: $y = (3x + 1)^5$ Let $u = 3x + 1$: $\frac{dy}{dx} = 5u^4 \cdot 3 = 15(3x+1)^4$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.3' 
  AND lesson_code = 'SL 5.3b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 444: SL 5.3 - SL 5.3c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Complex Derivative Applications',
    'Related rates: differentiate both sides with respect to time Optimization: find critical points using $f''(x) = 0$ Motion: $s(t)$, $v(t) = s''(t)$, $a(t) = v''(t)$ Tangent/normal lines: use derivative as slope Example: Ladder sliding—relate rates of change of height and distance',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.3' 
  AND lesson_code = 'SL 5.3c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 445: SL 5.4 - SL 5.4a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Implicit Differentiation Method',
    'For equation in $x$ and $y$: 1. Differentiate both sides with respect to $x$ 2. Use chain rule on $y$ terms: $\frac{d}{dx}(y^n) = ny^{n-1}\frac{dy}{dx}$ 3. Solve for $\frac{dy}{dx}$ Example: $x^2 + y^2 = 25$ $2x + 2y\frac{dy}{dx} = 0$ → $\frac{dy}{dx} = -\frac{x}{y}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.4' 
  AND lesson_code = 'SL 5.4a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 446: SL 5.4 - SL 5.4b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Related Rates Strategy',
    '1. Identify variables and their rates ($\frac{dx}{dt}$, $\frac{dy}{dt}$) 2. Find equation relating variables 3. Differentiate both sides with respect to time 4. Substitute known values, solve for unknown rate Example: Balloon radius increasing—find rate of volume increase: $V = \frac{4}{3}\pi r^3$ → $\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.4' 
  AND lesson_code = 'SL 5.4b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 447: SL 5.4 - SL 5.4c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Implicit Application Strategies',
    'Finding slopes on implicit curves: $x^2 + y^2 = r^2$ Optimization with constraints: Lagrange multipliers (AHL) Related rates with implicit equations Tangent lines to circles, ellipses Example: Find horizontal tangents by setting $\frac{dy}{dx} = 0$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.4' 
  AND lesson_code = 'SL 5.4c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 448: SL 5.5 - SL 5.5a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Antiderivative Basics',
    'Antiderivative $F$: $F''(x) = f(x)$ Indefinite integral: $$\int f(x)dx = F(x) + C$$ ($C$ = constant of integration) Integration reverses differentiation Check: differentiate answer! Example: $\int x^2 dx = \frac{x^3}{3} + C$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.5' 
  AND lesson_code = 'SL 5.5a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 449: SL 5.5 - SL 5.5b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Basic Integration Rules',
    'Power rule: $$\int x^n dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)$$ Constant: $$\int k dx = kx + C$$ Sum: $$\int [f \pm g]dx = \int f dx \pm \int g dx$$ Constant multiple: $$\int kf dx = k\int f dx$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.5' 
  AND lesson_code = 'SL 5.5b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 450: SL 5.5 - SL 5.5c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Integration Application Formulas',
    'Area under $f(x)$ from $a$ to $b$: $$A = \int_a^b f(x)dx$$ Displacement from velocity: $$s = \int v(t)dt$$ Total accumulation: $$\text{Total} = \int_a^b \text{rate}(t)dt$$ Average value: $$f_{avg} = \frac{1}{b-a}\int_a^b f(x)dx$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.5' 
  AND lesson_code = 'SL 5.5c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 451: SL 5.6 - SL 5.6a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Substitution Method',
    'Chain rule reverse: $$\int f(g(x))g''(x)dx = F(g(x)) + C$$ Or: Let $u = g(x)$, $du = g''(x)dx$ $$\int f(g(x))g''(x)dx = \int f(u)du$$ Example: $\int 2x(x^2+1)^5 dx$ Let $u = x^2+1$, $du = 2x dx$ $= \int u^5 du = \frac{u^6}{6} + C = \frac{(x^2+1)^6}{6} + C$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.6' 
  AND lesson_code = 'SL 5.6a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 452: SL 5.6 - SL 5.6b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Integration by Parts',
    '$$\int u dv = uv - \int v du$$ Choose $u$ (LIATE: Log, Inverse, Algebraic, Trig, Exponential) Example: $\int x e^x dx$ Let $u = x$, $dv = e^x dx$ Then $du = dx$, $v = e^x$ $= xe^x - \int e^x dx = xe^x - e^x + C$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.6' 
  AND lesson_code = 'SL 5.6b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 453: SL 5.6 - SL 5.6c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Complex Integration Applications',
    'Choosing technique: substitution vs parts Area between curves: $\int_a^b [f(x) - g(x)]dx$ Volumes: disk, washer, shell methods Average value: $\frac{1}{b-a}\int_a^b f(x)dx$ Work: $W = \int F(x)dx$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.6' 
  AND lesson_code = 'SL 5.6c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 454: SL 5.7 - SL 5.7a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Fundamental Theorem of Calculus',
    '$$\int_a^b f(x)dx = F(b) - F(a) = [F(x)]_a^b$$ where $F''(x) = f(x)$ Evaluation: find antiderivative, substitute bounds, subtract Properties: $\int_a^a = 0$, $\int_a^b = -\int_b^a$, $\int_a^c = \int_a^b + \int_b^c$ Area: $A = \int_a^b |f(x)|dx$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.7' 
  AND lesson_code = 'SL 5.7a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 455: SL 5.7 - SL 5.7b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Area and Volume Formulas',
    'Area under curve: $$A = \int_a^b f(x)dx$$ Area between curves: $$A = \int_a^b [f(x) - g(x)]dx$$ Volume of revolution: $$V = \pi\int_a^b [f(x)]^2 dx$$ Total accumulation: $\int_a^b \text{rate}(t)dt$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.7' 
  AND lesson_code = 'SL 5.7b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 456: SL 5.7 - SL 5.7c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced Integration Formulas',
    'Volume (washer): $$V = \pi\int_a^b ([R(x)]^2 - [r(x)]^2)dx$$ Volume (shell): $$V = 2\pi\int_a^b x f(x)dx$$ Work: $$W = \int_a^b F(s)ds$$ Center of mass: $$\bar{x} = \frac{\int x dm}{\int dm}$$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.7' 
  AND lesson_code = 'SL 5.7c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 457: SL 5.8 - SL 5.8a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Integration Technique Summary',
    'Basic: power rule, linearity Substitution: $u = g(x)$ for composites Parts: $\int u dv = uv - \int v du$ for products Partial fractions: rational functions (AHL) Trig substitution: $\sqrt{a^2 - x^2}$ etc. (AHL) Choose based on form',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.8' 
  AND lesson_code = 'SL 5.8a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 458: SL 5.8 - SL 5.8b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Partial Fraction Decomposition',
    '$$\frac{P(x)}{Q(x)} = \frac{A}{x-a} + \frac{B}{x-b} + \cdots$$ Factor denominator, decompose Solve for constants: multiply through, equate coefficients Then integrate term-by-term Example: $\frac{1}{x^2-1} = \frac{1/2}{x-1} - \frac{1/2}{x+1}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.8' 
  AND lesson_code = 'SL 5.8b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 459: SL 5.8 - SL 5.8c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Technique Selection Guide',
    'Polynomial: power rule Composite $f(g(x))g''(x)$: substitution Product of different types: parts Rational: partial fractions Choose wisely: wrong technique makes problem harder! Example scenarios for each technique',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.8' 
  AND lesson_code = 'SL 5.8c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 460: SL 5.9 - SL 5.9a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Area Calculation Methods',
    'Area under $f$ from $a$ to $b$: $$A = \int_a^b |f(x)|dx$$ Below axis: use absolute value or split Area between $f$ and $g$: $$A = \int_a^b |f(x) - g(x)|dx$$ Find intersection points for limits',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.9' 
  AND lesson_code = 'SL 5.9a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 461: SL 5.9 - SL 5.9b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Volume of Revolution Methods',
    'Disk method (about x-axis): $$V = \pi\int_a^b [f(x)]^2 dx$$ Washer method (hollow): $$V = \pi\int_a^b ([R(x)]^2 - [r(x)]^2)dx$$ Shell method: $$V = 2\pi\int_a^b x f(x)dx$$ Choose based on axis of revolution',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.9' 
  AND lesson_code = 'SL 5.9b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 462: SL 5.9 - SL 5.9c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Real-World Area/Volume Formulas',
    'Tank volume: integrate cross-sections Material needed: surface area Surface area of revolution: $$S = 2\pi\int_a^b f(x)\sqrt{1 + [f''(x)]^2}dx$$ Irregular land area: numerical integration Real applications model actual objects',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.9' 
  AND lesson_code = 'SL 5.9c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 463: SL 5.10 - SL 5.10a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Integration by Parts Formula',
    '$$\int u dv = uv - \int v du$$ LIATE order for choosing $u$: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential Example: $\int \ln x dx$ Let $u = \ln x$, $dv = dx$ $= x\ln x - \int x \cdot \frac{1}{x}dx = x\ln x - x + C$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.10' 
  AND lesson_code = 'SL 5.10a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 464: SL 5.10 - SL 5.10b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Combining Integration Methods',
    'Complex integrals may need multiple techniques: Substitution + parts: nested approach Partial fractions + logarithms Trig identities + substitution Strategy: simplify first, then integrate Example: $\int \frac{x}{(x^2+1)^2}dx$ → substitution $u = x^2+1$',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.10' 
  AND lesson_code = 'SL 5.10b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 465: SL 5.10 - SL 5.10c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Comprehensive Integration Applications',
    'Area between multiple curves Volumes: multiple methods, choose best Work against variable force: $W = \int F(x)dx$ Probability: $P(a < X < b) = \int_a^b f(x)dx$ Economic: surplus, present value Applications throughout STEM',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.10' 
  AND lesson_code = 'SL 5.10c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 466: AHL 3.17 - AHL 3.17a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced 3D Formulas',
    'Distance point to line: use cross product Distance point to plane: projection Distance between skew lines: $$d = \frac{|(\mathbf{r}_2 - \mathbf{r}_1) \cdot (\mathbf{d}_1 \times \mathbf{d}_2)|}{|\mathbf{d}_1 \times \mathbf{d}_2|}$$ Angle between planes: angle between normals Dihedral angles, solid angles',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.17' 
  AND lesson_code = 'AHL 3.17a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 467: AHL 3.17 - AHL 3.17b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Plane-Line Configurations',
    'Parallel: $\mathbf{d} \cdot \mathbf{n} = 0$ (direction perpendicular to normal) Perpendicular: $\mathbf{d}$ parallel to $\mathbf{n}$ Skew lines: don''t intersect, not parallel Common perpendicular to skew lines Angle between line and plane: $\sin\theta = \frac{|\mathbf{d} \cdot \mathbf{n}|}{|\mathbf{d}||\mathbf{n}|}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.17' 
  AND lesson_code = 'AHL 3.17b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 468: AHL 3.17 - AHL 3.17c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    '3D Problem-Solving Tools',
    'Vector equations for lines/planes Distance formulas (point-line, point-plane, line-line) Intersection problems: solve systems Projections: $\text{proj}_{\mathbf{v}}\mathbf{u} = \frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{v}|^2}\mathbf{v}$ Cross product for perpendiculars, areas Example: Find shortest distance between two skew lines',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.17' 
  AND lesson_code = 'AHL 3.17c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 469: AHL 3.18 - AHL 3.18a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Multi-Object 3D Problems',
    'Three planes intersection: point, line, or empty System of linear equations: 3 variables Tetrahedron volume: $\frac{1}{6}|\mathbf{a} \cdot (\mathbf{b} \times \mathbf{c})|$ Multiple line intersections Sphere equations: $(x-h)^2 + (y-k)^2 + (z-l)^2 = r^2$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.18' 
  AND lesson_code = 'AHL 3.18a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 470: AHL 3.18 - AHL 3.18b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Spatial Measurement Formulas',
    'Angle between vectors: $\cos\theta = \frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{u}||\mathbf{v}|}$ Volume of parallelepiped: $|\mathbf{a} \cdot (\mathbf{b} \times \mathbf{c})|$ Area of parallelogram: $|\mathbf{u} \times \mathbf{v}|$ Shortest distance: perpendicular distance Spherical/cylindrical coordinates (advanced)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.18' 
  AND lesson_code = 'AHL 3.18b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 471: AHL 3.18 - AHL 3.18c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Engineering 3D Applications',
    'Structural analysis: force vectors, equilibrium moments GPS/navigation: 3D positioning CAD/CAM: object design and manufacturing Satellite orbits: 3D trajectories Computer vision: 3D reconstruction from 2D Formulas applied to real contexts',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 3.18' 
  AND lesson_code = 'AHL 3.18c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 472: SL 5.11 - SL 5.11a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Trig Substitution Techniques',
    'For $\sqrt{a^2 - x^2}$: use $x = a\sin\theta$ For $\sqrt{a^2 + x^2}$: use $x = a\tan\theta$ For $\sqrt{x^2 - a^2}$: use $x = a\sec\theta$ Convert to trig integral, solve, substitute back Partial fractions: decompose rational functions Tables: standard integrals for reference',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.11' 
  AND lesson_code = 'SL 5.11a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 473: SL 5.11 - SL 5.11b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'FTC and Properties',
    '$$\int_a^b f(x)dx = [F(x)]_a^b = F(b) - F(a)$$ Properties: $$\int_a^b f = -\int_b^a f$$ $$\int_a^c f = \int_a^b f + \int_b^c f$$ $$\int_a^b kf = k\int_a^b f$$ Leibniz rule (differentiation under integral): advanced',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.11' 
  AND lesson_code = 'SL 5.11b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 474: SL 5.11 - SL 5.11c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Integration Strategy Framework',
    '1. Identify form: polynomial, rational, radical, trig, exponential 2. Choose technique: power rule, substitution, parts, partial fractions 3. Simplify if possible before integrating 4. Apply technique systematically 5. Check: differentiate answer Example decision tree for technique selection',
    0
FROM public.courses_lessons
WHERE topic_number = 'SL 5.11' 
  AND lesson_code = 'SL 5.11c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 475: AHL 5.12 - AHL 5.12a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'L''Hôpital''s Rule',
    'For indeterminate forms $\frac{0}{0}$ or $\frac{\infty}{\infty}$: $$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f''(x)}{g''(x)}$$ Apply repeatedly if needed Also: $0 \cdot \infty$, $\infty - \infty$, $0^0$, $1^\infty$, $\infty^0$ → rewrite as quotient Example: $\lim_{x \to 0} \frac{\sin x}{x} = \lim_{x \to 0} \frac{\cos x}{1} = 1$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.12' 
  AND lesson_code = 'AHL 5.12a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 476: AHL 5.12 - AHL 5.12b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Continuity and Differentiability',
    'Continuous at $a$: $\lim_{x \to a} f(x) = f(a)$ Differentiable at $a$: $f''(a)$ exists Relationship: Differentiable → Continuous (NOT reverse!) Discontinuities: removable, jump, infinite Piecewise functions: check at boundaries Example: $|x|$ continuous everywhere but not differentiable at 0',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.12' 
  AND lesson_code = 'AHL 5.12b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 477: AHL 5.12 - AHL 5.12c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Higher-Order Derivatives',
    'Second derivative: $f''''(x) = \frac{d^2y}{dx^2}$ Concavity: $f'''' > 0$ concave up, $f'''' < 0$ concave down Inflection points: $f''''(x) = 0$ (sign change) Nth derivative: $f^{(n)}(x)$ Parametric: $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$, $\frac{d^2y}{dx^2} = \frac{d}{dx}[\frac{dy}{dx}]$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.12' 
  AND lesson_code = 'AHL 5.12c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 478: AHL 5.13 - AHL 5.13a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Asymptotic Analysis',
    'Asymptotic behavior: $\lim_{x \to \infty} \frac{f(x)}{g(x)}$ Big-O notation: $f = O(g)$ if $|f| \leq M|g|$ Dominant terms: highest power dominates Limit comparison test for series L''Hôpital for growth rate comparison Example: $e^x$ grows faster than any polynomial',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.13' 
  AND lesson_code = 'AHL 5.13a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 479: AHL 5.13 - AHL 5.13b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Series Convergence Tests',
    '$$\sum_{n=1}^\infty a_n$$ converges if partial sums approach limit Tests: Ratio: $\lim|\frac{a_{n+1}}{a_n}| < 1$ → converges Comparison: compare to known series Integral test: $\int f(x)dx$ converges → series converges Power series: $\sum a_n x^n$, radius of convergence',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.13' 
  AND lesson_code = 'AHL 5.13b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 480: AHL 5.13 - AHL 5.13c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Taylor/Maclaurin Series',
    'Taylor series about $x = a$: $$f(x) = \sum_{n=0}^\infty \frac{f^{(n)}(a)}{n!}(x-a)^n$$ Maclaurin (about 0): $$f(x) = f(0) + f''(0)x + \frac{f''''(0)}{2!}x^2 + \cdots$$ Example: $e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.13' 
  AND lesson_code = 'AHL 5.13c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 481: AHL 5.14 - AHL 5.14a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced Derivative Techniques',
    'Parametric: $x = x(t)$, $y = y(t)$ $$\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$$ Logarithmic differentiation: take ln first, then differentiate Inverse function: $$(f^{-1})''(x) = \frac{1}{f''(f^{-1}(x))}$$ Example: Differentiate $y = x^x$ using logarithmic differentiation',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.14' 
  AND lesson_code = 'AHL 5.14a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 482: AHL 5.14 - AHL 5.14b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced Optimization',
    'Lagrange multipliers for constraints: $$\nabla f = \lambda \nabla g$$ where $g(x,y,z) = k$ Multi-variable: partial derivatives = 0 Second derivative test (Hessian) for classification Constrained: substitute or Lagrange Example: Optimize $f(x,y)$ subject to $g(x,y) = c$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.14' 
  AND lesson_code = 'AHL 5.14b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 483: AHL 5.14 - AHL 5.14c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Complex Derivative Applications',
    'Taylor approximations: $f(x) \approx f(a) + f''(a)(x-a) + \frac{f''''(a)}{2}(x-a)^2$ Newton''s method: $x_{n+1} = x_n - \frac{f(x_n)}{f''(x_n)}$ Curvature: $\kappa = \frac{|f''''|}{(1 + (f'')^2)^{3/2}}$ Related rates in multiple variables',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.14' 
  AND lesson_code = 'AHL 5.14c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 484: AHL 5.15 - AHL 5.15a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Complete Integration Toolkit',
    'Repeated parts: reduction formulas Trig substitution + partial fractions Combined techniques for rational-radical Mixed trig-exponential integrals Weierstrass substitution: $t = \tan(\frac{x}{2})$ Example: $\int \frac{dx}{1 + \sin x + \cos x}$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.15' 
  AND lesson_code = 'AHL 5.15a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 485: AHL 5.15 - AHL 5.15b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Improper Integral Types',
    'Infinite interval: $$\int_a^\infty f(x)dx = \lim_{b \to \infty} \int_a^b f(x)dx$$ Infinite discontinuity at $c$: $$\int_a^b f = \lim_{\epsilon \to 0^+} \int_a^{c-\epsilon} f + \lim_{\epsilon \to 0^+} \int_{c+\epsilon}^b f$$ Converges if limits exist (finite) Example: $\int_1^\infty \frac{1}{x^2}dx = 1$ (converges)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.15' 
  AND lesson_code = 'AHL 5.15b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 486: AHL 5.15 - AHL 5.15c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Sophisticated Integration Formulas',
    'Arc length: $$L = \int_a^b \sqrt{1 + (f''(x))^2}dx$$ Surface area: $$S = 2\pi\int_a^b f(x)\sqrt{1 + (f''(x))^2}dx$$ Moments: $M = \int x f(x)dx$ Fourier series: project onto trig functions Applications require advanced techniques',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.15' 
  AND lesson_code = 'AHL 5.15c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 487: AHL 5.16 - AHL 5.16a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced FTC Concepts',
    'FTC Part 1: $$\frac{d}{dx}\int_a^x f(t)dt = f(x)$$ FTC Part 2: $$\int_a^b f''(x)dx = f(b) - f(a)$$ Leibniz integral rule: $$\frac{d}{dx}\int_{a(x)}^{b(x)} f(x,t)dt$$ Mean Value Theorem for integrals',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.16' 
  AND lesson_code = 'AHL 5.16a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 488: AHL 5.16 - AHL 5.16b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Complete Application Set',
    'Areas: under, between curves Volumes: disk, washer, shell methods Arc length: $\int \sqrt{1 + (f'')^2}dx$ Surface area: revolution Work: $W = \int F(x)dx$ Probability: $\int_{-\infty}^\infty f(x)dx = 1$ Each application: setup → integrate → interpret',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.16' 
  AND lesson_code = 'AHL 5.16b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 489: AHL 5.16 - AHL 5.16c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Strategic Integration Framework',
    'Decision tree: 1. Standard form? → table 2. Composite? → substitution 3. Product? → parts 4. Rational? → partial fractions 5. Radical? → trig substitution 6. None work? → numerical Example: systematic approach to $\int \frac{x^2}{\sqrt{x^2+1}}dx$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.16' 
  AND lesson_code = 'AHL 5.16c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 490: AHL 5.17 - AHL 5.17a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Sophisticated Techniques',
    'Contour integration (complex analysis) preview Numerical integration: Simpson''s, Gaussian quadrature Series integration: integrate term-by-term Special functions: elliptic integrals, error function Integral transforms: Laplace, Fourier Beyond elementary antiderivatives',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.17' 
  AND lesson_code = 'AHL 5.17a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 491: AHL 5.17 - AHL 5.17b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Multi-Step Integration',
    'Complex integrals: multiple technique layers Example: $\int x^2 e^{-x^2}dx$ → parts then substitution Nested approach: work outside-in or inside-out Simplify before integrating when possible Sometimes rewrite using identities Decision-making at each step',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.17' 
  AND lesson_code = 'AHL 5.17b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 492: AHL 5.17 - AHL 5.17c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Ultimate Integration Applications',
    'Fourier series: $a_n = \frac{1}{\pi}\int_{-\pi}^\pi f(x)\cos(nx)dx$ Laplace transform: $\mathcal{L}\{f\} = \int_0^\infty e^{-st}f(t)dt$ Probability: moment generating functions Green''s functions for differential equations Path integrals (physics)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.17' 
  AND lesson_code = 'AHL 5.17c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 493: AHL 5.18 - AHL 5.18a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Differential Equation Basics',
    'ODE: equation involving derivatives $$\frac{dy}{dx} = f(x, y)$$ Order: highest derivative Degree: power of highest derivative First-order: $y'' = f(x)$ or $y'' = f(x,y)$ Second-order: $y'''' = f(x, y, y'')$ Initial value problem: solution + initial condition',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.18' 
  AND lesson_code = 'AHL 5.18a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 494: AHL 5.18 - AHL 5.18b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'DE Solution Methods',
    'Separable: $\frac{dy}{dx} = g(x)h(y)$ → $\frac{dy}{h(y)} = g(x)dx$, integrate both sides Linear first-order: $y'' + P(x)y = Q(x)$ → integrating factor $\mu = e^{\int P dx}$ Homogeneous: $y'' = f(\frac{y}{x})$ → substitute $v = \frac{y}{x}$ Exact equations: check exactness, find potential',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.18' 
  AND lesson_code = 'AHL 5.18b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 495: AHL 5.18 - AHL 5.18c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'DE Application Models',
    'Exponential growth/decay: $\frac{dP}{dt} = kP$ → $P = P_0 e^{kt}$ Newton''s cooling: $\frac{dT}{dt} = -k(T - T_{\text{env}})$ Logistic growth: $\frac{dP}{dt} = kP(1 - \frac{P}{K})$ Simple harmonic motion: $\frac{d^2x}{dt^2} = -\omega^2 x$ Circuit: $L\frac{dI}{dt} + RI = V$',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.18' 
  AND lesson_code = 'AHL 5.18c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 496: AHL 5.19 - AHL 5.19a - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Advanced Limit Techniques',
    'Squeeze theorem: $g(x) \leq f(x) \leq h(x)$ and $\lim g = \lim h = L$ → $\lim f = L$ Series expansion for limits: Taylor series Asymptotic expansions L''Hôpital repeated applications Limits of sequences: $\lim_{n \to \infty} a_n$ Epsilon-delta definition (rigorous)',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.19' 
  AND lesson_code = 'AHL 5.19a'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 497: AHL 5.19 - AHL 5.19b - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Theoretical Calculus Results',
    'Mean Value Theorem: $f''(c) = \frac{f(b) - f(a)}{b - a}$ for some $c \in (a,b)$ Rolle''s Theorem: special case Extreme Value Theorem: continuous on closed interval has max/min Intermediate Value Theorem Taylor''s Theorem with remainder Uniform continuity',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.19' 
  AND lesson_code = 'AHL 5.19b'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


-- Row 498: AHL 5.19 - AHL 5.19c - formulas
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    'formulas',
    'Ultimate Calculus Applications',
    'Multivariable calculus: partial derivatives, multiple integrals Vector calculus: grad, div, curl, line/surface integrals Calculus of variations: optimize functionals Differential geometry: curvature, geodesics Complex analysis: contour integration Foundation for modern physics and engineering',
    0
FROM public.courses_lessons
WHERE topic_number = 'AHL 5.19' 
  AND lesson_code = 'AHL 5.19c'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = 'formulas'
  )
LIMIT 1;


COMMIT;

-- Verification: Count inserted records
SELECT 
    content_type,
    COUNT(*) as count
FROM public.course_lesson_content
GROUP BY content_type
ORDER BY content_type;

-- Check lessons without content
SELECT 
    l.id,
    l.topic_number,
    l.lesson_code,
    l.title,
    COUNT(clc.id) as content_count
FROM public.courses_lessons l
LEFT JOIN public.course_lesson_content clc ON l.id = clc.lesson_id
GROUP BY l.id, l.topic_number, l.lesson_code, l.title
HAVING COUNT(clc.id) = 0
ORDER BY l.topic_number, l.lesson_code;
