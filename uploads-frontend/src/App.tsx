import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

import {UploadList} from "@/components/UploadList.tsx";
import {useEffect, useState} from "react";
import {fetchImages} from "@/lib/fetchPicsumImages.ts";
import {UploadForm} from "@/components/UploadForm.tsx";
import ErrorBoundary from "@/components/ErrorBoundary.tsx";
import "./App.css";

const queryClient = new QueryClient()

function App() {
    const [images, setImages] = useState<any>([]);
    useEffect(() => {
        fetchImages({count: 10, batchSize: 10}).then((data) => {
            setImages(data);
        });
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container py-12 space-y-10">
                <ErrorBoundary>
                    <UploadForm/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <UploadList items={images}/>
                </ErrorBoundary>
            </div>
        </QueryClientProvider>
    );
}

export default App;
