import "./App.css";
import { UploadList } from "@/components/UploadList.tsx";
import { useEffect, useState } from "react";
import { fetchImages } from "@/lib/fetchPicsumImages.ts";

function App() {
  const [images, setImages] = useState<any>([]);
  useEffect(() => {
    fetchImages({ count: 10, batchSize: 10 }).then((data) => {
      console.log("foobara; ", data);
      setImages(data);
    });
  }, []);
  return (
    <div className="container">
      <UploadList items={images} />
    </div>
  );
}

export default App;
