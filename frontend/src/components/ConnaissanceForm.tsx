import React, { useState, useEffect } from "react";
import { addConnaissance, updateConnaissance, getCategories, addCategory } from "../api";

function AddCategoryInline({ onAdd }: { onAdd: () => void }) {
  const [show, setShow] = useState(false);
  const [nom, setNom] = useState("");

  const handleAdd = async () => {
    if (nom.trim()) {
      await addCategory({ nom });
      setNom("");
      setShow(false);
      onAdd();
    }
  };

  if (!show) {
    return (
      <button
        type="button"
        className="text-blue-600 text-sm underline mt-1"
        onClick={() => setShow(true)}
      >
        + Ajouter une catégorie
      </button>
    );
  }

  return (
    <div className="flex gap-2 mt-1">
      <input
        type="text"
        value={nom}
        onChange={e => setNom(e.target.value)}
        placeholder="Nom de la catégorie"
        className="p-1 border rounded text-black text-sm"
        autoFocus
        required
      />
      <button type="button" className="text-green-600 text-sm" onClick={handleAdd}>
        Ajouter
      </button>
      <button type="button" className="text-gray-400 text-sm" onClick={() => setShow(false)}>
        Annuler
      </button>
    </div>
  );
}


export default function ConnaissanceForm({ onAdd, connaissanceToEdit, onEditEnd }: any) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [niveau, setNiveau] = useState("");
  const [date, setDate] = useState("");
  const [categorie_id, setCategorieId] = useState<number | undefined>(undefined);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (connaissanceToEdit) {
      setNom(connaissanceToEdit.nom);
      setDescription(connaissanceToEdit.description || "");
      setNiveau(connaissanceToEdit.niveau);
      setDate(connaissanceToEdit.date || "");
      setCategorieId(connaissanceToEdit.categorie_id);
    } else {
      setNom("");
      setDescription("");
      setNiveau("");
      setDate("");
      setCategorieId(undefined);
    }
  }, [connaissanceToEdit, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categorie_id || !niveau) return;
    const data = { nom, description, niveau, date, categorie_id };
    if (connaissanceToEdit) {
      await updateConnaissance({ ...data, id: connaissanceToEdit.id });
      onEditEnd();
    } else {
      await addConnaissance(data);
    }
    setNom("");
    setDescription("");
    setNiveau("");
    setDate("");
    setCategorieId(undefined);
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-xl shadow">
      <div className="flex flex-col gap-2">
        <input
          className="p-2 border rounded text-black placeholder:text-gray-400"
          placeholder="Nom"
          value={nom}
          onChange={e => setNom(e.target.value)}
          required
        />
        <textarea
          className="p-2 border rounded text-black placeholder:text-gray-400"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select
          className={`p-2 border rounded ${niveau === "" ? "text-gray-400" : "text-black"}`}
          value={niveau}
          onChange={e => setNiveau(e.target.value)}
          required
        >
          <option value="" disabled hidden>-- Sélectionner un niveau --</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
          <option value="Expert">Expert</option>
        </select>
        <input
          className="p-2 border rounded text-black"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <select
          className={`p-2 border rounded ${!categorie_id ? "text-gray-400" : "text-black"}`}
          value={categorie_id ?? ""}
          onChange={e => setCategorieId(Number(e.target.value))}
          required
        >
          <option value="" disabled hidden>-- Sélectionner une catégorie --</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>{cat.nom}</option>
          ))}
        </select>
        {/* Bouton pour ajouter une catégorie */}
        <AddCategoryInline onAdd={async () => {
          const cats = await getCategories();
          setCategories(cats);
        }} />
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