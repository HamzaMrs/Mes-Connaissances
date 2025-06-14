import React from "react";

export default function ConnaissanceCard({ connaissance, onEdit, onDelete }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition">
      <h2 className="text-xl font-bold text-indigo-700 mb-2">{connaissance.nom}</h2>
      <p className="text-gray-600 mb-2">{connaissance.description}</p>
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Niveau : {connaissance.niveau}</span>
        <span>{connaissance.date}</span>
      </div>
      <div className="flex gap-2">
        <button className="text-blue-600 hover:underline" onClick={() => onEdit(connaissance)}>Modifier</button>
        <button className="text-red-600 hover:underline" onClick={() => onDelete(connaissance.id)}>Supprimer</button>
      </div>
    </div>
  );
}