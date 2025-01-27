<script>
  import App from "../components/App.svelte";
</script>

<App />

<!-- <script context="module">
    // Importing necessary modules or functions if needed
  </script>
  
  <script>
    let file;
    let isUploading = false;
    let message = '';
  
    // Function to handle file upload
    const uploadFile = async () => {
      if (!file) {
        message = 'Please select a file to upload.';
        return;
      }
  
      try {
        isUploading = true;
        const formData = new FormData();
        formData.append("file", file);
  
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
  
        if (response.ok) {
          message = `File uploaded successfully! File path: ${result.filePath}`;
        } else {
          message = `Error: ${result.message || 'An error occurred while uploading the file.'}`;
        }
      } catch (error) {
        message = `Error: ${error.message || 'An unexpected error occurred.'}`;
      } finally {
        isUploading = false;
      }
    };
  </script>
  
  <style>
    /* Add styles as necessary */
    .upload-btn {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }
  
    .upload-btn:disabled {
      background-color: #ddd;
      cursor: not-allowed;
    }
  
    .message {
      margin-top: 10px;
      color: #333;
      font-weight: bold;
    }
  </style>
  
  <div>
    <form on:submit|preventDefault={uploadFile}>
      <input type="file" bind:files={file} />
      <button type="submit" class="upload-btn" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload File'}
      </button>
    </form>
  
    <div class="message">{message}</div>
  </div>
   -->

<style>
</style>
