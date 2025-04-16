const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

// Log loaded values (for debuging)
// console.log("URL:", process.env.SUPABASE_URL);
// console.log("KEY:", process.env.SUPABASE_ANON_KEY);

// ✅ Correct Supabase key reference
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post("/complaints", async (req, res) => {
  const { name, email, complaint } = req.body;
  if (!name || !email || !complaint) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  const { data, error } = await supabase
    .from("complaints")
    .insert([{ name, email, complaint }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.get("/complaints", async (req, res) => {
  const { status } = req.query;
  let query = supabase
    .from("complaints")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.patch("/complaints/:id", async (req, res) => {
  const { id } = req.params;

  const { data: current, error: fetchErr } = await supabase
    .from("complaints")
    .select("status")
    .eq("id", id)
    .single();

  if (fetchErr) return res.status(404).json({ error: "Not found" });

  const newStatus = current.status === "Pending" ? "Resolved" : "Pending";
  const { data, error } = await supabase
    .from("complaints")
    .update({ status: newStatus })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

app.delete("/complaints/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("complaints").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
