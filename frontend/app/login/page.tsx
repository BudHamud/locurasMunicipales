import LeaderCard from "@/components/LeaderCard";

const POLITICOS = [
  {
    name: "El 'Capitán' Cemento",
    title: "EX-CEO DE CONSTRUCTORA", // El componente espera 'title'
    career: "Promete asfalto hasta en el living de tu casa. Ex-dueño de una cantera.", // Cambié 'bio' por 'career'
    stats: [
      { label: "Obra", value: 9 },
      { label: "Social", value: 3 },
      { label: "Carisma", value: 5 }
    ],
    borderColor: "border-arg-lightblue", // El componente espera 'borderColor'
  },
  {
    name: "La 'Mili' de Barrio",
    title: "REFERENTE SOCIAL",
    career: "Sabe cuántos fideos faltan en cada comedor. No duerme, milita.",
    stats: [
      { label: "Obra", value: 4 },
      { label: "Social", value: 10 },
      { label: "Carisma", value: 8 }
    ],
    borderColor: "border-arg-lightblue",
  },
  {
    name: "Camarada Vlady",
    title: "REVOLUCIONARIO",
    career: "El CV está vacío porque trabajar es una imposición del capital.",
    stats: [
      { label: "Obra", value: 1 },
      { label: "Social", value: 7 },
      { label: "Revolución", value: 10 }
    ],
    borderColor: "border-red-600",
  },
];

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-[#00355E] mb-2 uppercase italic">
          ARMÁ TU LISTA
        </h2>
        <p className="text-gray-600 mb-10">
          Elegí al líder que llevará tu municipio al éxito.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {POLITICOS.map((p, i) => (
            <LeaderCard
              key={i}
              name={p.name}

              career={p.career}
              stats={p.stats}

            />
          ))}
        </div>
      </div>
    </div>
  );
}