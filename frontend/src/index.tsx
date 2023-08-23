import React from "react";
import { createRoot } from "react-dom/client";

const element = document.getElementById("react-root") as HTMLDivElement;
const root = createRoot(element);
root.render(<App />);

function App() {
    return <div>Hello not mens</div>;
}
