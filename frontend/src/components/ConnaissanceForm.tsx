import React, { useState, useEffect } from "react";
import { addConnaissance, updateConnaissance, getCategories } from "../api";

export default function ConnaissanceForm({ onAdd, connaissanceToEdit, onEditEnd }: any) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [niveau, setNiveau] = useState("Débutant");
  const [date, setDate] = useState("");
  const [categorie_id, setCategorieId] = useState<number | undefined>(undefined);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // Met à jour les champs quand on édite OU quand les catégories sont chargées
  useEffect(() => {
    if (connaissanceToEdit) {
      setNom(connaissanceToEdit.nom);
      setDescription(connaissanceToEdit.description || "");
      setNiveau(connaissanceToEdit.niveau);
      setDate(connaissanceToEdit.date || "");
      setCategorieId(connaissanceToEdit.categorie_id);
    } else if (categories.length > 0) {
      setNom("");
      setDescription("");
      setNiveau("Débutant");
      setDate("");
      setCategorieId(categories[0].id);
    }
  }, [connaissanceToEdit, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categorie_id) return;
    const data = { nom, description, niveau, date, categorie_id };
    if (connaissanceToEdit) {
      await updateConnaissance({ ...data, id: connaissanceToEdit.id });
      onEditEnd();
    } else {
      await addConnaissance(data);
    }
    setNom("");
    setDescription("");
    setNiveau("Débutant");
    setDate("");
    setCategorieId(categories[0]?.id);
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-xl shadow">
      <div className="flex flex-col gap-2">
        <input
          className="p-2 border rounded"
          placeholder="Nom"
          value={nom}
          onChange={e => setNom(e.target.value)}
          required
        />
        <textarea
          className="p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={niveau}
          onChange={e => setNiveau(e.target.value)}
          required
        >
          <option>Débutant</option>
          <option>Intermédiaire</option>
          <option>Avancé</option>
          <option>Expert</option>
        </select>
        <input
          className="p-2 border rounded"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={categorie_id}
          onChange={e => setCategorieId(Number(e.target.value))}
          required
        >
          {categories.length === 0 ? (
            <option disabled>Aucune catégorie</option>
          ) : (
            categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.nom}</option>
            ))
          )}
        </select>
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-xl shadow hover:scale-105 transition"
          type="submit"
          disabled={categories.length === 0}
        >
          {connaissanceToEdit ? "Modifier" : "Ajouter"}
        </button>
        {connaissanceToEdit && (
          <button
            type="button"
            className="text-sm text-gray-500 mt-2"
            onClick={onEditEnd}
          >
            Annuler la modification
          </button>
        )}
      </div>
    </form>
  );
}