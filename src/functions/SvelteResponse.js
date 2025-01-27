export const SvelteResponse = ({ status = 200, response = {}, headers = {}, json = true }) => {
    const defaultHeaders = {
      "Content-Type": json ? "application/json" : "text/plain",
      ...headers,
    };
    const responseBody = json ? JSON.stringify(response) : response;
  
    return new Response(responseBody, {
      status,
      headers: defaultHeaders,
    });
  };
  