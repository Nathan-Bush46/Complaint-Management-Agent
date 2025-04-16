import React, { useState } from 'react'

const App = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [complaint, setComplaint] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const res = await fetch("/complaints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, complaint })
        })

        if (res.ok) {
            setSubmitted(true)
        } else {
            const data = await res.json()
            setError(data.error || "Something went wrong.")
        }
    }

    const resetForm = () => {
        setName("")
        setEmail("")
        setComplaint("")
        setError("")
        setSubmitted(false)
    }

    return (
        <div className="relative min-h-screen p-6 max-w-lg mx-auto text-center">
            {/* Admin Dashboard link - top right */}
            <div className="absolute top-4 right-4">
                <a
                    href="/admin"
                    className="text-blue-600 underline hover:text-blue-800 font-medium"
                >
                    Admin Dashboard
                </a>
            </div>

            <h1 className="text-2xl font-bold mb-4 mt-8">Submit a Complaint</h1>

            {error && (
                <div className="text-red-500 font-semibold mb-2">{error}</div>
            )}

            {submitted ? (
                <div className="space-y-4">
                    <div className="text-green-600 font-semibold">
                        Thank you for your submission!
                    </div>
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={resetForm}
                    >
                        Submit Another Complaint
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        className="border p-2 w-full"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        className="border p-2 w-full"
                        placeholder="Your complaint..."
                        value={complaint}
                        onChange={e => setComplaint(e.target.value)}
                        required
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    )
}

export default App
