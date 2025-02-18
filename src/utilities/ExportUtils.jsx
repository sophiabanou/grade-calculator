export function exportGrades (grades) {
    const jsonData = new Blob([JSON.stringify(grades)], {type: "application/json"});
    const jsonURL = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.download = "grades.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function importGrades (event, setUserCourses, setFixedCourses) {
    const file = event.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const result = reader.result;
                const data = typeof result === "string" ? result : new TextDecoder().decode(result);
                const importedCourses = JSON.parse(data);
                if(Array.isArray(importedCourses)) {
                    setUserCourses(importedCourses.filter((i) => i.id>101));
                    setFixedCourses(importedCourses.filter((i) => i.id<=101));
                } else {
                    alert("Invalid File Format");
                }
            } catch{
                alert("Failed to parse file");
            }
        };
        reader.readAsText(file);
        event.target.value = null;
    }
}

