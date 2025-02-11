import { useState, useEffect } from "react";
import { RiCloseFill } from "@remixicon/react";
import {Header} from "../components/index.jsx";

export default function Home() {
  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem("classes");
    return savedClasses ? JSON.parse(savedClasses) : [];
  });
  const [name, setName] = useState("");
  const [ects, setEcts] = useState("");
  const [grade, setGrade] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const addClass = () => {
    if (!name || !ects || !grade || !category) return;
    setClasses([...classes, { name, ects: Number(ects), grade: Number(grade), category }]);
    setName("");
    setEcts("");
    setGrade("");
    setCategory(""); // Reset category input
  };

  const deleteClass = (index) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  const totalEcts = classes.reduce((sum, c) => sum + c.ects, 0);
  const weightedGrade =
      totalEcts > 0
          ? classes.reduce((sum, c) => sum + c.ects * c.grade, 0) / totalEcts
          : 0;

  const degreeEcts = 240;
  const ectsProgress = Math.min((totalEcts / degreeEcts) * 100, 100);

  const categories = [
    "Υποχρεωτικα Μαθηματα",
    "Γενικης Παιδειας",
    "Κατ Επιλογην Υποχρεωτικα",
    "Προαιρετικα",
    "Ελευθερα",
    "Πρακτικη/Πτυχιακη",
    "Project",
  ];

  // Grouping classes by category
  const groupedClasses = categories.reduce((acc, category) => {
    acc[category] = classes.filter((c) => c.category === category);
    return acc;
  }, {});

  // Sorting classes within each category (optional if you want a specific order)
  for (let category in groupedClasses) {
    groupedClasses[category].sort((a, b) => a.name.localeCompare(b.name)); // Sort by class name within each category
  }

  return (
      <>
        <Header classes={classes} setClasses={setClasses} />

        <div className="max-w-2lg mx-auto py-6 px-10 bg-light shadow-md rounded-lg mt-10 border-3 border-dark h-min">
          <h1 className="text-2xl font-bold text-primary mb-4">Grade Calculator</h1>
          <div className="mb-4">
            <input
                type="text"
                placeholder="Class Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="number"
                placeholder="ECTS"
                value={ects}
                onChange={(e) => setEcts(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="number"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
              ))}
            </select>
            <button
                onClick={addClass}
                className="w-full bg-dark text-white p-2 rounded hover:cursor-pointer hover:opacity-90 ease-linear duration-300"
            >
              <p className="text-sm uppercase font-bold tracking-wider">Add Class</p>
            </button>
          </div>

          <h2 className="text-lg font-semibold text-primary">Classes</h2>
          <div className="max-h-50 overflow-y-scroll">
            {Object.keys(groupedClasses).map((category) => {
              if (groupedClasses[category].length === 0) return null; // Skip empty categories
              return (
                  <div key={category} className="mb-4">
                    <h3 className="text-xl font-semibold text-primary mb-2">{category}</h3>
                    <ul>
                      {groupedClasses[category].map((c, index) => (
                          <li key={index} className="flex justify-between p-2 border-b">
                      <span>
                        {c.name} ({c.ects} ECTS) - {c.grade}
                      </span>
                            <button
                                onClick={() => deleteClass(index)}
                                className="text-white bg-pink rounded-full hover:cursor-pointer hover:bg-pink-dark flex justify-center items-center w-6 h-6 ease-linear duration-300"
                            >
                              <RiCloseFill size={18} />
                            </button>
                          </li>
                      ))}
                    </ul>
                  </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded border-1 border-secondary">
            <p>
              <strong>Total ECTS:</strong> {totalEcts}
            </p>
            <p>
              <strong>Weighted Grade:</strong> {weightedGrade.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-20 fixed bottom-0 w-full">
          <p className="font-semibold text-dark text-center text-lg mb-2 px-4">
            <span className="font-bold">Progress:</span> {totalEcts} / {degreeEcts}
          </p>
          <div className="w-full bg-light h-5 overflow-hidden">
            <div
                className="bg-primary h-full"
                style={{ width: `${ectsProgress}%` }}
            ></div>
          </div>
        </div>
  </>
  );
}
