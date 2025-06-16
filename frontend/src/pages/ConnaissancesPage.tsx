import React, { useEffect, useState } from "react";
import { getConnaissances, getCategories, deleteConnaissance } from "../api";
import ConnaissanceCard from "../components/ConnaissanceCard";
import ConnaissanceForm from "../components/ConnaissanceForm";

export default function ConnaissancesPage() {
  const [connaissances, setConnaissances] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState<number | undefined>(undefined);
  const [editConnaissance, setEditConnaissance] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = () => {
    getConnaissances(selectedCat).then(setConnaissances);
    getCategories().then(setCategories);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, [selectedCat]);

  const handleDelete = async (id: number) => {
    await deleteConnaissance(id);
    refresh();
  };

  const handleAddClick = () => {
    setEditConnaissance(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditConnaissance(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-8 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-center mb-8 drop-shadow-lg">
          Mes Connaissances
        </h1>
        <div className="mb-4 flex gap-2">
          <select
            className="p-2 border rounded"
            value={selectedCat || ""}
            onChange={e => setSelectedCat(e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.nom}</option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            onClick={handleAddClick}
          >
            Ajouter une connaissance
          </button>
        </div>
        {showForm && (
          <ConnaissanceForm
            onAdd={() => {
              refresh();
              setShowForm(false);
            }}
            connaissanceToEdit={editConnaissance}
            onEditEnd={handleFormClose}
          />
        )}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {connaissances.length === 0 ? (
            <div className="col-span-2 text-center text-gray-400 italic">
              Aucune connaissance pour l’instant.
            </div>
          ) : (
            connaissances.map((c: any) => (
              <ConnaissanceCard
                key={c.id}
                connaissance={c}
                onEdit={(connaissance: any) => {
                  setEditConnaissance(connaissance);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

