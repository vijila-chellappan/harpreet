import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("desc");

  const totalPages = Math.ceil(total / limit);

  
  useEffect(() => {
  const fetchContacts = async () => {
    try {
      const res = await api.get(
        `/contact?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`
      );

      console.log("SORT DEBUG:", sortBy, order);
      console.log("API Response:", res.data);

      setContacts(res.data.contacts || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  fetchContacts();
}, [page, limit, search, sortBy, order]);

const handleSort = (field: string) => {
  setPage(1);

  if (sortBy === field) {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  } else {
    setSortBy(field);
    setOrder("asc");
  }
};
  return (
    <div style={{ padding: "20px" }}>
      <h2>Contacts</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        style={{
          padding: "8px",
          marginBottom: "15px",
          width: "300px",
        }}
      />

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f4f6f9" }}>
            <tr>
              <th style={th} onClick={() => handleSort("id")}>
                ID {sortBy === "id" && (order === "asc" ? "▲" : "▼")}
                </th>

                <th style={th} onClick={() => handleSort("name")}>
                Name {sortBy === "name" && (order === "asc" ? "▲" : "▼")}
                </th>

                <th style={th} onClick={() => handleSort("email")}>
                Email {sortBy === "email" && (order === "asc" ? "▲" : "▼")}
                </th>
              <th style={th}>Phone</th>
              <th style={th}>Message</th>
              <th style={th}>Created</th>
            </tr>
          </thead>

          <tbody>
           {Array.isArray(contacts) &&
            contacts.map((c) => (
              <tr key={c.id}>
                <td style={td}>{c.id}</td>
                <td style={td}>{c.name}</td>
                <td style={td}>{c.email}</td>
                <td style={td}>{c.phone}</td>
                <td style={td}>{c.message}</td>
                <td style={td}>
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "15px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const th: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
  textAlign: "left",
};

const td: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

export default Contacts;