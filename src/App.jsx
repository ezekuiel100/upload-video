import { useRef } from "react";

function App() {
  const ref = useRef();

  function handleUpload(e) {
    e.preventDefault();

    const file = ref.current.files[0];

    if (!file) {
      console.log("Nenhum arquivo selecionado");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log(file);

    fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleUpload}>
        <input type="file" name="file" ref={ref} />
        <input type="submit" value={"enviar"} />
      </form>
    </>
  );
}

export default App;
