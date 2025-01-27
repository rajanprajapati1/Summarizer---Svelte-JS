<script>
  let selectedFile = null;
  let summarizedContent = "";

  async function uploadFile() {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (uploadResponse.ok) {
      const { fileName } = await uploadResponse.json();

      const summaryResponse = await fetch(
        `/api/process?fileName=${encodeURIComponent(fileName)}&fileType=excel`
      );

      if (summaryResponse.ok) {
        const { results } = await summaryResponse.json();
        summarizedContent = results;
      }
    }
  }
</script>

<input type="file" on:change="{(e) => (selectedFile = e.target.files[0])}" />
<button on:click="{uploadFile}">Upload and Summarize</button>

<p>{summarizedContent}</p>
