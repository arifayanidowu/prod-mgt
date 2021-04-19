import { useState, useEffect } from "react";
import { storage } from "../config/firebaseInit";

const useStorage = (file) => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (file) {
      const storageRef = storage.ref(file.name);

      storageRef.put(file).on(
        "state_change",
        (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setUrl(url);
        }
      );
    }
  }, [file]);

  return { progress, url, error, setProgress, setUrl };
};

export default useStorage;
