"use client"
import { useState } from "react"

const MCQ = ({ question, options, answer }: {
question: string,
options: string[],
answer: number
}) => {
const [selected, setSelected] = useState<number | null>(null)
const [feedback, setFeedback] = useState<string | null>(null)

const checkAnswer = () => {
if (selected === answer) {
setFeedback("✅ Correct!")
} else {
setFeedback("❌ Try again.")
}
}

return (
<div className="p-4 border rounded-xl shadow-sm space-y-4">
<h3 className="font-semibold">{question}</h3>
<ul className="space-y-2">
{options.map((opt, i) => (
<li key={i}>
<button
onClick={() => setSelected(i)}
className={`w-full text-left p-2 rounded-lg ${
                selected === i ? "bg-blue-100 border border-blue-500" : "bg-gray-50"
              }`} >
{opt}
</button>
</li>
))}
</ul>
<button onClick={checkAnswer} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
Submit
</button>
{feedback && <p className="mt-2">{feedback}</p>}
</div>
)
}

export default MCQ
