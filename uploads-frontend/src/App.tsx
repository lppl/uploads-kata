import "./App.css";
import { UploadList } from "@/components/UploadList.tsx";
import { useEffect, useState } from "react";
import { fetchImages } from "@/lib/fetchPicsumImages.ts";
import { UploadForm } from "@/components/UploadForm.tsx";

function App() {
  const [images, setImages] = useState<any>([]);
  useEffect(() => {
    fetchImages({ count: 10, batchSize: 10 }).then((data) => {
      setImages(data);
    });
  }, []);
  return (
    <div className="container py-12 space-y-10">
      <UploadForm />
      <UploadList items={images} />
    </div>
  );
}

export default App;
