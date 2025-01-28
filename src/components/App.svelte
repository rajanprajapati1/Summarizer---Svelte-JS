<script>
  import { writable } from 'svelte/store';
  import FileUploader from './FileUploader.svelte';
  import SummaryDisplay from './SummaryDisplay.svelte';
  import LoadingOverlay from './LoadingOverlay.svelte';
  import { Rainbow } from 'lucide-svelte';

  const filed = writable(null);
  const isLoading = writable(false);
  const summary = writable(null);

 async function handleFileDrop(droppedFile) {
    filed.set(droppedFile); 
    isLoading.set(true); 
    summary.set(
          "summary"
        );
   try {
    const formData = new FormData();
    formData.append("file", droppedFile?.detail);

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
        summary.set(
          results
        );
        isLoading.set(false);
      }
    }
   } catch (error) {
    console.log(error,"error")
    summary.set(error)
    isLoading.set(false);
   }
  }
</script>

<main class="flex min-h-screen flex-col items-center justify-center  bg-gray-100">
  <div class="w-full max-w-7xl h-[80vh]  bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/2 p-8 border-r border-gray-200">
        <h1 class="text-3xl font-bold mb-6 flex items-center gap-2"> <Rainbow class="rotate-45" size={32} /> Summarizer</h1>
        <FileUploader on:fileDrop={handleFileDrop} />
        {#if $filed} 
          <div class="mt-4">
            <h2 class="text-xl font-semibold mb-2">Uploaded File:</h2>
            <p>{$filed?.detail.name}</p> 
          </div>
        {/if}
      </div>

      <div class="w-full md:w-1/2 p-8  h-full">
        <SummaryDisplay summary={$summary} />
      </div>
    </div>
  </div>

  {#if $isLoading}
    <LoadingOverlay />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
