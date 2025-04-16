import React, { useEffect, useState } from 'react'

type Complaint = {
    id: string
    name: string
    email: string
    complaint: string
    status: string
    created_at: string
}

const Admin = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([])
    const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Resolved">("All")

    const fetchComplaints = async () => {
        const query = statusFilter === "All"
            ? "/complaints"
            : `/complaints?status=${statusFilter}`
        const res = await fetch(query)
        const data = await res.json()
        setComplaints(data)
    }

    const toggleStatus = async (id: string) => {
        await fetch(`/complaints/${id}`, { method: "PATCH" })
        fetchComplaints()
    }

    const deleteComplaint = async (id: string) => {
        if (!confirm("Are you sure you want to delete this complaint?")) return
        await fetch(`/complaints/${id}`, { method: "DELETE" })
        fetchComplaints()
    }

    useEffect(() => {
        fetchComplaints()
    }, [statusFilter])

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <a href="/submit" className="text-blue-600 underline hover:text-blue-800 text-sm">
                    Back to Submission
                </a>
            </div>

            <div className="mb-4 text-left">
                <label className="mr-2 font-semibold">Filter by status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as "All" | "Pending" | "Resolved")}
                    className="border rounded px-2 py-1"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            {complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <table className="w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Message</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map(c => (
                            <tr key={c.id} className="border-t">
                                <td className="p-2">{c.name}</td>
                                <td className="p-2">{c.email}</td>
                                <td className="p-2">{c.complaint}</td>
                                <td className="p-2">{new Date(c.created_at).toLocaleString()}</td>
                                <td className="p-2">{c.status}</td>
                                <td className="p-2 space-x-2">
                                    <button
                                        onClick={() => toggleStatus(c.id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        Toggle
                                    </button>
                                    <button
                                        onClick={() => deleteComplaint(c.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Admin
